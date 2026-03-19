import amqp, { type ChannelModel } from 'amqplib';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto'
import type { TaggedMessage } from './rabbit-types.js';

/**
 * 
 * @param queue connected queue
 * @param msg message to send to queue
 */
export async function createMessage(conn: ChannelModel, queue: string, msg: any){
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, {durable: true}); 

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(msg)),
    { persistent: true }
  )

  await channel.close();
}

export async function createTaggedMessage(conn: ChannelModel, queue: string, msg: any): Promise<TaggedMessage>{
  const id = randomUUID();
  const taggedMsg: TaggedMessage = {id, message: msg}
  await createMessage(conn, queue, taggedMsg)
  return taggedMsg;
}

function isTaggedMessage(obj: any): obj is TaggedMessage {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    "message" in obj
  );
}

export async function createConsumer(conn: ChannelModel, queue: string, fn: (content: any) => Promise<void>){
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: true });

  const { consumerTag } = await channel.consume(queue, async (msg) => {
    
    if(!msg){
      return;
    }

    try {
      const parsedMsg: any = JSON.parse(msg.content.toString());
      if(isTaggedMessage(parsedMsg)){
        await fn(parsedMsg.message);
        channel.ack(msg);
      }
      else{
        await fn(parsedMsg);
        channel.ack(msg);
      }
    } catch (err) {
      console.log(err)
      channel.nack(msg, false, false);
    }
  });

  return {
    channel,
    consumerTag,
    close: async () => {
      await channel.cancel(consumerTag);
      await channel.close();
    }
  }
}
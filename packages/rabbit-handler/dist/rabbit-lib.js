import amqp, {} from 'amqplib';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
/**
 *
 * @param queue connected queue
 * @param msg message to send to queue
 */
export async function createMessage(conn, queue, msg) {
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
    await channel.close();
}
export async function createTaggedMessage(conn, queue, msg) {
    const id = randomUUID();
    const taggedMsg = { id, message: msg };
    await createMessage(conn, queue, taggedMsg);
    return taggedMsg;
}
function isTaggedMessage(obj) {
    return (obj !== null &&
        typeof obj === "object" &&
        typeof obj.id === "string" &&
        "message" in obj);
}
export async function createConsumer(conn, queue, fn) {
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });
    const { consumerTag } = await channel.consume(queue, async (msg) => {
        if (!msg) {
            return;
        }
        try {
            const parsedMsg = JSON.parse(msg.content.toString());
            if (isTaggedMessage(parsedMsg)) {
                await fn(parsedMsg.message);
                channel.ack(msg);
            }
            else {
                await fn(parsedMsg);
                channel.ack(msg);
            }
        }
        catch (err) {
            console.log(err);
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
    };
}
//# sourceMappingURL=rabbit-lib.js.map
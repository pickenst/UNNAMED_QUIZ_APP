import { createMessage, createTaggedMessage, createConsumer } from "./rabbit-lib.js";
import type { RabbitHandlerConstructor, TaggedMessage } from "./rabbit-types.js";
import amqp, { type ChannelModel } from 'amqplib'

const DEFAULT_RABBIT_PORT = 5672;

export class RabbitHandler {
  private RABBITMQ_PORT
  private RABBITMQ_DEFAULT_USER
  private RABBITMQ_DEFAULT_PASS
  private RABBITMQ_HOST
  private RABBIT

  private HANDLER_INITIALIZED = false
  private CONNECTION!: ChannelModel

  constructor(params: RabbitHandlerConstructor){
    this.RABBITMQ_PORT = params.port ?? DEFAULT_RABBIT_PORT;
    this.RABBITMQ_DEFAULT_USER = params.user;
    this.RABBITMQ_DEFAULT_PASS = params.password;
    this.RABBITMQ_HOST = params.host;
    this.RABBIT = `amqp://${this.RABBITMQ_DEFAULT_USER}:${this.RABBITMQ_DEFAULT_PASS}@${this.RABBITMQ_HOST}:${this.RABBITMQ_PORT}`;
    
  }

  async init(){
    this.CONNECTION = await amqp.connect(this.RABBIT);
    this.HANDLER_INITIALIZED = true;
  }

  async close(){
    await this.CONNECTION.close();
    this.HANDLER_INITIALIZED = false;
  }

  newQueue(thread: string){
    if(!this.HANDLER_INITIALIZED){
      throw new Error("Rabbit Uninitialized; Must call .init() before use")
    }
    return this.HANDLER_INITIALIZED ? new Queue(this.CONNECTION, thread) : null;
  }
}

class Queue {
  private MESSAGE_THREAD
  private CONNECTION!: ChannelModel
  
  constructor(conn: ChannelModel, thread: string){
    this.MESSAGE_THREAD = thread;
    this.CONNECTION = conn;
  }

  createMessage = (msg: string) => createTaggedMessage(this.CONNECTION, this.MESSAGE_THREAD, msg);
  createConsumer = (fn: (content: any) => Promise<void>) => createConsumer(this.CONNECTION, this.MESSAGE_THREAD, fn)
}
import { createMessage, createTaggedMessage, createConsumer } from "./rabbit-lib.js";
import amqp, {} from 'amqplib';
const DEFAULT_RABBIT_PORT = 5672;
export class RabbitHandler {
    RABBITMQ_PORT;
    RABBITMQ_DEFAULT_USER;
    RABBITMQ_DEFAULT_PASS;
    RABBITMQ_HOST;
    RABBIT;
    HANDLER_INITIALIZED = false;
    CONNECTION;
    constructor(params) {
        this.RABBITMQ_PORT = params.port ?? DEFAULT_RABBIT_PORT;
        this.RABBITMQ_DEFAULT_USER = params.user;
        this.RABBITMQ_DEFAULT_PASS = params.password;
        this.RABBITMQ_HOST = params.host;
        this.RABBIT = `amqp://${this.RABBITMQ_DEFAULT_USER}:${this.RABBITMQ_DEFAULT_PASS}@${this.RABBITMQ_HOST}:${this.RABBITMQ_PORT}`;
    }
    async init() {
        this.CONNECTION = await amqp.connect(this.RABBIT);
        this.HANDLER_INITIALIZED = true;
    }
    async close() {
        await this.CONNECTION.close();
        this.HANDLER_INITIALIZED = false;
    }
    newQueue(thread) {
        if (!this.HANDLER_INITIALIZED) {
            throw new Error("Rabbit Uninitialized; Must call .init() before use");
        }
        return this.HANDLER_INITIALIZED ? new Queue(this.CONNECTION, thread) : null;
    }
}
class Queue {
    MESSAGE_THREAD;
    CONNECTION;
    constructor(conn, thread) {
        this.MESSAGE_THREAD = thread;
        this.CONNECTION = conn;
    }
    createMessage = (msg) => createTaggedMessage(this.CONNECTION, this.MESSAGE_THREAD, msg);
    createConsumer = (fn) => createConsumer(this.CONNECTION, this.MESSAGE_THREAD, fn);
}
//# sourceMappingURL=rabbit.js.map
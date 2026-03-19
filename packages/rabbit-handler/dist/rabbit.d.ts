import type { RabbitHandlerConstructor, TaggedMessage } from "./rabbit-types.js";
import amqp, { type ChannelModel } from 'amqplib';
export declare class RabbitHandler {
    private RABBITMQ_PORT;
    private RABBITMQ_DEFAULT_USER;
    private RABBITMQ_DEFAULT_PASS;
    private RABBITMQ_HOST;
    private RABBIT;
    private HANDLER_INITIALIZED;
    private CONNECTION;
    constructor(params: RabbitHandlerConstructor);
    init(): Promise<void>;
    close(): Promise<void>;
    newQueue(thread: string): Queue | null;
}
declare class Queue {
    private MESSAGE_THREAD;
    private CONNECTION;
    constructor(conn: ChannelModel, thread: string);
    createMessage: (msg: string) => Promise<TaggedMessage>;
    createConsumer: (fn: (content: any) => Promise<void>) => Promise<{
        channel: amqp.Channel;
        consumerTag: string;
        close: () => Promise<void>;
    }>;
}
export {};
//# sourceMappingURL=rabbit.d.ts.map
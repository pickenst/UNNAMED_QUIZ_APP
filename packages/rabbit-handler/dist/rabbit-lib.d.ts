import amqp, { type ChannelModel } from 'amqplib';
import type { TaggedMessage } from './rabbit-types.js';
/**
 *
 * @param queue connected queue
 * @param msg message to send to queue
 */
export declare function createMessage(conn: ChannelModel, queue: string, msg: any): Promise<void>;
export declare function createTaggedMessage(conn: ChannelModel, queue: string, msg: any): Promise<TaggedMessage>;
export declare function createConsumer(conn: ChannelModel, queue: string, fn: (content: any) => Promise<void>): Promise<{
    channel: amqp.Channel;
    consumerTag: string;
    close: () => Promise<void>;
}>;
//# sourceMappingURL=rabbit-lib.d.ts.map
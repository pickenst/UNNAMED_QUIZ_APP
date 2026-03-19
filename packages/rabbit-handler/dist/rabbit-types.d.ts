import type { UUID } from "crypto";
export interface TaggedMessage {
    id: UUID;
    message: any;
}
export interface RabbitHandlerConstructor {
    port?: string;
    user: string;
    password: string;
    host: string;
}
//# sourceMappingURL=rabbit-types.d.ts.map
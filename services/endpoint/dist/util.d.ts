export declare function deriveFileType(filePath: string): "application/json" | "application/pdf" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "text/plain" | "image/jpeg" | "image/png" | "image/gif" | "image/webp" | "image/svg+xml" | "application/zip" | undefined;
export declare const env: {
    port: string | undefined;
    openaiReqQueue: string | undefined;
    rabbit: {
        port: string | undefined;
        user: string | undefined;
        password: string | undefined;
        host: string | undefined;
    };
    websocket: string | undefined;
};
export declare const queues: {
    queryFileIn: string | undefined;
    queryTextIn: string | undefined;
    queryResponse: string | undefined;
};
export declare const services: {
    user: string | undefined;
    query: string | undefined;
    socket: string | undefined;
};
//# sourceMappingURL=util.d.ts.map
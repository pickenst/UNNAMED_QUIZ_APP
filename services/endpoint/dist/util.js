import dotenv from "dotenv";
import { extMap, typeMap } from "@quizify/s3-handler";
import path from "path";
const envPath = process.argv[1];
if (envPath) {
    dotenv.config({ path: envPath });
}
export function deriveFileType(filePath) {
    const filename = path.basename(filePath);
    const ext = filename.split('.').pop();
    return ext ? typeMap[ext] : undefined;
}
export const env = {
    port: process.env.ENDPOINT_PORT,
    openaiReqQueue: process.env.OPENAI_REQ_QUEUE,
    rabbit: {
        port: process.env.RABBITMQ_PORT,
        user: process.env.RABBITMQ_DEFAULT_USER,
        password: process.env.RABBITMQ_DEFAULT_PASS,
        host: process.env.RABBITMQ_HOST
    },
    websocket: process.env.WS_PORT
};
export const queues = {
    queryFileIn: process.env.OPENAI_FILE_IN_Q,
    queryTextIn: process.env.OPENAI_TEXT_IN_Q,
    queryResponse: process.env.OPENAI_RES_Q
};
export const services = {
    user: process.env.USER_SERVICE_URL,
    query: process.env.QUERY_SERVICE_URL,
    socket: process.env.WS_URL
};
//# sourceMappingURL=util.js.map
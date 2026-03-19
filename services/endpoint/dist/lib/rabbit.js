import RabbitHandler, {} from "@quizify/rabbit-handler";
import dotenv from "dotenv";
import { env } from "../util.js";
const rabbitSettings = {
    port: env.rabbit.port,
    user: env.rabbit.user,
    password: env.rabbit.password,
    host: env.rabbit.host
};
const rabbit = new RabbitHandler(rabbitSettings);
await rabbit.init();
export default rabbit;
//# sourceMappingURL=rabbit.js.map
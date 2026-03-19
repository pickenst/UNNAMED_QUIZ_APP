import RabbitHandler, { type RabbitHandlerConstructor } from "@quizify/rabbit-handler";
import dotenv from "dotenv"
import { env } from "../util.js";

const rabbitSettings: RabbitHandlerConstructor = {
  port: env.rabbit.port,
  user: env.rabbit.user!,
  password: env.rabbit.password!,
  host: env.rabbit.host!
}

const rabbit = new RabbitHandler(rabbitSettings)
await rabbit.init();
export default rabbit;
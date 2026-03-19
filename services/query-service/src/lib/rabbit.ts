import RabbitHandler, { type RabbitHandlerConstructor } from "@quizify/rabbit-handler";
import dotenv from "dotenv"
import { env, queues } from "../util.js";
import S3 from "./s3.js";
import { generateOffFile, generateOffText } from "./openai.js";
import fs, { stat } from "fs"
import fsp from "fs/promises"

const rabbitSettings: RabbitHandlerConstructor = {
  port: env.rabbit.port!,
  user: env.rabbit.user!,
  password: env.rabbit.password!,
  host: env.rabbit.host!
}

const rabbit = new RabbitHandler(rabbitSettings)
await rabbit.init();
export default rabbit;
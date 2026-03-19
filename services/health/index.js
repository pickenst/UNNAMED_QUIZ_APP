import RabbitHandler from "@quizify/rabbit-handler"
import {env} from "./util.js"

console.log(env)

const rabbit = new RabbitHandler({
  host: env.rabbit.host,
  password: env.rabbit.password,
  user: env.rabbit.user,
  port: env.rabbit.port
});

await rabbit.init();

const n = rabbit.newQueue("health:in");
const o = rabbit.newQueue("health:out")

n.createConsumer(async () => {
  setTimeout(25000, () => {
    o.createMessage("Response")
  })
  
})
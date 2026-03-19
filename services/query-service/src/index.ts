import S3 from "./lib/s3.js";
import { generateOffFile, generateOffText } from "./lib/openai.js";
import fsp from "fs/promises"
import rabbit from "./lib/rabbit.js"
import { env, queues } from "./util.js";

console.log(env)

const fileIn = rabbit.newQueue(queues.queryFileIn!);
const textIn = rabbit.newQueue(queues.queryTextIn!);
const resQueue = rabbit.newQueue(queues.queryResponse!);

const fileConsumer = await fileIn!.createConsumer(async (content) => {
  
  const msg = typeof content === "string"
    ? JSON.parse(content)
    : JSON.parse(content.toString());
  const { connectionId, body: s3upload } = msg;

  console.log("message recieved: ")
  console.log(msg)
  
  const file = await S3.downloadSignedObject({
    outputPath: './temp/',
    url: s3upload
  });
  const res = await generateOffFile(file!);
  const responseMsg = JSON.stringify({
    connectionId,
    payload: res
  });

  console.log("response")
  console.log(responseMsg)
  await resQueue!.createMessage(responseMsg)
  await fsp.unlink(file)
});

const textConsumer = await textIn!.createConsumer(async (content) => {
  const msg = typeof content === "string"
    ? JSON.parse(content)
    : JSON.parse(content.toString());
  const { connectionId, body: textContent } = msg;
  
  const res = await generateOffText(textContent!);
  const responseMsg = JSON.stringify({
    connectionId,
    payload: res
  });
  await resQueue!.createMessage(responseMsg)
});
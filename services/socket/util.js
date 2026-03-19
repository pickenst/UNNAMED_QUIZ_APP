import dotenv from 'dotenv'


const envPath = process.argv[1];

if(envPath){
  dotenv.config({path: envPath});
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
}

export const queues = {
  queryFileIn: process.env.OPENAI_FILE_IN_Q,
  queryTextIn: process.env.OPENAI_TEXT_IN_Q,
  queryResponse: process.env.OPENAI_RES_Q
}
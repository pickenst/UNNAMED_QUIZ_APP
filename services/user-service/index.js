import express from "express"
import { ENV } from "./util.js";
import "dotenv/config"

const app = express();
const PORT = ENV.port;

app.get('/', (req, res) => {
  res.status(200).send("User Service Connected")
})

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`)
})
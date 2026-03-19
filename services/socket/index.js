import RabbitHandler from "@quizify/rabbit-handler";
import express from "express";
import { Server } from "socket.io";
import http from "http";
import { env, queues } from "./util.js";

let jobCount = 0;

setInterval(() => {
  console.log("Jobs/sec:", jobCount);
  jobCount = 0;
}, 1000);

console.log(env)

const app = express();
app.use(express.json());

/**
 * HTTP + WebSocket server
 */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

/**
 * Token → Socket mapping
 */
const socketsByToken = new Map();
const pendingConnections = new Map();

const getSocketByToken = (token) => socketsByToken.get(token);

/**
 * --------------------------------------------------
 * Session creation endpoint
 * --------------------------------------------------
 */
app.post("/create-session", (req, res) => {
  const { clientToken, connectionId } = req.body;

  console.log("Create-session called:", { clientToken, connectionId });

  let socket = socketsByToken.get(clientToken);

  if (socket) {
    console.log("Socket exists, joining room:", connectionId);
    socket.join(connectionId);
    console.log("Rooms now:", socket.rooms);
  } else {
    console.log("Socket not yet connected, storing pending join");

    pendingConnections.set(clientToken, connectionId);
  }

  res.json({ connectionId });
});

/**
 * --------------------------------------------------
 * RabbitMQ pipeline
 * --------------------------------------------------
 */
const rabbit = new RabbitHandler({
  host: env.rabbit.host,
  user: env.rabbit.user,
  password: env.rabbit.password,
  port: env.rabbit.port
});

await rabbit.init();

const responses = rabbit.newQueue(queues.queryResponse);

/**
 * --------------------------------------------------
 * Socket connection lifecycle
 * --------------------------------------------------
 */
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  const token = socket.handshake.auth?.token;
  console.log("Handshake auth token:", token);

  if (!token) {
    console.log("Socket missing auth token");
    return;
  }

  console.log("Current socket map size:", socketsByToken.size);

  socketsByToken.set(token, socket);

  // 🔧 APPLY PENDING JOIN
  const pending = pendingConnections.get(token);
  if (pending) {
    console.log("Applying pending join:", pending);

    socket.join(pending);
    console.log("Rooms after join:", socket.rooms);

    pendingConnections.delete(token);
  }

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    socketsByToken.delete(token);
  });
});

/**
 * --------------------------------------------------
 * Rabbit consumer → websocket broadcaster
 * --------------------------------------------------
 */
responses.createConsumer((content) => {
  try {
    console.log("Rabbit consumer triggered");
    jobCount++;
    const msg =
      typeof content === "string"
        ? JSON.parse(content)
        : JSON.parse(content.toString());

    console.log("Consumed message:", msg);

    const { connectionId, payload } = msg;

    console.log("Emitting to connectionId:", connectionId); 

    if (!connectionId) {
      console.log("Missing connectionId in message");
      return;
    }

    console.log("Broadcasting response to room:", connectionId);

    io.to(connectionId).emit("response", payload);
  } catch (err) {
    console.error("Consumer processing error:", err);
  }
});

/**
 * --------------------------------------------------
 * Start server
 * --------------------------------------------------
 */
const PORT = env.websocket || 8084;

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});

export { app, server };
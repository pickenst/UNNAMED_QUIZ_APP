import { deriveFileType, env, queues, services } from "./util.js";
import cors from "cors";
import express from "express";
import multer from "multer";
import S3 from './lib/s3.js';
import { randomUUID } from "crypto";
import rabbit from './lib/rabbit.js';
import fs from "fs/promises";
console.log(env);
const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
const fileIn = rabbit.newQueue(queues.queryFileIn);
const queryRes = rabbit.newQueue(queues.queryResponse);
const upload = multer({
    dest: "./uploads"
});
const port = env.port;
app.get("/", (req, res) => {
    res.send("App is running");
});
app.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = `./uploads/${req.file.filename}`;
    const clientToken = randomUUID();
    const connectionId = randomUUID();
    const s3upload = await S3.uploadSignedObject({
        key: req.file.originalname,
        path: filePath,
        contentType: deriveFileType(filePath),
        bucketPrefix: "uploads/"
    });
    const id = randomUUID();
    // Create session in socket
    await fetch(`${services.socket}/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientToken, connectionId })
    }).catch(err => console.error("Failed to create socket session:", err));
    const message = JSON.stringify({
        connectionId,
        id,
        body: s3upload
    });
    fileIn.createMessage(message);
    await fs.unlink(req.file.path);
    res.status(201).json({
        clientToken,
        connectionId
    });
});
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=index.js.map
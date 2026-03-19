import { S3Client } from "@aws-sdk/client-s3"
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import fs from "fs"
import path from "path"
import { pipeline } from "stream"
import { promisify } from "util"
import type { AllowedContentType, S3UploadParams, S3DownloadParams } from "./s3-types.js"
import { deriveFileType } from "./local-util.js"
import { validTypesJson } from "./exported-util.js"


const pipe = promisify(pipeline);
/**
 * 
 * @param params {key: string, path: string, contentType: string | undefined}
 * @returns signed url to uploaded object for use with downloadSignedObject
 */
export async function uploadSignedObject(s3: S3Client, params: S3UploadParams) {
  const stats = fs.statSync(params.path);

  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: params.key,
    Body: fs.createReadStream(params.path),
    ContentType: params.contentType,
    ContentLength: stats.size
  }));

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: params.key
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // seconds
  return url;
}

/**
 * 
 * @param params {url: string, outputPath: string}
 * @returns 
 */
export async function downloadSignedObject(s3: S3Client, params: S3DownloadParams) {
  const safeUrl = params.url.replace(/^"(.*)"$/, '$1');

  const outputDir = params.outputPath ?? './downloads';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pathname = new URL(safeUrl).pathname;
  const filename = decodeURIComponent(pathname.split("/").pop()!);

  const fullPath = path.join(outputDir, filename);

  const res: Response & { body: any } = await fetch(safeUrl);


  const fileStream = fs.createWriteStream(fullPath);
  await pipe(res.body, fileStream);

  return fullPath;
}
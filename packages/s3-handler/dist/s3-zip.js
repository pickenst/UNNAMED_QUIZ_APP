import { uploadSignedObject } from "./s3-base.js";
import dotenv from "dotenv";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { typeMap } from "./s3-types.js";
import archiver from "archiver";
import { validFileType, zip, unzip, deriveFileType } from "./local-util.js";
import { S3Client } from "@aws-sdk/client-s3";
import { validTypesJson } from "./exported-util.js";
/**
 * Zips and uploads all files listed
 * @param paths string[]
 */
export async function zipUploadSignedObjects(s3, params) {
    const zipped = await zip(params.paths, params.tempDirectory);
    return await uploadSignedObject(s3, {
        key: params.zipName,
        bucketPrefix: params.bucketPrefix,
        path: zipped,
        contentType: deriveFileType(validTypesJson.zip)
    });
}
//# sourceMappingURL=s3-zip.js.map
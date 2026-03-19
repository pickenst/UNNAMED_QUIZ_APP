import { downloadSignedObject, uploadSignedObject } from "./s3-base.js";
import fs from "fs";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import { deriveFileType, validFileType } from "./local-util.js";
export async function batchUploadSignedObjects(s3, params) {
    const uploads = params.paths
        .filter((filePath) => validFileType(filePath))
        .map((filePath) => {
        uploadSignedObject(s3, {
            key: path.basename(filePath),
            path: filePath,
            bucketPrefix: params.bucketPrefix,
            contentType: deriveFileType(filePath)
        });
    });
    return Promise.all(uploads);
}
export async function batchDownloadSignedObjects(s3, params) {
    const downloads = params.urls.map((url) => {
        downloadSignedObject(s3, {
            url,
            outputPath: params.outputPath
        });
    });
    return Promise.all(downloads);
}
//# sourceMappingURL=s3-batch.js.map
import type { S3BatchDownloadParams, S3BatchUploadParams } from "./s3-types.js";
import { S3Client } from "@aws-sdk/client-s3";
export declare function batchUploadSignedObjects(s3: S3Client, params: S3BatchUploadParams): Promise<void[]>;
export declare function batchDownloadSignedObjects(s3: S3Client, params: S3BatchDownloadParams): Promise<void[]>;
//# sourceMappingURL=s3-batch.d.ts.map
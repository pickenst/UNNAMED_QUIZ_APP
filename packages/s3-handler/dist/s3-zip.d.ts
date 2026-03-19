import { type S3ZipUploadParams } from "./s3-types.js";
import { S3Client } from "@aws-sdk/client-s3";
/**
 * Zips and uploads all files listed
 * @param paths string[]
 */
export declare function zipUploadSignedObjects(s3: S3Client, params: S3ZipUploadParams): Promise<string>;
//# sourceMappingURL=s3-zip.d.ts.map
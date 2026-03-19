import { S3Client } from "@aws-sdk/client-s3";
import type { S3UploadParams, S3DownloadParams } from "./s3-types.js";
/**
 *
 * @param params {key: string, path: string, contentType: string | undefined}
 * @returns signed url to uploaded object for use with downloadSignedObject
 */
export declare function uploadSignedObject(s3: S3Client, params: S3UploadParams): Promise<string>;
/**
 *
 * @param params {url: string, outputPath: string}
 * @returns
 */
export declare function downloadSignedObject(s3: S3Client, params: S3DownloadParams): Promise<string>;
//# sourceMappingURL=s3-base.d.ts.map
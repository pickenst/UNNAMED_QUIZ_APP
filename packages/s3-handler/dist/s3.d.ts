import type { S3HandlerConstructor, S3UploadParams, S3DownloadParams, S3BatchUploadParams, S3BatchDownloadParams, S3ZipUploadParams } from "./s3-types.js";
export default class S3Handler {
    private S3_BUCKET_NAME;
    private AWS_REGION;
    private AWS_ACCESS_KEY_ID;
    private AWS_SECRET_ACCESS_KEY;
    private S3;
    private TEMP_OUTPUT_PATH;
    constructor(params: S3HandlerConstructor);
    uploadSignedObject: (params: S3UploadParams) => Promise<string>;
    downloadSignedObject: (params: S3DownloadParams) => Promise<string>;
    zipUploadSignedObjects: (params: Omit<S3ZipUploadParams, "tempDirectory">) => Promise<string>;
    batchUploadSignedObjects: (params: S3BatchUploadParams) => Promise<void[]>;
    batchDownloadSignedObjects: (params: S3BatchDownloadParams) => Promise<void[]>;
}
//# sourceMappingURL=s3.d.ts.map
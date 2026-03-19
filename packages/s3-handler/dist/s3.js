import { S3Client } from "@aws-sdk/client-s3";
import * as s3Base from './s3-base.js';
import * as s3Batch from './s3-batch.js';
import * as s3Zip from './s3-zip.js';
export default class S3Handler {
    S3_BUCKET_NAME;
    AWS_REGION;
    AWS_ACCESS_KEY_ID;
    AWS_SECRET_ACCESS_KEY;
    S3;
    TEMP_OUTPUT_PATH;
    constructor(params) {
        this.S3_BUCKET_NAME = params.S3_BUCKET_NAME,
            this.AWS_REGION = params.AWS_REGION,
            this.AWS_ACCESS_KEY_ID = params.AWS_ACCESS_KEY_ID,
            this.AWS_SECRET_ACCESS_KEY = params.AWS_SECRET_ACCESS_KEY,
            this.TEMP_OUTPUT_PATH = params.tempOutputPath ?? './uploads';
        this.S3 = new S3Client({
            region: this.AWS_REGION,
            credentials: {
                accessKeyId: this.AWS_ACCESS_KEY_ID,
                secretAccessKey: this.AWS_SECRET_ACCESS_KEY
            }
        });
    }
    uploadSignedObject = async (params) => await s3Base.uploadSignedObject(this.S3, params);
    downloadSignedObject = async (params) => await s3Base.downloadSignedObject(this.S3, params);
    zipUploadSignedObjects = async (params) => await s3Zip.zipUploadSignedObjects(this.S3, { ...params, tempDirectory: this.TEMP_OUTPUT_PATH });
    batchUploadSignedObjects = async (params) => await s3Batch.batchUploadSignedObjects(this.S3, params);
    batchDownloadSignedObjects = async (params) => await s3Batch.batchDownloadSignedObjects(this.S3, params);
}
//# sourceMappingURL=s3.js.map
import { S3Client } from "@aws-sdk/client-s3"
import type { 
  AllowedContentType, 
  S3HandlerConstructor, 
  S3UploadParams,
  S3DownloadParams, 
  S3BatchUploadParams,
  S3BatchDownloadParams,
  S3ZipUploadParams
} from "./s3-types.js"
import * as s3Base from './s3-base.js'
import * as s3Batch from './s3-batch.js' 
import * as s3Zip from './s3-zip.js'

export default class S3Handler {
  private S3_BUCKET_NAME
  private AWS_REGION
  private AWS_ACCESS_KEY_ID
  private AWS_SECRET_ACCESS_KEY
  private S3

  private TEMP_OUTPUT_PATH
  constructor(params: S3HandlerConstructor) {
    this.S3_BUCKET_NAME = params.S3_BUCKET_NAME,
    this.AWS_REGION = params.AWS_REGION,
    this.AWS_ACCESS_KEY_ID = params.AWS_ACCESS_KEY_ID,
    this.AWS_SECRET_ACCESS_KEY = params.AWS_SECRET_ACCESS_KEY,
    this.TEMP_OUTPUT_PATH = params.tempOutputPath ?? './uploads'

    this.S3 = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY
      }
    })
  }

  uploadSignedObject = async (params: S3UploadParams) => 
    await s3Base.uploadSignedObject(this.S3, params);
  downloadSignedObject = async (params: S3DownloadParams) => 
    await s3Base.downloadSignedObject(this.S3, params);
  zipUploadSignedObjects = async (params: Omit<S3ZipUploadParams, "tempDirectory">) =>
    await s3Zip.zipUploadSignedObjects(this.S3, {...params, tempDirectory: this.TEMP_OUTPUT_PATH})
  batchUploadSignedObjects = async (params: S3BatchUploadParams) => 
    await s3Batch.batchUploadSignedObjects(this.S3, params);
  batchDownloadSignedObjects = async (params: S3BatchDownloadParams) =>
    await s3Batch.batchDownloadSignedObjects(this.S3, params)

}
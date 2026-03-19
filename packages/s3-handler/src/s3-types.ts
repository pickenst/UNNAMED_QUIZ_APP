import path from "path"

export const typeMap: Record<string, AllowedContentType | AllowedUploadType> = {
  "json": "application/json",
  "pdf": "application/pdf",
  "doc": "application/msword",
  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "ppt": "application/vnd.ms-powerpoint",
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "txt": "text/plain",
  "jpg": "image/jpeg",
  "png": "image/png",
  "gif": "image/gif",
  "webp": "image/webp",
  "svg": "image/svg+xml",
  "zip": "application/zip"
}

export const extMap: Record<AllowedContentType, string> = {
  "application/json": "json",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "text/plain": "txt",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg"
}

export type AllowedContentType = AllowedDocumentType | AllowedMediaType

export type AllowedUploadType = AllowedContentType | "application/zip"

export type AllowedDocumentType = 
"application/json" | 
"application/pdf" |
"application/msword" |
"application/vnd.openxmlformats-officedocument.wordprocessingml.document" |
"application/vnd.ms-powerpoint" |
"application/vnd.openxmlformats-officedocument.presentationml.presentation" |
"text/plain"

export type AllowedMediaType = 
"image/jpeg" |
"image/png" |
"image/gif" |
"image/webp" |
"image/svg+xml"

export type S3HandlerConstructor = {
  S3_BUCKET_NAME: string,
  AWS_REGION: string,
  AWS_ACCESS_KEY_ID: string,
  AWS_SECRET_ACCESS_KEY: string,

  tempOutputPath?: string
}

export interface S3UploadParams {
  key: string, 
  path: string,
  bucketPrefix: string,
  contentType?: AllowedUploadType | undefined
}

export interface S3DownloadParams {
  url: string, 
  outputPath: string
}

export interface S3BatchUploadParams {
  paths: string[], 
  bucketPrefix: string, 
  contentType?: AllowedUploadType
}

export interface S3BatchDownloadParams {
  urls: string[],
  outputPath: string
}

export interface S3ZipUploadParams extends S3BatchUploadParams {
  zipName: string,
  tempDirectory: string
} 
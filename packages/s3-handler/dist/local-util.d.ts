export declare function deriveFileType(filePath: string): "application/json" | "application/pdf" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "text/plain" | "image/jpeg" | "image/png" | "image/gif" | "image/webp" | "image/svg+xml" | "application/zip" | undefined;
export declare function validFileType(filePath: string): boolean;
export declare function zip(files: string[], out: string): Promise<string>;
export declare function unzip(zipPath: string, out: string): Promise<void>;
//# sourceMappingURL=local-util.d.ts.map
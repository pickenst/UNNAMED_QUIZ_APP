import S3Handler, {} from "@quizify/s3-handler";
const S3_SETTINGS = {
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_REGION: process.env.AWS_REGION,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    tempOutputPath: './uploads'
};
export const S3 = new S3Handler(S3_SETTINGS);
export default S3;
//# sourceMappingURL=s3.js.map
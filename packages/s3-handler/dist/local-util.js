import path from "path";
import { typeMap } from "./s3-types.js";
import archiver from "archiver";
import unzipper from "unzipper";
import fs from "fs";
export function deriveFileType(filePath) {
    const filename = path.basename(filePath);
    const ext = filename.split('.').pop();
    return ext ? typeMap[ext] : undefined;
}
export function validFileType(filePath) {
    return deriveFileType(filePath) !== undefined;
}
export function zip(files, out) {
    const output = fs.createWriteStream(out);
    const archive = archiver("zip", { zlib: { level: 9 } });
    return new Promise((resolve, reject) => {
        output.on("close", () => resolve(out));
        archive.on("error", err => reject(err));
        archive.pipe(output);
        files.filter(file => validFileType(file))
            .forEach(file => {
            archive.file(file, {
                name: path.basename(file)
            });
        });
        archive.finalize();
    });
}
export function unzip(zipPath, out) {
    return new Promise((resolve, reject) => {
        fs.createWriteStream(zipPath)
            .pipe(unzipper.Extract({ path: out }))
            .on("close", resolve)
            .on("error", reject);
    });
}
//# sourceMappingURL=local-util.js.map
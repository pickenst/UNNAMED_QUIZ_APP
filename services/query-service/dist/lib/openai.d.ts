import OpenAI from "openai";
import type { ResponseCreateParamsNonStreaming } from "openai/resources/responses/responses.mjs";
export declare const createFileResponseParams: (context: string, uploadedFile: OpenAI.Files.FileObject) => ResponseCreateParamsNonStreaming;
export declare const createTextResponseParams: (buildContext: string, contentContext: string) => ResponseCreateParamsNonStreaming;
export declare const generateOffFile: (fileReference: string) => Promise<any>;
export declare const generateOffText: (context: string) => Promise<any>;
//# sourceMappingURL=openai.d.ts.map
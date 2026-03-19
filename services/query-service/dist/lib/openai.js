import OpenAI from "openai";
import fs from "fs";
import { fileContext, textContext } from "./quizContext.js";
import { env } from "../util.js";
const openai = new OpenAI({
    apiKey: env.openai.apiKey,
});
export const createFileResponseParams = (context, uploadedFile) => {
    return {
        model: "gpt-5-nano",
        input: [
            {
                role: 'user',
                content: [
                    { type: 'input_text', text: context },
                    { type: 'input_file', file_id: uploadedFile.id }
                ]
            }
        ],
        store: true,
    };
};
export const createTextResponseParams = (buildContext, contentContext) => {
    return {
        model: "gpt-5-nano",
        input: [
            {
                role: 'user',
                content: [
                    { type: 'input_text', text: contentContext },
                    { type: 'input_text', text: buildContext }
                ]
            }
        ],
        store: true,
    };
};
export const generateOffFile = async (fileReference) => {
    const uploadedFile = await openai.files.create({
        file: fs.createReadStream(fileReference), // local file path
        purpose: "assistants"
    });
    const response = await openai.responses.create(createFileResponseParams(fileContext(), uploadedFile));
    const moddedOutput = response.output_text.replace("\\n", '');
    return JSON.parse(moddedOutput);
};
export const generateOffText = async (context) => {
    const response = await openai.responses.create(createTextResponseParams(textContext(), context));
    console.log("==================OPENAI RESPONSE========================");
    console.log(response);
    console.log("====================OPENAI  END==========================");
    const moddedOutput = response.output_text.replace("\\n", '');
    return JSON.parse(moddedOutput);
};
//# sourceMappingURL=openai.js.map
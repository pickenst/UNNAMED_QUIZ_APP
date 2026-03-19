import OpenAI from "openai"
import fs from "fs"
import { fileContext, textContext } from "./quizContext.js";
import type { ResponseCreateParamsNonStreaming } from "openai/resources/responses/responses.mjs";
import type { Quiz } from "@quizify/quiz-util";
import { env } from "../util.js";

const openai = new OpenAI({
  apiKey: env.openai.apiKey,
});

export const createFileResponseParams = (context: string, uploadedFile: OpenAI.Files.FileObject) => {
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
  } as ResponseCreateParamsNonStreaming
}

export const createTextResponseParams = (buildContext: string, contentContext: string) => {
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
  } as ResponseCreateParamsNonStreaming
}

export const generateOffFile = async (fileReference: string) => {
  
  const uploadedFile = await openai.files.create({
    file: fs.createReadStream(fileReference), // local file path
    purpose: "assistants"
  });

  const response = await openai.responses.create(createFileResponseParams(fileContext(), uploadedFile));

  const moddedOutput = response.output_text.replace("\\n", '');
  return JSON.parse(moddedOutput);
}

export const generateOffText = async (context: string) => {
  const response = await openai.responses.create(createTextResponseParams(textContext(), context));
  console.log("==================OPENAI RESPONSE========================")
  console.log(response)
  console.log("====================OPENAI  END==========================")
  const moddedOutput = response.output_text.replace("\\n", '');
  return JSON.parse(moddedOutput);
}
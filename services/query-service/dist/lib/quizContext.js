import { buildFormat } from '@quizify/quiz-util';
const defaultParams = {
    minQuestions: 4,
    maxQuestions: 4,
    minAnswers: 4,
    maxAnswers: 4
};
export const fileContext = (params = defaultParams, addedContex = "NO ADDITIONAL CONTEXT PROVIDED") => {
    return `
    Generate a quiz based on the attached file(s). 
    The response should be JSON formatted as ${buildFormat} with full consistency. 
    There should be at least ${params.minQuestions} questions and at most ${params.maxQuestions} questions. 
    Each question should have at least ${params.minAnswers} potential answers and at most ${params.maxAnswers} potential answers. 
    Ids should be indexed
    Additional Context: ${addedContex}
  `;
};
export const textContext = (params = defaultParams, addedContex = "NO ADDITIONAL CONTEXT PROVIDED") => {
    return `
    Generate a quiz based on the above text. 
    The response should be JSON formatted as ${buildFormat} with full consistency. 
    There should be at least ${params.minQuestions} questions and at most ${params.maxQuestions} questions. 
    Each question should have at least ${params.minAnswers} potential answers and at most ${params.maxAnswers} potential answers. 

    Additional Context: ${addedContex}
  `;
};
//# sourceMappingURL=quizContext.js.map
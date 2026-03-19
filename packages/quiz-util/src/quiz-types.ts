export interface BuildContextParams {
  minQuestions: number,
  maxQuestions: number,
  minAnswers: number,
  maxAnswers: number
}

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
};

export type Quiz = Question[]

export const buildFormat = `
Return a JSON array matching this structure:

[
  {
    id: string (unique id for the question),
    question: string (the question being asked),
    options: string[] (array of answer choices),
    correctAnswer: number (index of the correct answer in the options array),
    explanation: string (short explanation for the answer)
  }
]
`;
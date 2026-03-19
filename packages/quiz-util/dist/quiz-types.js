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
//# sourceMappingURL=quiz-types.js.map
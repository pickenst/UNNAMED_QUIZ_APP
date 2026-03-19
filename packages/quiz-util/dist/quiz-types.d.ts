export interface BuildContextParams {
    minQuestions: number;
    maxQuestions: number;
    minAnswers: number;
    maxAnswers: number;
}
export type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
};
export type Quiz = Question[];
export declare const buildFormat = "\nReturn a JSON array matching this structure:\n\n[\n  {\n    id: string (unique id for the question),\n    question: string (the question being asked),\n    options: string[] (array of answer choices),\n    correctAnswer: number (index of the correct answer in the options array),\n    explanation: string (short explanation for the answer)\n  }\n]\n";
//# sourceMappingURL=quiz-types.d.ts.map
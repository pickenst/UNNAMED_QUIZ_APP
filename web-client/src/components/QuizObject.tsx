import React from 'react';
import type { Quiz } from '@quizify/quiz-util';
import './QuizObject.css';

interface QuizProps {
  quiz: Quiz;
}

function QuizObject({ quiz }: QuizProps) {
  return (
    <div className="quiz-container">
      <h1>Your Quiz</h1>
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </div>
  );
}

export default QuizObject;
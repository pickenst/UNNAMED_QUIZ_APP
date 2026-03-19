import { useState } from 'react';
import type { Quiz } from '@quizify/quiz-util';
import './QuizGame.css';

interface QuizGameProps {
  quiz: Quiz;
  title?: string;
  onComplete: (score: number, total: number) => void;
}

export function QuizGame({ quiz, title = "Quiz", onComplete }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  // Key to force re-render/animation of the question card
  const [animationKey, setAnimationKey] = useState(0);

  const currentQuestion = quiz[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.length - 1;

  const handleOptionSelect = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerRevealed(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onComplete(selectedOption === currentQuestion.correctAnswer ? score + 1 : score, quiz.length);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setAnimationKey(prev => prev + 1);
    }
  };

  return (
    <div className="game-container">
      {/* Progress Header */}
      <div className="progress-header">
        <span>Question {currentQuestionIndex + 1} of {quiz.length}</span>
        <span className="topic-badge">{title}</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${((currentQuestionIndex) / quiz.length) * 100}%`,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>

      {/* Question Card */}
      {/* We use key={animationKey} to remount the component and trigger CSS animation */}
      <div
        key={animationKey}
        className="question-card animate-slide-in-right"
      >
        <div className="card-content">
          <h2 className="question-text">
            {currentQuestion.question}
          </h2>

          <div className="options-list">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = isAnswerRevealed && isCorrect;
              const showWrong = isAnswerRevealed && isSelected && !isCorrect;

              let optionClass = "option-button";

              if (isAnswerRevealed) {
                if (isCorrect) {
                  optionClass += " option-correct";
                } else if (isSelected) {
                  optionClass += " option-wrong";
                } else {
                  optionClass += " option-dimmed";
                }
              } else if (isSelected) {
                optionClass += " option-selected";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswerRevealed}
                  className={optionClass}
                >
                  <span className="option-text">{option}</span>
                  {showCorrect}
                  {showWrong}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Footer / Feedback Area */}
        <div className="card-footer">
          {isAnswerRevealed ? (
            <div className="feedback-area animate-fade-in">
              <div className="explanation-box">
                
                <p className="explanation-text">{currentQuestion.explanation}</p>
              </div>
              <button
                onClick={handleNextQuestion}
                className="next-button"
              >
                {isLastQuestion ? 'See Results' : 'Next Question'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="check-button"
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
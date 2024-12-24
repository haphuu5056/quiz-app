import React from 'react';
import he from 'he';
const Questions = ({
  id,
  question,
  answers,
  handleSelectedAnswer,
  showAnswers,
  selectedAns,
  correctAnswer,
}) => {
  const getAnswerButtonClassName = (answer) => {
    const isSelectedAnswer = selectedAns === answer;
    const isCorrectAnswer = answer === correctAnswer;

    if (isSelectedAnswer) {
      if (showAnswers) {
        return isCorrectAnswer ? 'correct-ans' : 'wrong-ans';
      } else {
        return 'answer-btn-selected';
      }
    } else if (showAnswers && isCorrectAnswer) {
      return 'correct-ans';
    } else {
      return 'answer-btn';
    }
  };
  return (
    <div className="question-container">
      <h3 className="questionName">{he.decode(question)}</h3>
      <div className="answers-container">
        {answers.map((answer, index) => {
          const answerButtonClassName = getAnswerButtonClassName(answer);
          return (
            <button
              disabled={showAnswers}
              key={index}
              onClick={() => handleSelectedAnswer(id, answer)}
              className={`answer-btn ${answerButtonClassName}`}
            >
              {he.decode(answer)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;

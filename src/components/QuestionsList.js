import React from 'react';
import Questions from './Questions';
const QuestionsList = React.memo(
  ({
    questions,
    handleSelectedAnswer,
    handleCheckAnswers,
    allQuestionsAnswered,
    showAnswers,
    score,
    restartQuiz,
  }) => {
    const noOfQuestions = questions.length;

    return (
      <div>
        {questions.map((question) => {
          return (
            <Questions
              key={question.id}
              {...question}
              showAnswers={showAnswers}
              handleSelectedAnswer={handleSelectedAnswer}
            />
          );
        })}
        <div className="footer">
          {showAnswers && (
            <h3>
              You Scored {score}/{noOfQuestions} Correct Answers
            </h3>
          )}
          <button
            className={`btn-primary ${
              allQuestionsAnswered
                ? 'btn-check-answers'
                : 'btn-check-answers-disabled'
            }`}
            onClick={showAnswers ? restartQuiz : handleCheckAnswers}
          >
            {showAnswers ? 'Play Again' : 'Check Answers'}
          </button>
        </div>
      </div>
    );
  }
);

export default QuestionsList;

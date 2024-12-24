import React, { useCallback, useEffect, useState } from 'react';
import QuestionsList from './components/QuestionsList';
import IntroPage from './components/IntroPage';
import { nanoid } from 'nanoid';
import loadingImg from './assets/image/loading.gif';
import Loading from './components/LoadingPic';
import ErrorMessage from './components/ErrorMessage';

import './App.css';
const API_URL = 'https://opentdb.com/api.php?amount=5';

const App = () => {  
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [screen, setScreen] = useState('start');
  const [showAnswers, setShowAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const allQuestionsAnswered = questions.every(
    (question) => question.selectedAns !== ''
  );

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line
  }, [API_URL]);
console.log(questions);

  const handleStartQuiz = () => setScreen('questions');

  const fetchQuizData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      const parsedQuestions = [];
      data.results.forEach((question) => {
        parsedQuestions.push({
          id: nanoid(),
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          question: question.question,
          correctAnswer: question.correct_answer,
          selectedAns: '',
        });
      });
      setIsLoading(false);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.log(error);
      setLoadingError('Error fetching questions', error);
      setIsLoading(false);
    }
  };
  const handleSelectAnswer = useCallback((id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, selectedAns: answer } : question
      )
    );
  }, []);

  const handleCheckAnswers = useCallback(() => {
    const score = questions.reduce((totalScore, question) => {
      if (question.correctAnswer === question.selectedAns) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
    setQuestions((prevQuestionsArray) =>
      prevQuestionsArray.map((question) => ({
        ...question,
      }))
    );
    setScore(score);
    setShowAnswers(true);
  }, [questions]);

  const restartQuiz = () => {
    setShowAnswers(false);
    setScreen('start');
    setScore(0);
    fetchQuizData();
  };

  return (
    <div className="app">
      {isLoading ? (
        <Loading loadingImg={loadingImg} />
      ) : loadingError ? (
        <ErrorMessage loadingError={loadingError} />
      ) : screen === 'start' ? (
        <IntroPage startQuiz={handleStartQuiz} />
      ) : questions.length > 0 ? (
        <QuestionsList
          questions={questions}
          handleSelectedAnswer={handleSelectAnswer}
          handleCheckAnswers={handleCheckAnswers}
          allQuestionsAnswered={allQuestionsAnswered}
          showAnswers={showAnswers}
          score={score}
          restartQuiz={restartQuiz}
        />
      ) : null}
    </div>
  );
};

export default App;

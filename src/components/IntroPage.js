import React from 'react';

function IntroPage({ startQuiz }) {
  return (
    <div className="intro">
      <h2>Quizzical</h2>
      <p className='desc'>Some description if needed</p>
      <button className="btn-primary" onClick={() => startQuiz('questions')}>
        Start quiz
      </button>
    </div>
  );
}

export default IntroPage;

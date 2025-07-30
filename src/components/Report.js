import React from 'react';
import { decode } from 'html-entities';

const Report = ({ questions, userAnswers }) => {
    let score = 0;
    questions.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) {
            score++;
        }
    });

    return (
        <div className="report-page">
            <h1>Quiz Report</h1>
            <p className="score">You scored {score} out of {questions.length}</p>

            {questions.map((question) => (
                <div key={question.id} className="report-item">
                    <h3>{decode(question.question)}</h3>
                    <p>Your Answer:
                        <span className={userAnswers[question.id] === question.correctAnswer ? 'correct-answer' : 'incorrect-answer'}>
                            {' '}{userAnswers[question.id] ? decode(userAnswers[question.id]) : 'Not Attempted'}
                        </span>
                    </p>
                    <p className="correct-answer">Correct Answer: {decode(question.correctAnswer)}</p>
                </div>
            ))}
        </div>
    );
};

export default Report;
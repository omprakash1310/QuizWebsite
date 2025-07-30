import React from 'react';
import { decode } from 'html-entities';

const Question = ({ questionData, selectedAnswer, onAnswerSelect }) => {
    return (
        <div className="question-container">
            <h2>{decode(questionData.question)}</h2>
            <ul>
                {questionData.choices.map((choice, index) => (
                    <li
                        key={index}
                        onClick={() => onAnswerSelect(questionData.id, choice)}
                        className={selectedAnswer === choice ? 'selected' : ''}
                    >
                        <input
                            type="radio"
                            name={`question_${questionData.id}`}
                            value={choice}
                            checked={selectedAnswer === choice}
                            onChange={() => onAnswerSelect(questionData.id, choice)}
                        />
                        <label>{decode(choice)}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
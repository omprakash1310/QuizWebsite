import React from 'react';

const NavigationPanel = ({
    totalQuestions,
    userAnswers,
    visitedQuestions,
    currentQuestion,
    onQuestionSelect,
}) => {
    return (
    <div className="navigation-panel">
        <h3>Questions</h3>
        <div className="nav-grid">
            {Array.from({ length: totalQuestions }, (_, i) => {
                const questionNumber = i;
                let statusClass = '';
                if (userAnswers[questionNumber] !== undefined) {
                    statusClass = 'attempted'; // Mark as attempted if an answer exists.
                } else if (visitedQuestions.includes(questionNumber)) {
                    statusClass = 'visited'; // Mark as visited if it's in the visited array.
                }
                if (currentQuestion === questionNumber) {
                    statusClass += ' current'; // Highlight the current question.
                }

                return (
                    <button
                        key={questionNumber}
                        className={`nav-button ${statusClass}`}
                        // Allow navigation to a specific question.
                        onClick={() => onQuestionSelect(questionNumber)}
                    >
                        {questionNumber + 1}
                    </button>
                );
            })}
        </div>
    </div>
);
};

export default NavigationPanel;
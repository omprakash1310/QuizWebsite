import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { fetchQuizQuestions } from './services/quizService';
import Question from './components/Question';
import Timer from './components/Timer';
import NavigationPanel from './components/NavigationPanel';
import Report from './components/Report';

const QUIZ_STAGES = {
    START: 'start',
    ACTIVE: 'active',
    REPORT: 'report'
};

function App() {
    const [stage, setStage] = useState(QUIZ_STAGES.START);
    const [email, setEmail] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [visitedQuestions, setVisitedQuestions] = useState([0]);
    const [error, setError] = useState(null);

    const loadQuestions = useCallback(async () => {
        try {
            setError(null);
            const fetchedQuestions = await fetchQuizQuestions();
            setQuestions(fetchedQuestions);
        } catch (err) {
            setError('Failed to load quiz questions. Please check your connection and try again.');
            console.error(err);
        }
    }, []);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    useEffect(() => {
        if (!visitedQuestions.includes(currentQuestion)) {
            setVisitedQuestions(prev => [...prev, currentQuestion]);
        }
    }, [currentQuestion, visitedQuestions]);

    const handleStartQuiz = (e) => {
        e.preventDefault();
        if (email.trim() !== '' && questions.length > 0) {
            setStage(QUIZ_STAGES.ACTIVE);
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleQuestionSelect = (questionId) => {
        setCurrentQuestion(questionId);
    };

    const handleSubmitQuiz = () => {
        setStage(QUIZ_STAGES.REPORT);
    };

    // Handler for the Previous button
    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    // Handler for the Next button
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const renderContent = () => {
        if (error) {
            return (
                <div className="start-page">
                    <h1>Something Went Wrong</h1>
                    <p style={{ color: 'red' }}>{error}</p>
                    <button onClick={loadQuestions}>Try Again</button>
                </div>
            );
        }

        switch (stage) {
            case QUIZ_STAGES.START:
                return (
                    <div className="start-page">
                        <h1>Welcome to the Quiz!</h1>
                        <p>Please enter your email to start.</p>
                        <form onSubmit={handleStartQuiz}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <br />
                            <button type="submit" disabled={questions.length === 0}>
                                {questions.length > 0 ? 'Start Quiz' : 'Loading...'}
                            </button>
                        </form>
                    </div>
                );

            case QUIZ_STAGES.ACTIVE:
                return (
                    <>
                        <Timer onTimeUp={handleSubmitQuiz} />
                        <div className="quiz-layout">
                            <div className="question-section">
                                <Question
                                    questionData={questions[currentQuestion]}
                                    selectedAnswer={userAnswers[currentQuestion]}
                                    onAnswerSelect={handleAnswerSelect}
                                />
                                <div className="quiz-actions">
                                    <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                                        Previous
                                    </button>
                                    <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
                                        Next
                                    </button>
                                    <button onClick={handleSubmitQuiz} className="submit-btn">
                                        Submit Quiz
                                    </button>
                                </div>
                            </div>
                            <div className="navigation-section">
                                <NavigationPanel
                                    totalQuestions={questions.length}
                                    userAnswers={userAnswers}
                                    visitedQuestions={visitedQuestions}
                                    currentQuestion={currentQuestion}
                                    onQuestionSelect={handleQuestionSelect}
                                />
                            </div>
                        </div>
                    </>
                );

            case QUIZ_STAGES.REPORT:
                return <Report questions={questions} userAnswers={userAnswers} />;

            default:
                return null;
        }
    };

    return <div className="App">{renderContent()}</div>;
}

export default App;
const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const fetchQuizQuestions = async () => {
    // Fetches 15 multiple-choice questions from the Open Trivia Database API.
    const response = await fetch('https://api.allorigins.win/raw?url=https%3A%2F%2Fopentdb.com%2Fapi.php%3Famount%3D15%26type%3Dmultiple');
    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    const data = await response.json();

    // Processes the API response to fit the application's data structure.
    return data.results.map((questionItem, index) => {
        // Combines correct and incorrect answers into a single 'choices' array.
        const choices = shuffleArray([...questionItem.incorrect_answers, questionItem.correct_answer]);
        return {
            id: index, // Simple ID for tracking
            question: questionItem.question, // The question text.
            choices: choices,
            correctAnswer: questionItem.correct_answer, // The correct answer.
        };
    });
};
# Quiz Website built with React.

The website is a single-page application (SPA) built using React that presents a 15-question quiz to the user. My approach was to break down the UI into logical, reusable components and manage the application's state in a centralized parent component (`App.js`).


## Core Components
1. StartPage.js: A simple form to capture the user's email before starting the quiz.

2. Quiz.js: The main component that orchestrates the active quiz session. It renders the timer, the current question, and the navigation panel.

3. Timer.js: A 30-minute countdown timer that auto-submits the quiz when time expires.

4. Question.js: Displays a single question and its choices. The choices are a shuffled combination of the `correct_answer` and `incorrect_answers` from the API data.

4. NavigationPanel.js: Allows users to jump to any question and visually indicates which questions have been visited or attempted.

5. Report.js: The final page that shows a detailed breakdown of each question, the user's selected answer, and the correct answer.

6. quizService.js: A dedicated module to handle fetching and processing the quiz data from the API.
## Installation

Setup and Installation

  1.  **Clone the repository:**
    
    git clone https://github.com/omprakash1310/QuizWebsite
    
2.  **Navigate to the project directory:**
    ```bash
    cd website
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the Website:**
    ```bash
    npm start
    ```
    The Website will be available at `http://localhost:3000`.
## Assumptions Made

1. The specified API is assumed to be `https://opentdb.com/api.php?amount=15&type=multiple`. This is a common public API for quiz questions that fits the described data structure.

2. Visited" status for a question is triggered the moment a user navigates to it.

3. The email collected on the start page is for demonstration purposes and is not stored or sent anywhere.

## Challenges Faced

1. One challenge was managing the state for each question's status (unvisited, visited, attempted) and ensuring it updated correctly when the user navigated via the panel or submitted an answer. I solved this by using state arrays (`visitedQuestions`, `userAnswers`) in the main `App.js` component, which provided a single source of truth that could be passed down to all child components.

2. Another significant challenge was the `Failed to fetch` network error. This was diagnosed by testing the API link directly, confirming the API was working, and then deducing the block was local. The issue was resolved by using a CORS proxy (`api.allorigins.win`) to bypass the local network/firewall restrictions that were blocking the API call from the application.
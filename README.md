Quiz React App

A multi-category quiz application built with React that lets users attempt timed MCQ quizzes across domains like Sports, Finance, Science/Social Studies, and General Knowledge. The app tracks scores, saves best scores per category, supports light/dark themes, and provides a detailed answer review at the end of each quiz.​

Live demo: https://quiz-react-qc7r5lui0-pranav-shalyas-projects.vercel.app

Features
Multiple quiz domains: Sports, Finance, Science/Social Studies, General Knowledge.​

10 curated MCQs per category with single-correct options.

Three-step flow: Category selection → Quiz → Result & Review.​

Timed quiz with countdown and auto-finish when time is over.​

Per-question progress:

Overall progress bar.

Question status dots showing answered/unanswered and allowing jump navigation.​

Score tracking:

Score and accuracy at the end of the quiz.

Best score per category persisted in localStorage and displayed on the category cards.​​

Detailed review screen showing each question, user’s answer, and correct answer.

Light/Dark theme toggle:

Theme stored in localStorage.

Implemented via data-theme attribute and CSS variables.​

Responsive, card-based UI with smooth hover and focus states.

Tech Stack
React (functional components + hooks: useState, useEffect).​

Plain CSS for layout, theming, and animations (App.css).

LocalStorage for persisting theme and best scores.​

Deployed on Vercel.

Project Structure

text
src/
  App.jsx            // Top-level state: step, category, theme, bestScores
  App.css            // Global layout, quiz card, light/dark theme styles
  questions.js       // questionBank object grouped by category
  CategoryScreen.jsx // Choose category and view best score per category
  QuizScreen.jsx     // Main quiz logic + timer + navigation + progress
  ResultScreen.jsx   // Final score, accuracy, review of all answers
  index.js           // React entry point
State Flow
App.jsx:

step: "category" | "quiz" | "result".

selectedCategory, currentQuestions.

score, lastAnswers for result screen.

bestScores and theme persisted in localStorage.

QuizScreen.jsx:

quizState: { status, currentQuestion, selectedAnswer, score, answers[] }.

timeLeft for the quiz countdown.

On finish, calls onFinish(finalScore, answers) to update parent state.

Getting Started
Prerequisites
Node.js (LTS recommended).

npm or yarn installed.

Installation
bash
# clone the repo
git clone <your-repo-url>
cd quiz-react-app

# install dependencies
npm install
# or
yarn
Run in development
bash
npm start
# or
yarn start
The app will be available at http://localhost:3000/ by default (Create React App) or the configured port for your setup.​​

Build for production
bash
npm run build
# or
yarn build
Deploy the contents of the build folder to any static hosting platform (e.g., Vercel, Netlify).​


How It Works

Question data is defined in questionBank grouped by category keys (sports, finance, science, gk).​

When a user selects a category, filtered questions are passed into QuizScreen.

Each submitted answer updates:

score if correct.

answers[] with { questionIndex, chosenIndex, isCorrect }.

At the end of the quiz or when the timer runs out:

Parent App updates score, lastAnswers, and bestScores[category] in localStorage if improved.

ResultScreen uses answers[] + questions[] to render the review list.


Possible Extensions

Add difficulty levels and let users choose number of questions.

Fetch questions from an external API (e.g., Open Trivia DB) for one category.​

Add keyboard shortcuts and improved accessibility (aria-* attributes, focus management).​

Write unit tests with React Testing Library for core flows (timer, scoring, review).​

License
This project is for learning and portfolio purposes. Adapt and extend it as needed.

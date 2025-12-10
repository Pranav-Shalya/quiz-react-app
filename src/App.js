// App.jsx
import { useState,useEffect } from "react";
import "./App.css";
import { questionBank } from "./questions"; // we'll define this structure later

import CategoryScreen from "./CategoryScreen";
import QuizScreen from "./QuizScreen";
import ResultScreen from "./ResultScreen";

function App() {
  const [step, setStep] = useState("category"); // "category" | "quiz" | "result"
  const [selectedCategory, setSelectedCategory] = useState(null); // "sports" | "finance" | ...
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const [lastAnswers, setLastAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  const [bestScores, setBestScores] = useState(() => {
   const raw = localStorage.getItem("bestScores");
   return raw ? JSON.parse(raw) : {};  // shape: { [categoryKey]: number }
  });
  const [theme, setTheme] = useState(() => {
  // read once from localStorage; fallback to "light"
  return localStorage.getItem("theme") || "light";
});


useEffect(() => {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

const toggleTheme = () => {
  setTheme((prev) => (prev === "light" ? "dark" : "light"));
};


//   useEffect(() => {
//   if (status !== "active") return;
//   if (timeLeft <= 0) {
//     // auto finish
//     onFinish(score, answers);
//     setQuizState((prev) => ({ ...prev, status: "finished" }));
//     return;
//   }

//   const id = setInterval(() => {
//     setTimeLeft((t) => t - 1);
//   }, 1000);

//   return () => clearInterval(id);
// }, [status, timeLeft, score, answers, onFinish]);

  const handleStartQuiz = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setCurrentQuestions(questionBank[categoryKey] || []);
    setScore(0);
    setStep("quiz");
  };

  const handleQuizFinish = (finalScore, answers) => {
    setScore(finalScore);
    setLastAnswers(answers);
    setStep("result");

    if (selectedCategory) {
      setBestScores((prev) => {
       const currentBest = prev[selectedCategory] || 0;
       const newBest =
         finalScore > currentBest ? finalScore : currentBest;
       const updated = { ...prev, [selectedCategory]: newBest };
       localStorage.setItem("bestScores", JSON.stringify(updated));
       localStorage.setItem("lastCategory", selectedCategory);
       return updated;
      });
     }
  };
  // const handleQuizFinish = (finalScore,answers) => {
  //   setScore(finalScore);
  //   setLastAnswers(answers);
  //   setStep("result");
  // };

  const handleRestart = () => {
    setStep("category");
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setScore(0);
  };

   return (
    <div className="app-root">
      <div className="quiz-card">
        <div
         style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
         }}
        >
        <div className="quiz-title" style={{ marginBottom: 0 }}>
          Quiz App
        </div>
        <button className="btn btn-secondary" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} mode
        </button>
      </div>
        {step === "category" && (
          <CategoryScreen onStartQuiz={handleStartQuiz} 
          bestScores={bestScores}
          />
        )}
        {step === "quiz" && (
          <QuizScreen
            questions={currentQuestions}
            onFinish={handleQuizFinish}
            category={selectedCategory}
          />
        )}
        {step === "result" && (
          <ResultScreen
            score={score}
            total={currentQuestions.length}
            category={selectedCategory}
            answers={lastAnswers}        // always an array
            questions={currentQuestions} // always an array
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;


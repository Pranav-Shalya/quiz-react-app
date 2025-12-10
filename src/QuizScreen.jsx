// // QuizScreen.jsx
// import { useState } from "react";

// function QuizScreen({ questions, onFinish, category }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);

//   if (!questions || questions.length === 0) {
//     return <p>No questions for this category yet.</p>;
//   }

//   const handleAnswerClick = (isCorrect) => {
//     const nextScore = score + (isCorrect ? 1 : 0);
//     setScore(nextScore);

//     const nextIndex = currentQuestion + 1;
//     if (nextIndex < questions.length) {
//       setCurrentQuestion(nextIndex);
//     } else {
//       onFinish(nextScore);
//     }
//   };

//   const q = questions[currentQuestion];

//   return (
//     <>
//       <h1 className="quiz-title">
//         {category?.toUpperCase()} Quiz
//       </h1>
//       <p className="quiz-subtitle">
//         Answer the questions below. One correct option per question.
//       </p>

//       <div className="question-meta">
//         <span>
//           Question {currentQuestion + 1} / {questions.length}
//         </span>
//         <span>Score: {score}</span>
//       </div>

//       <div className="question-text">{q.questionText}</div>

//       <div className="options-list">
//         {q.answerOptions.map((opt, idx) => (
//           <button
//             key={idx}
//             className="option-btn"
//             onClick={() => handleAnswerClick(opt.isCorrect)}
//           >
//             {opt.answerText}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// }
// export default QuizScreen;

// QuizScreen.jsx
import { useState, useEffect } from "react";

function QuizScreen({ questions, onFinish, category }) {
  const [quizState, setQuizState] = useState({
    status: "welcome",            // "welcome" | "active" | "finished"
    currentQuestion: 0,
    selectedAnswer: null,         // index of selected option
    score: 0,
    answers: [],                  // { questionIndex, chosenIndex, isCorrect }
  });

  const [timeLeft, setTimeLeft] = useState(60);

  // ✅ 1) DESTRUCTURE IMMEDIATELY AFTER STATE
  const { status, currentQuestion, selectedAnswer, score, answers } = quizState;

  // ✅ 2) USE DESTRUCTURED VALUES IN EFFECT + DEP ARRAY
  useEffect(() => {
    if (status !== "active") return;

    if (timeLeft <= 0) {
      // time over: auto finish
      onFinish(score, answers);
      setQuizState((prev) => ({ ...prev, status: "finished" }));
      return;
    }

    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [status, timeLeft, score, answers, onFinish]);

  // ----------------------

  if (!questions || questions.length === 0) {
    return <p>No questions for this category yet.</p>;
  }

  const startQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      status: "active",
      currentQuestion: 0,
      selectedAnswer: null,
      score: 0,
      answers: [],
    }));
    setTimeLeft(60); // reset timer each time quiz starts
  };

  const handleSelectAnswer = (optionIndex) => {
    setQuizState((prev) => ({ ...prev, selectedAnswer: optionIndex }));
  };

  const goToNext = () => {
    const q = questions[currentQuestion];
    const option = q.answerOptions[selectedAnswer];
    const isCorrect = option?.isCorrect;

    const updatedAnswers = [
      ...answers,
      {
        questionIndex: currentQuestion,
        chosenIndex: selectedAnswer,
        isCorrect: !!isCorrect,
      },
    ];

    const nextScore = score + (isCorrect ? 1 : 0);
    const isLast = currentQuestion === questions.length - 1;

    if (isLast) {
      setQuizState((prev) => ({
        ...prev,
        status: "finished",
        score: nextScore,
        answers: updatedAnswers,
      }));
      onFinish(nextScore, updatedAnswers);
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        score: nextScore,
        answers: updatedAnswers,
      }));
    }
  };

  const goToPrevious = () => {
    if (currentQuestion === 0) return;
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion - 1,
      selectedAnswer: null,
    }));
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredSet = new Set(answers.map((a) => a.questionIndex));

  // --- RENDERING ---
  if (status === "welcome") {
    return (
      <>
        <h1 className="quiz-title">{category?.toUpperCase()} Quiz</h1>
        <p className="quiz-subtitle">
          There are {questions.length} questions. Click start to begin.
        </p>
        <button className="btn btn-primary btn-block" onClick={startQuiz}>
          Start quiz
        </button>
      </>
    );
  }

  if (status === "finished") {
    return (
      <>
        <h1 className="quiz-title">{category?.toUpperCase()} Quiz</h1>
        <p className="quiz-subtitle">
          You finished this quiz. Check your results on the next screen.
        </p>
      </>
    );
  }

  const q = questions[currentQuestion];

  return (
    <>
      {/* overall progress bar */}
      <div
        style={{
          width: "100%",
          height: 6,
          borderRadius: 999,
          background: "#e5e7eb",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg,#22c55e,#16a34a)",
            transition: "width 0.2s ease",
          }}
        />
      </div>

      <div className="question-meta">
        <span>
          Question {currentQuestion + 1} / {questions.length}
        </span>
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
      </div>

      {/* per-question status / navigation */}
<div
  style={{
    display: "flex",
    gap: 4,
    marginBottom: 10,
    flexWrap: "wrap",
  }}
>
  {questions.map((_, idx) => {
    const isCurrent = idx === currentQuestion;
    const isAnswered = answeredSet.has(idx);

    return (
      <div
        key={idx}
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isCurrent
            ? "#4f46e5"
            : isAnswered
            ? "#22c55e"
            : "#e5e7eb",
          color: isCurrent ? "#f9fafb" : "#111827",
          cursor: "pointer",
        }}
        onClick={() =>
          setQuizState((prev) => ({
            ...prev,
            currentQuestion: idx,
            selectedAnswer: null,
          }))
        }
      >
        {idx + 1}
      </div>
    );
  })}
</div>


      <div className="question-text">{q.questionText}</div>

      <div className="options-list">
        {q.answerOptions.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          return (
            <button
              key={idx}
              className="option-btn"
              onClick={() => handleSelectAnswer(idx)}
              style={
                isSelected
                  ? {
                      borderColor: "#4f46e5",
                      background: "#eef2ff",
                    }
                  : {}
              }
            >
              {opt.answerText}
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={goToPrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={goToNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
}

export default QuizScreen;




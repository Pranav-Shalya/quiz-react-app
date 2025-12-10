// function ResultScreen({ score, total, category,answers, questions, onRestart }) {
//   const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

//   return (
//     <>
//       <h1 className="quiz-title">Quiz finished 🎯</h1>
//       <p className="quiz-subtitle">
//         Category: {category?.toUpperCase()}
//       </p>

//       <div className="result-score">
//         {score} / {total} correct
//       </div>
//       <div className="result-meta">
//         Accuracy: {percentage}% 
//       </div>

//       {/* Review section */}
//       <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 16 }}>
//         Review your answers
//       </h3>
//       <div style={{ maxHeight: 260, overflowY: "auto", paddingRight: 4 }}>
//         {answers.map((ans, index) => {
//           const q = questions[ans.questionIndex];
//           if (!q) return null;

//           const chosen = q.answerOptions[ans.chosenIndex];
//           const correctOption = q.answerOptions.find((opt) => opt.isCorrect);

//           const isCorrect = ans.isCorrect;

//           return (
//             <div
//               key={index}
//               style={{
//                 borderRadius: 8,
//                 padding: 10,
//                 marginBottom: 8,
//                 background: isCorrect ? "#ecfdf5" : "#fef2f2",
//                 border: `1px solid ${isCorrect ? "#22c55e" : "#f97373"}`,
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 600,
//                   marginBottom: 4,
//                   color: "#111827",
//                 }}
//               >
//                 Q{index + 1}. {q.questionText}
//               </div>

//               <div style={{ fontSize: 13, marginBottom: 2 }}>
//                 Your answer:{" "}
//                 <span style={{ fontWeight: 500 }}>
//                   {chosen ? chosen.answerText : "Not answered"}
//                 </span>
//               </div>

//               <div style={{ fontSize: 13 }}>
//                 Correct answer:{" "}
//                 <span style={{ fontWeight: 500 }}>
//                   {correctOption ? correctOption.answerText : "N/A"}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>


//       <button
//         className="btn btn-primary btn-block"
//         onClick={onRestart}
//       >
//         Back to categories
//       </button>
//     </>
//   );
// }
// export default ResultScreen;
// ResultScreen.jsx
function ResultScreen({ score, total, category, answers, questions, onRestart }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <>
      <h1 className="quiz-title">Quiz finished 🎯</h1>
      <p className="quiz-subtitle">
        Category: {category?.toUpperCase()}
      </p>

      <div className="result-score">
        {score} / {total} correct
      </div>
      <div className="result-meta">
        Accuracy: {percentage}% 
      </div>

      {/* Review section */}
      <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 16 }}>
        Review your answers
      </h3>
      <div style={{ maxHeight: 260, overflowY: "auto", paddingRight: 4 }}>
        {answers.map((ans, index) => {
          const q = questions[ans.questionIndex];
          if (!q) return null;

          const chosen = q.answerOptions[ans.chosenIndex];
          const correctOption = q.answerOptions.find((opt) => opt.isCorrect);

          const isCorrect = ans.isCorrect;

          return (
            <div
              key={index}
              style={{
                borderRadius: 8,
                padding: 10,
                marginBottom: 8,
                background: isCorrect ? "#ecfdf5" : "#fef2f2",
                border: `1px solid ${isCorrect ? "#22c55e" : "#f97373"}`,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 4,
                  color: "#111827",
                }}
              >
                Q{index + 1}. {q.questionText}
              </div>

              <div style={{ fontSize: 13, marginBottom: 2 }}>
                Your answer:{" "}
                <span style={{ fontWeight: 500 }}>
                  {chosen ? chosen.answerText : "Not answered"}
                </span>
              </div>

              <div style={{ fontSize: 13 }}>
                Correct answer:{" "}
                <span style={{ fontWeight: 500 }}>
                  {correctOption ? correctOption.answerText : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="btn btn-primary btn-block"
        onClick={onRestart}
        style={{ marginTop: 16 }}
      >
        Back to categories
      </button>
    </>
  );
}

export default ResultScreen;



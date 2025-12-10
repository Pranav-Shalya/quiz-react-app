// const categories = [
//   { key: "sports", label: "Sports", desc: "Cricket, football and more" },
//   { key: "finance", label: "Finance", desc: "Markets, money and investing" },
//   { key: "science", label: "Science / Social", desc: "Physics, chemistry, society" },
//   { key: "gk", label: "General Knowledge", desc: "Mixed trivia from everywhere" },
// ];

// function CategoryScreen({ onStartQuiz }) {
//   return (
//     <>
//       <h1 className="quiz-title">Choose your quiz</h1>
//       <p className="quiz-subtitle">
//         Pick a domain to start a quick MCQ quiz.
//       </p>

//       <div className="category-grid">
//         {categories.map((cat) => (
//           <button
//             key={cat.key}
//             className="category-card"
//             onClick={() => onStartQuiz(cat.key)}
//           >
//             <div className="category-card__title">{cat.label}</div>
//             <div className="quiz-subtitle">{cat.desc}</div>
//             <span className="category-card__badge">10 questions</span>
//           </button>
//         ))}
//       </div>
//     </>
//   );
// }
// export default CategoryScreen;

// CategoryScreen.jsx
const categories = [
  { key: "sports", label: "Sports", desc: "Cricket, football and more" },
  { key: "finance", label: "Finance", desc: "Markets, money and investing" },
  { key: "science", label: "Science / Social", desc: "Physics, chemistry, society" },
  { key: "gk", label: "General Knowledge", desc: "Mixed trivia from everywhere" },
];

function CategoryScreen({ onStartQuiz, bestScores = {} }) {
  return (
    <>
      <h1 className="quiz-title">Choose your quiz</h1>
      <p className="quiz-subtitle">
        Pick a domain to start a quick MCQ quiz.
      </p>

      <div className="category-grid">
        {categories.map((cat) => {
          const best = bestScores[cat.key] || 0;
          return (
            <button
              key={cat.key}
              className="category-card"
              onClick={() => onStartQuiz(cat.key)}
            >
              <div className="category-card__title">{cat.label}</div>
              <div className="quiz-subtitle">{cat.desc}</div>
              <span className="category-card__badge">
                Best score: {best}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default CategoryScreen;

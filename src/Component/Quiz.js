import { useState } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { id } = useParams();  // Get quiz ID from URL
  const quizzes = JSON.parse(localStorage.getItem("quizdata")) || [];
  const quiz = quizzes.find((quiz) => quiz.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  // Safely access the currentQuestion
  const currentQuestion = quiz.questions[currentQuestionIndex] || null;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === currentQuestion.options[currentQuestion.correctOption];
    setAnswers([...answers, isCorrect]);
    setSelectedOption(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalScore = answers.filter((answer) => answer).length + (isCorrect ? 1 : 0);
      setScore(totalScore);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{quiz.title}</h2>
      {score === null ? (
        currentQuestion ? (
          <div>
            <div style={styles.questionContainer}>
              <h4>{currentQuestion.questionText}</h4>
              {currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>

            <button onClick={handleNextQuestion} style={styles.button}>
              {currentQuestionIndex < quiz.questions.length - 1
                ? "Next Question"
                : "Submit Quiz"}
            </button>
          </div>
        ) : (
          <p>No questions available for this quiz.</p>
        )
      ) : (
        <div>
          <h3>Your score: {score} / {quiz.questions.length}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Quiz;

import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Quizdata() {
  const [showForm, setShowForm] = useState(false);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    time: "",
    questions: []
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: null,
  });

  const [quizzes, setQuizzes] = useState(
    JSON.parse(localStorage.getItem("quizdata")) || []
  );

  const getInputValue = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const getQuestionInput = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const getOptionInput = (e, index) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = e.target.value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const setCorrectOption = (index) => {
    setCurrentQuestion({ ...currentQuestion, correctOption: index });
  };

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctOption: null,
    });
  };

  const submitQuiz = (e) => {
    e.preventDefault();

    // Ensure the last question is added if it's not empty
    if (currentQuestion.questionText && currentQuestion.options.some(option => option)) {
      setQuestions([...questions, currentQuestion]);
    }

    const uniqueId = Date.now() + Math.random().toString(16).slice(2);
    const quizData = { ...quiz, questions: [...questions, currentQuestion], id: uniqueId };

    const updatedQuizzes = [...quizzes, quizData];
    localStorage.setItem("quizdata", JSON.stringify(updatedQuizzes));
    setQuizzes(updatedQuizzes);

    setQuiz({ title: "", description: "", time: "", questions: [] });
    setQuestions([]);
    setCurrentQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctOption: null,
    });
    setShowForm(false);
  };

  const toggleForm = () => setShowForm(!showForm);

  // New function to delete a quiz
  const deleteQuiz = (quizId) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizdata", JSON.stringify(updatedQuizzes));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Quiz Management</h2>
      <button onClick={toggleForm} style={styles.addButton}>
        {showForm ? "Close Quiz Form" : "Add Quiz"}
      </button>

      {showForm && (
        <form method="post" onSubmit={submitQuiz} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Quiz Title</label>
            <input
              type="text"
              name="title"
              value={quiz.title}
              onChange={getInputValue}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea
              name="description"
              value={quiz.description}
              onChange={getInputValue}
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="time" style={styles.label}>Quiz Time (minutes)</label>
            <input
              type="number"
              name="time"
              value={quiz.time}
              onChange={getInputValue}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="questionText" style={styles.label}>Question</label>
            <input
              type="text"
              name="questionText"
              value={currentQuestion.questionText}
              onChange={getQuestionInput}
              style={styles.input}
              required
            />
          </div>

          {currentQuestion.options.map((option, index) => (
            <div key={index} style={styles.formGroup}>
              <label style={styles.label}>Option {index + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => getOptionInput(e, index)}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setCorrectOption(index)}
                style={styles.correctButton}
              >
                {currentQuestion.correctOption === index
                  ? "Correct Answer"
                  : "Set Correct"}
              </button>
            </div>
          ))}

          <div style={styles.buttonContainer}>
            <button type="button" onClick={addQuestion} style={styles.addButton}>
              Add Question
            </button>
          </div>

          <div style={styles.buttonContainer}>
            <input type="submit" value="Save Quiz" style={styles.submitButton} />
          </div>
         

          {/* Display the added questions */}
          <div style={styles.questionList}>
            <h4>Added Questions:</h4>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={index} style={styles.questionItem}>
                  <h5>Question {index + 1}: {question.questionText}</h5>
                  <ul>
                    {question.options.map((option, idx) => (
                      <li key={idx}>
                        {option} {question.correctOption === idx && "(Correct Answer)"}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No questions added yet.</p>
            )}
          </div>
        </form>
      )}
       <Link to="/" style={styles.gobk}>
                           Go Back
                        </Link>

      <div style={styles.quizList}>
        <h3>Quizzes</h3>
        {quizzes.length > 0 ? (
          quizzes.map((quizItem) => (
            <div key={quizItem.id} style={styles.quizItem}>
               <Link to={`/quiz/${quizItem.id}`}>
                <h4>{quizItem.title}</h4>
              </Link>
              {/* Display quiz questions */}
              {quizItem.questions && (
                <div>
                  <h5>Questions:</h5>
                  {quizItem.questions.map((question, qIndex) => (
                    <div key={qIndex} style={styles.questionItem}>
                      <h6>{question.questionText}</h6>
                      <ul>
                        {question.options.map((option, oIndex) => (
                          <li key={oIndex}>
                            {option} {question.correctOption === oIndex && "(Correct Answer)"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => deleteQuiz(quizItem.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No quizzes added yet.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  addButton: {
    display: 'block',
    margin: '10px auto',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  gobk: {
    textDecoration:"none",
    backgroundColor: 'rgb(94 220 53)',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  form: {
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  correctButton: {
    marginTop: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  quizList: {
    marginTop: '30px',
  },
  quizItem: {
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionList: {
    marginTop: '20px',
  },
  questionItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
};

export default Quizdata;
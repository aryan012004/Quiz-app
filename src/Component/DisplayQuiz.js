import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function DisplayQuiz() {
  const [showForm, setShowForm] = useState(false);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    time: ""
  });

  const [quizzes, setQuizzes] = useState(
    JSON.parse(localStorage.getItem("quizdata")) || []
  );

  const getInputValue = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const submitQuiz = (e) => {
    e.preventDefault();

    const uniqueId = Date.now() + Math.random().toString(16).slice(2);

    const quizData = { ...quiz, id: uniqueId };

    const updatedQuizzes = [...quizzes, quizData];

    localStorage.setItem("quizdata", JSON.stringify(updatedQuizzes));

    setQuizzes(updatedQuizzes);

    setQuiz({
      title: "",
      description: "",
      time: ""
    });

    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Quiz Management</h2>
     

      

      <div style={styles.quizList}>
        <h3>Quizzes</h3>
        {quizzes.length > 0 ? (
          quizzes.map((quizItem) => (
            <div key={quizItem.id} style={styles.quizItem}>
              <h4>Quize: {quizItem.title}</h4>
              <p>Quize Description: {quizItem.description}</p>
              <p><strong>Time:</strong> {quizItem.time} minutes</p>
              <Link to={`/quiz/${quizItem.id}`}style={{textDecoration:"none"}}>
                <h4 >Take Test</h4>
              </Link>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(to right, #f0f4f8, #e1e9f0)',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'none',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  quizList: {
    width: '100%',
    maxWidth: '600px',
  },
  quizItem: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
};

export default DisplayQuiz;

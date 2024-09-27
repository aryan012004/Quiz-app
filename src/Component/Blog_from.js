import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogForm() {
  const [person, setPerson] = useState({
    category: "",
    title: "",
    bloggername: "",
    description: ""
  });

    useEffect(() => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser) {
        setPerson((prevState) => ({
          ...prevState,
          bloggername: loggedInUser.username || "" 
        }));
      }
    }, []);

  const getInputValue = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const submitData = (e) => {
    e.preventDefault();

    const uniqueId = Date.now() + Math.random().toString(16).slice(2);

    const blogPost = { ...person, id: uniqueId };

    let existingBlogs = JSON.parse(localStorage.getItem("blogdata")) || [];

    existingBlogs.push(blogPost);

    localStorage.setItem("blogdata", JSON.stringify(existingBlogs));

    setPerson({
      category: "",
      title: "",
      bloggername: person.bloggername,
      description: ""
    });

    console.log("Blog posts:", existingBlogs);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create a Blog Post</h2>
      <form method="post" onSubmit={submitData} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>Category</label>
          <select
            id="category"
            name="category"
            value={person.category}
            onChange={getInputValue}
            style={styles.select}
          >
            <option value="">--Category List--</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={person.title}
            onChange={getInputValue}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="bloggername" style={styles.label}>Blogger Name</label>
          <input
            type="text"
            name="bloggername"
            value={person.bloggername}
            onChange={getInputValue}
            style={styles.input}
            readOnly 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            name="description"
            value={person.description}
            onChange={getInputValue}
            rows="4"
            style={styles.textarea}
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <input type="submit" value="Post" style={styles.submitButton} />
        </div>
      </form>
      <Link to="/post" style={styles.viewLink}>View Posts</Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(to right, #f0f4f8, #e1e9f0)', // Background gradient
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
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
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
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
  viewLink: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default BlogForm;

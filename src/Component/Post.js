import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Post() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedPost, setUpdatedPost] = useState({
    category: '',
    title: '',
    bloggername: '',
    description: ''
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('blogdata'));
    if (localData === null) {
      setPosts([]);
    } else {
      setPosts(localData);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('blogdata', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleEditToggle = (post) => {
    if (editingPostId === post.id) {
      const updatedPosts = posts.map(p => p.id === post.id ? { ...post, ...updatedPost } : p);
      localStorage.setItem('blogdata', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
      setEditingPostId(null);
    } else {
      setEditingPostId(post.id);
      setUpdatedPost({
        category: post.category,
        title: post.title,
        bloggername: post.bloggername,
        description: post.description
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
  };

  const goToBlog = () => {
    navigate('/blog'); // Replace '/blog' with the actual path to your blog page
  };

  return (
    <div style={styles.container}>
      {posts.length === 0 ? (
        <h2 style={styles.noPostsMessage}>No blog posts available</h2>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <div style={styles.header}>
              <p style={styles.category}>Category: {post.category}</p>
              <h2 style={styles.title}>Title: {post.title}</h2>
            </div>
            <div style={styles.body}>
              {editingPostId === post.id ? (
                <div>
                  <input
                    name="category"
                    value={updatedPost.category}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="title"
                    value={updatedPost.title}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    name="bloggername"
                    value={updatedPost.bloggername}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <textarea
                    name="description"
                    value={updatedPost.description}
                    onChange={handleChange}
                    style={styles.textarea}
                  />
                </div>
              ) : (
                <div>
                  <p style={styles.bloggerName}><strong>Blogger:</strong> {post.bloggername}</p>
                  <p style={styles.description}><strong>Post:</strong> {post.description}</p>
                </div>
              )}
            </div>
            <div style={styles.actions}>
              <button
                onClick={() => handleEditToggle(post)}
                style={styles.updateButton}
              >
                {editingPostId === post.id ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <button onClick={goToBlog} style={styles.goToBlogButton}>Go to Blog</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  noPostsMessage: {
    fontSize: '24px',
    color: '#555',
    marginTop: '50px',
  },
  card: {
    width: '80%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  },
  header: {
    backgroundColor: '#3a86ff',
    color: '#fff',
    padding: '15px',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  category: {
    fontSize: '14px',
    fontStyle: 'italic',
  },
  body: {
    padding: '20px',
  },
  bloggerName: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '15px',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    borderTop: '1px solid #eee',
  },
  updateButton: {
    backgroundColor: '#ff9900',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    resize: 'vertical',
  },
  goToBlogButton: {
    marginTop: '20px',
    backgroundColor: '#3a86ff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default Post;

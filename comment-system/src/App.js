import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import { firestore } from './firebase';
import './App.css';

function App() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('comments').orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      });

    return () => unsubscribe();
  }, []);

  const handleCommentSubmit = (comment, parentId = null) => {
    const addReply = (comments) => {
      return comments.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [comment, ...(c.replies || [])] };
        }
        if (c.replies) {
          return { ...c, replies: addReply(c.replies) };
        }
        return c;
      });
    };
  
    if (parentId) {
      setComments(prevComments => addReply(prevComments));
    } else {
      setComments([comment, ...comments]);
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <header className="app-header">
          <h1>Comment System</h1>
          {user ? (
            <div className="header-user-info">
              <img src={user.photoURL} alt={user.displayName} className="header-user-img" />
              <span className="welcome-message">Welcome, {user.displayName}</span>
              <button className="auth-button" onClick={signOut}>Logout</button>
            </div>
          ) : (
            <button className="auth-button" onClick={signInWithGoogle}>Sign in with Google</button>
          )}
        </header>
        <div className="comment-section">
          {user ? (
            <>
              <CommentInput onCommentSubmit={handleCommentSubmit} />
              <CommentList comments={comments} onCommentSubmit={handleCommentSubmit} />
            </>
          ) : (
            <div className="before-login">
              <p>Please sign in to comment.</p>
            </div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

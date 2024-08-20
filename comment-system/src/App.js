import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import { firestore } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './App.css';
import Pagination from './components/Pagination';

function App() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 8;

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

  const handleCommentSubmit = async (comment, parentId = null) => {
    try {
      const commentsRef = firestore.collection('comments');

      if (parentId) {
        const parentCommentRef = commentsRef.doc(parentId);
        await parentCommentRef.update({
          replies: firebase.firestore.FieldValue.arrayUnion(comment)
        });
      } else {
        await commentsRef.add({
          ...comment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  // Get the comments for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <CommentList comments={currentComments} onCommentSubmit={handleCommentSubmit} />
              <Pagination
                commentsPerPage={commentsPerPage}
                totalComments={comments.length}
                paginate={paginate}
                currentPage={currentPage}
              />
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

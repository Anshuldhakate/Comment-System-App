import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase';
import './CommentInput.css';

function CommentInput({ onCommentSubmit, parentId }) {
  const [commentText, setCommentText] = useState('');
  const [file, setFile] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const { user } = useAuth();

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (commentText.trim().length === 0) return;

    let fileURL = null;
    if (file) {
      const fileRef = storage.ref().child(`comments/${file.name}`);
      await fileRef.put(file);
      fileURL = await fileRef.getDownloadURL();
    }

    const newComment = {
      text: commentText,
      fileURL,
      author: { displayName: user.displayName, photoURL: user.photoURL },
      timestamp: new Date(),
      reactions: 0,
    };

    try {
      if (parentId) {
        // Add reply
        onCommentSubmit(newComment, parentId);
      } else {
        // Add new comment
        onCommentSubmit(newComment);
      }
      setCommentText('');
      setFile(null);
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const handleTextChange = (value) => {
    setCommentText(value);
    setCharCount(value.length);
  };

  return (
    <div className="comment-input">
      <ReactQuill value={commentText} onChange={handleTextChange} />
      <div className="comment-input-options">
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <span>{charCount}/250</span>
      </div>
      <button onClick={handleSubmit} disabled={charCount > 250}>Send</button>
    </div>
  );
}

export default CommentInput;

import React, { useState } from 'react';
import { firestore, firebase } from '../firebase';
import CommentInput from './CommentInput';
import './CommentList.css';

function CommentList({ comments, onCommentSubmit }) {
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleReaction = async (commentId, reactionType) => {
    try {
      const commentRef = firestore.collection('comments').doc(commentId);
      await commentRef.update({
        [`reactions.${reactionType}`]: firebase.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.error('Error adding reaction: ', error);
    }
  };

  const renderComments = (comments, level = 0) => {
    if (level > 2) return null;

    return (
      <div className={`comment-list level-${level}`}>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-author">
              {comment.author && comment.author.photoURL ? (
                <>
                  <img
                    src={comment.author.photoURL}
                    alt={comment.author.displayName}
                    className="comment-author-img"
                  />
                  <span>{comment.author.displayName}</span>
                </>
              ) : (
                <span>Anonymous</span>
              )}
            </div>
            <div
              className="comment-text"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
            {comment.fileURL && (
              <div className="comment-file">
                <img src={comment.fileURL} alt="attachment" />
              </div>
            )}
            <div className="comment-actions">
              <button onClick={() => handleReaction(comment.id, 'like')}>
                👍 {comment.reactions?.like || 0}
              </button>
              <button onClick={() => handleReaction(comment.id, 'love')}>
                ❤️ {comment.reactions?.love || 0}
              </button>
              <button onClick={() => handleReply(comment.id)}>Reply</button>
              <span>
                {comment.timestamp && comment.timestamp.toDate
                  ? new Date(comment.timestamp.toDate()).toLocaleTimeString()
                  : 'No timestamp'}
              </span>
            </div>
            {replyingTo === comment.id && (
              <div className="replies">
                <CommentInput
                  onCommentSubmit={(reply) => {
                    onCommentSubmit(reply, comment.id);
                    setReplyingTo(null);
                  }}
                  parentId={comment.id}
                />
              </div>
            )}
            {comment.replies && renderComments(comment.replies, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return <div className="comment-list">{renderComments(comments)}</div>;
}

export default CommentList;

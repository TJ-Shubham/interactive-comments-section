import { useState } from 'react';
import './App.css';
import Comment from './components/Comment';
import NewComment from './components/NewComment';
import data from './data.json';

function App() {

  const currentUser = data.currentUser;
  const [comments, setComments] = useState(data.comments);


  
  function handleCommentSubmit(text, replyingTo) {

    const newComment = {
      id: Math.random().toString(), 
      user: currentUser,
      content: text,
      createdAt: new Date().toISOString(), 
      score: 0,
      replies: [],
    };

    if (replyingTo) {
      setComments(prevComments => prevComments.map(comment =>
        comment.user.username === replyingTo
          ? { ...comment, replies: [...comment.replies, newComment] }
          : comment
      ));

    } else {
      setComments(prevComments => [...prevComments, newComment]);

    }
  }

  return (
    <div className="app">
      {data.comments.map((comment) => (
        <Comment  key={comment.id} comment={comment} currentUser={currentUser} onCommentSubmit={handleCommentSubmit}/>
      ))}
      <NewComment currentUser={currentUser} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}

export default App;

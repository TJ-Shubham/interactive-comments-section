import Button from "./Button";
import replyLogo from "../assets/icon-reply.svg";
import editLogo from "../assets/icon-edit.svg";
import deleteLogo from "../assets/icon-delete.svg";
import Score from "./Score";
import { useState } from "react";
import NewComment from './NewComment';


export default function Comment({ comment, currentUser, onCommentSubmit }) {
  const [replies, setReplies] = useState(comment.replies);
  const [isReplying, setIsReplying] = useState(false);
  const isCurrentUser = comment.user.username === currentUser.username;


  function handleReply() {
    setIsReplying(!isReplying); 
  }

  return (
    <div className="comment">
      <div className="main-comments">
        <div className="comments-header">
          <img src={comment.user.image.png} alt={comment.user.username} />
          <p>{isCurrentUser ? <><span className="currentUser">You</span> {comment.user.username}</> : comment.user.username}</p>
          <p>{comment.createdAt}</p>
        </div>
        <p>{comment.content}</p>
      </div>
      <div className="buttons">
        <Score initialScore={comment.score} />
        {isCurrentUser ? (
          <>
            <Button className="red-btn">
              <img src={deleteLogo} alt="delete logo" />
              Delete
            </Button>
            <Button className="btn">
              <img src={editLogo} alt="edit logo" />
              Edit
            </Button>
          </>
        ) : (
          <Button className="btn" onClick={handleReply}>
            <img src={replyLogo} alt="reply logo" />
            Reply
          </Button>
        )}
      </div>
      <div className="replies">
        {replies.map((reply) => {
          const isReplyFromCurrentUser = reply.user.username === currentUser.username;
          return (
            <div key={reply.id} className="comment">
              <div className="main-comments">
                <div className="comments-header">
                  <img src={reply.user.image.png} alt={reply.user.username} />
                  <p>{isReplyFromCurrentUser ? <>{reply.user.username} <span className="currentUser">you</span></> : reply.user.username}</p>
                  <p>{reply.createdAt}</p>
                </div>
                <p><span>@{reply.replyingTo}</span> {reply.content}</p>
              </div>
              <div className="buttons">
                <Score initialScore={reply.score} />
                {isReplyFromCurrentUser ? (
                  <>
                    <Button className="red-btn">
                      <img src={deleteLogo} alt="delete logo" />
                      Delete
                    </Button>
                    <Button className="btn">
                      <img src={editLogo} alt="edit logo" />
                      Edit
                    </Button>
                  </>
                ) : (
                  <Button className="btn">
                    <img src={replyLogo} alt="reply logo" />
                    Reply
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isReplying && <NewComment currentUser={currentUser} replyingTo={comment.user.username} onCommentSubmit={onCommentSubmit} />}
    </div>
  );
}







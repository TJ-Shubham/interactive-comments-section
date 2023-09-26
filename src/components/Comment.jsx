import Button from "./Button";
import deleteLogo from "../assets/icon-reply.svg";
import Score from "./Score";
import { useState } from "react";

export default function Comment({ comment, currentUser }) {
  const [replies, setReplies] = useState(comment.replies);
  const isCurrentUser = comment.user.username === currentUser.username;
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
            <Button>Edit</Button>
            <Button>Delete</Button>
          </>
        ) : (
          <Button>
            <img src={deleteLogo} alt="reply logo" />
            Reply
          </Button>
        )}
      </div>
      <hr />
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
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </>
                ) : (
                  <Button>
                    <img src={deleteLogo} alt="reply logo" />
                    Reply
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}







import Button from "./Button";
import deleteLogo from "../assets/icon-reply.svg";
import Score from "./Score";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="main-comments">
        <div className="comments-header">
          <img src={comment.user.image.png} alt={comment.user.username} />
          <p>{comment.user.username}</p>
          <p>{comment.createdAt}</p>
        </div>
        <p>{comment.content}</p>
      </div>
      <div className="buttons">
        <Score initialScore={comment.score} />
        <Button>
          <img src={deleteLogo} alt="reply logo" />
          Reply
        </Button>
      </div>
    </div>
  );
}


import { useState } from "react"
import Button from "./Button";


export default function NewComment({currentUser, replyingTo, onCommentSubmit}) {
    const [text, setText] = useState("");

    function handleChange(e) {
      setText(e.target.value);        
    }

    function handleSubmit(e) {
      e.preventDefault(); 
      onCommentSubmit(text, replyingTo);

      setText("");
    }

  return (
    <form className="new-reply" onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleChange} placeholder={`Add a comment${replyingTo ? ' to @' + replyingTo : ''}...`} ></textarea>
        <img src={currentUser.image.png} alt={currentUser.username} />
        <Button className="form-button">{replyingTo ? 'Reply' : 'Send'}</Button>
    </form>
  )
}

NewComment.defaultProps = {
  onCommentSubmit: () => {},
};

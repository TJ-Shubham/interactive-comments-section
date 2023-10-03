import { useState } from "react"
import Button from "./Button";


export default function NewComment({currentUser}) {
    const [text, setText] = useState("");


    function handleChange(e) {
        setText(e.target.value);        
    }

  return (
    <form className="new-reply">
        <textarea value={text} onChange={handleChange} placeholder="Add a comment..." ></textarea>
        <img src={currentUser.image.png} alt={currentUser.username} />
        <Button className="form-button">Send</Button>
    </form>
  )
}

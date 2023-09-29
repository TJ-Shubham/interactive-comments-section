import { useState } from "react"
import Button from "./Button";


export default function NewComment() {
    const [text, setText] = useState("");


    function handleChange(e) {
        setText(e.target.value);        
    }

  return (
    <form>
        <img src="" alt="" />
        <textarea value={text} onChange={handleChange} placeholder="Add a commnet" ></textarea>
        <Button>Send</Button>
    </form>
  )
}

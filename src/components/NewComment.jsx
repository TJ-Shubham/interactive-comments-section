import { useState } from "react";

export default function NewComment({currentUser, handleSubmit, placeholder = "Add comment...", initialText = "", isEdit = false, buttonText}) {
    const [text, setText] = useState(initialText);
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit(text);
      setText("");
    };
  
    return(
        <div className="bg-white m-3 p-4 rounded-md">
            <form onSubmit={onSubmit}>
            <textarea className="cursor-pointer resize-none w-full border border-gray-300 rounded-md placeholder:p-4  font-medium" placeholder={placeholder} cols="30" rows="5" value={text} onChange={(e)=>setText(e.target.value)} required></textarea>
            <div className="flex justify-between my-3">
                {!isEdit && (<img className=" w-2/12" src={currentUser.image.png} alt={currentUser.username} />)}
                <button className="bg-primary-blue px-6 rounded-md font-bold text-white uppercase">{buttonText}</button>
            </div>
            </form>
        </div>
    )
}
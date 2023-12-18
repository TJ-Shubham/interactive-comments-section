import { useState } from "react";

export default function NewComment({handleSubmit, placeholder = "Add comment...", initialText = "", buttonText}) {
    const [text, setText] = useState(initialText);
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit(text);
      setText("");
    };
  
    return(
        <div className="bg-white m-3 p-4 rounded-md w-full md:pb-0">
            <form onSubmit={onSubmit} className="grid grid-cols-2 md:grid-cols-[6%_50%_25%]  gap-2">
                <textarea className="p-4 col-span-2 md:col-start-2 md:h-3/4  cursor-pointer resize-none w-full border border-gray-300 rounded-md placeholder:p-1  font-medium" placeholder={placeholder} cols="30" rows="4" value={text} onChange={(e)=>setText(e.target.value)} required></textarea>
                <img className="md:col-start-1 md:row-start-1 w-12" src={currentUser.image.png} alt={currentUser.username} />
                <button className="md:col-end-5  md:h-2/5 bg-primary-blue px-6 rounded-md font-bold text-white uppercase">{buttonText}</button>
            </form>
        </div>
    )
}

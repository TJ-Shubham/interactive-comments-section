import userData from "/data.json";
import replyIcon from "./assets/icon-reply.svg";
import plusIcon from "./assets/icon-plus.svg";
import minusIcon from "./assets/icon-minus.svg"
import { useEffect, useState } from "react";

function App() {
  const currentUser = userData.currentUser;
  const[comments, setComments] = useState(userData.comments);
  const[text, setText] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // for display human readble format
  function timeSince(date) {
    const seconds = Math.floor((currentTime - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval.toString().padStart(2, '0')} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval.toString().padStart(2, '0')} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval.toString().padStart(2, '0')} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval.toString().padStart(2, '0')} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval.toString().padStart(2, '0')} minutes ago`;
    
    return `${Math.max(0, seconds).toString().padStart(2, '0')} seconds ago`;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      content: text,
      createdAt: timeSince(new Date()),
      score: 0,
      user: currentUser,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setText('');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="bg-slate-100">
    <CommentsList currentUser={currentUser} comments={comments}/>
    <NewComment currentUser={currentUser} text={text} setText={setText} onCommentSubmit={handleCommentSubmit} />
    </div>
  )
}

export default App



function CommentsList({currentUser, comments}){
  
  

  return(
    <ul className="py-4">
      {comments.map((comment)=>(
        <Comment comment={comment} key={comment.id} currentUser={currentUser} />
      ))}
    </ul>
  )
}

function Comment({comment, currentUser}){
  return(
    <>
      <li className="bg-white p-4 m-3 grid grid-cols-1 rounded-md">
        <div className="flex items-center">
          <img className="h-1/12 w-1/12" src={comment.user.image.webp} alt={comment.user.username} />
          <p className="px-3 font-bold text-neutral-blue">{comment.user.username}</p>
          <p className="text-neutral-graylish font-medium">{comment.createdAt}</p>
        </div>
        <p className="text-neutral-graylish font-medium my-4">{comment.content}</p>
        <div className="grid grid-cols-2 gap-32">
          <div className="flex justify-center items-center gap-4 bg-gray-200  px-3 py-2 rounded-xl col-span-1">
            <button><img src={plusIcon} alt="Plus Icon" /></button>
            <p className="text-primary-blue font-bold">{comment.score}</p>
            <button><img src={minusIcon} alt="minus Icon" /></button>
          </div>
          <button className="text-primary-blue font-bold flex items-center gap-2 col-span-"><img src={replyIcon} alt="reply Icon" />Reply</button>
        </div>
      </li>
      {comment.replies && <ul className="border-l-2 border-gray-300 pl-2 mt-4 ml-4">{comment.replies.map((reply)=>(<CommentReplies reply={reply} key={reply.id} currentUser={currentUser} />))}</ul> }
      </>
  )
}

function CommentReplies({reply, currentUser}){
  return(
    <li className="bg-white p-3 mx-3 mb-4 my-0 grid grid-cols-1 rounded-md">
      <div className="flex items-center">
        <img className="h-1/12 w-1/12" src={reply.user.image.webp} alt={reply.user.username} />
        <p className="px-3 font-bold text-neutral-blue">{reply.user.username} {reply.user.username===currentUser.username && <span className="text-white font-bold py-0.5 px-1 rounded bg-primary-blue">you</span> } </p>
        <p className="text-neutral-graylish font-medium">{reply.createdAt}</p>
      </div>
      <p className="text-neutral-graylish font-medium my-4"><span className="font-bold text-primary-blue" >@{reply.replyingTo}</span> {reply.content}</p>
      <div className="grid grid-cols-2 gap-24">
        <div className="flex justify-center items-center gap-4 bg-gray-200  px-3 py-2 rounded-xl col-span-1">
          <button><img src={plusIcon} alt="Plus Icon" /></button>
          <p className="text-primary-blue font-bold">{reply.score}</p>
          <button><img src={minusIcon} alt="minus Icon" /></button>
        </div>
        <button className="text-primary-blue font-bold flex items-center gap-2 col-span-"><img src={replyIcon} alt="reply Icon" />Reply</button>
      </div>
    </li>
  )
}

function NewComment({currentUser, onCommentSubmit, text, setText}){
    return(
      <div className="bg-white m-3 p-4 rounded-md">
        <form onSubmit={onCommentSubmit}>
          <textarea className="cursor-pointer resize-none w-full border border-gray-300 rounded-md placeholder:p-4  font-medium" placeholder="Add a comment..." cols="30" rows="5" value={text} onChange={(e)=>setText(e.target.value)} required></textarea>
          <div className="flex justify-between my-3">
            <img className=" w-2/12" src={currentUser.image.png} alt={currentUser.username} />
            <button className="bg-primary-blue px-6 rounded-md font-bold text-white uppercase">send</button>
          </div>
        </form>
      </div>
    )
}


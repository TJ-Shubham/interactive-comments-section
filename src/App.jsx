import userData from "/data.json";
import replyIcon from "./assets/icon-reply.svg";
import plusIcon from "./assets/icon-plus.svg";
import minusIcon from "./assets/icon-minus.svg"
import editIcon from "./assets/icon-edit.svg"
import deleteIcon from "./assets/icon-delete.svg"
import { useState } from "react";

function App() {
  const currentUser = userData.currentUser;
  const[comments, setComments] = useState(userData.comments);
  const[text, setText] = useState("");
  

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      content: text,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setText('');
  };

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

  const { score, handleIncrement, handleDecrement } = useScore(comment.score);
  const isCurrentUser = comment.user.username === currentUser.username;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(!showDeleteModal);
  }

  return(
    <>
      <li className="bg-white p-4 m-3 grid grid-cols-1 rounded-md">
        <div className="flex items-center">
          <img className="h-1/12 w-1/12" src={comment.user.image.webp} alt={comment.user.username} />
          <p className="px-3 font-bold text-neutral-blue">{comment.user.username}</p>
          <p className="text-neutral-graylish font-medium">{comment.createdAt}</p>
        </div>
        <p className="text-neutral-graylish font-medium my-4">{comment.content}</p>
        <div className="grid grid-cols-2 gap-16">
          <div className="flex justify-center items-center gap-4 bg-gray-200  px-3 py-2 rounded-xl">
            <button onClick={handleIncrement}><img src={plusIcon} alt="Plus Icon" /></button>
            <p className="text-primary-blue font-bold">{score}</p>
            <button onClick={handleDecrement}><img src={minusIcon} alt="minus Icon" /></button>
          </div>
          {!isCurrentUser 
            ?  (<button className="text-primary-blue font-bold flex items-center gap-2"><img src={replyIcon} alt="reply Icon" />Reply</button>)
            :  (<div className="flex justify-between items-center">
                  <button className="text-red-500 font-bold flex items-center gap-1" onClick={handleDeleteClick}><img src={deleteIcon} alt="delete Icon" />Delete</button>
                  <button className="text-primary-blue font-bold flex items-center gap-1"><img src={editIcon} alt="edit Icon" />Edit</button>
                </div>
               )
          }
        </div>
      </li>
      {comment.replies && <ul className="border-l-2 border-gray-300 pl-2 mt-4 ml-4">{comment.replies.map((reply)=>(<CommentReplies reply={reply} key={reply.id} currentUser={currentUser} handleDeleteClick={handleDeleteClick} />))}</ul> }
      {showDeleteModal && <DeleteModal />}
      </>
  )
}

function CommentReplies({reply, currentUser, handleDeleteClick}){

  const { score, handleIncrement, handleDecrement } = useScore(reply.score);
  const isCurrentUser = reply.user.username === currentUser.username;

  return(
    <li className="bg-white p-3 mx-3 mb-4 my-0 grid grid-cols-1 rounded-md">
      <div className="flex items-center">
        <img className="h-1/12 w-1/12" src={reply.user.image.webp} alt={reply.user.username} />
        <p className="px-3 font-bold text-neutral-blue">{reply.user.username} {reply.user.username===currentUser.username && <span className="text-white font-bold py-0.5 px-1 rounded bg-primary-blue">you</span> } </p>
        <p className="text-neutral-graylish font-medium">{reply.createdAt}</p>
      </div>
      <p className="text-neutral-graylish font-medium my-4"><span className="font-bold text-primary-blue" >@{reply.replyingTo}</span> {reply.content}</p>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center items-center gap-4 bg-gray-200  px-3 py-2 rounded-xl col-span-1">
          <button onClick={handleIncrement}><img src={plusIcon} alt="Plus Icon" /></button>
          <p className="text-primary-blue font-bold">{score}</p>
          <button onClick={handleDecrement}><img src={minusIcon} alt="minus Icon" /></button>
        </div>
        {!isCurrentUser 
            ?  (<button className="text-primary-blue font-bold flex items-center gap-2"><img src={replyIcon} alt="reply Icon" />Reply</button>)
            :  (<div className="flex justify-between items-center">
                  <button className="text-red-500 font-bold flex items-center gap-1" onClick={handleDeleteClick}><img src={deleteIcon} alt="delete Icon" />Delete</button>
                  <button className="text-primary-blue font-bold flex items-center gap-1"><img src={editIcon} alt="edit Icon" />Edit</button>
                </div>
               )
        }
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


//custome hook for avoid duplication of score increase and decrease
function useScore(initialScore) {
  const [score, setScore] = useState(initialScore);

  const handleIncrement = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleDecrement = () => {
    setScore((prevScore) => prevScore > 0 ? prevScore - 1 : 0);
  };

  return { score, handleIncrement, handleDecrement };
}


function DeleteModal(){
  return(
    <div className="flex items-center justify-center px-3 fixed top-0 left-0 w-screen h-screen z-50 bg-color5">
      <div className="p-3 w-11/12 h-56 top-2/4  rounded-lg bg-white" >
        <h1 className="text-neutral-blue font-bold text-lg" >Delete comment</h1>
        <p className="text-neutral-graylish font-medium my-4" >Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className="flex justify-between">
          <button className="uppercase text-white bg-neutral-graylish rounded-lg p-3" >No, cancel</button>
          <button className="uppercase text-white bg-red-500 rounded-lg p-3" >Yes, delete</button>
        </div>
      </div>
    </div>
  )
}

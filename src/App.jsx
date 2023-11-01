import data from "/data.json";
import replyIcon from "./assets/icon-reply.svg";
import plusIcon from "./assets/icon-plus.svg";
import minusIcon from "./assets/icon-minus.svg"
import editIcon from "./assets/icon-edit.svg"
import deleteIcon from "./assets/icon-delete.svg"
import { useState } from "react";

function App() {
  const currentUser = data.currentUser;
  
  return (
    <div className="bg-slate-100">
      <CommentsList currentUser={currentUser} />
    </div>
  )
}

export default App



function CommentsList({currentUser}){
  const userData = data;
  const[comments, setComments] = useState(userData.comments);
  const[currentComment, setCurrentComment] = useState(null);
  

  const createComment = async(text) => {
   return {
      id: Date.now(),
      content: text,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    };
  };

  const addComment = (text) =>{
    createComment(text).then((com)=>{
      setComments([...comments, com]);
    })
  }

  const deleteComment = (commentId) =>{
    const updatedComments = comments.filter((com)=> com.id !== commentId);
    setComments(updatedComments);
  }

  const updateComments = (text, commentId) => {
    const updatedComments = comments.map((com)=>{
      if(com.id === commentId){
        return{...com, content: text}
      }
      return com;
    })
    setComments(updatedComments);
    setCurrentComment(null);
  }

  return(
    <main>
      <ul className="py-4">
        {comments.map((comment)=>(
          <Comment 
            key={comment.id}
            currentUser={currentUser} 
            replies={comment.replies}
            currentComment={currentComment}
            setCurrentComment={setCurrentComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComments={updateComments}
            {...comment}
          />
        ))}
      </ul>
      <NewComment currentUser={currentUser} handleSubmit={addComment} initialText="" buttonText="send" />    
    </main>
    
  )
}

function Comment(props){

  const [score, setScore] = useState(props.score);
  const [replies, setReplies] = useState(props.replies);
  const[showDeleteModal, setShowDeleteModal] = useState(false);

  const isCurrentUser = props.user.username === props.currentUser.username;
  const isReplying =
    props.currentComment &&
    props.currentComment.id === props.id &&
    props.currentComment.type === "replying";
  const isEditing =
    props.currentComment &&
    props.currentComment.id === props.id &&
    props.currentComment.type === "editing";
  
  const addRating = () =>{
    setScore(prev => prev + 1);
  }

  const minusRating = () => {
    setScore((prevScore) => prevScore > 0 ? prevScore - 1 : 0);
  }

  const createReply = async (text) => {
    return {
      content: text,
      createdAt: "Just now",
      id: Date.now(),
      replyingTo: props.user.username,
      score: 1,
      user: props.currentUser,
    };
  };

  const addReply = (text) =>{
    createReply(text).then((rep)=>{
      setReplies([...replies, rep]);
    })
  }

  const deleteReply = (replyId) =>{
    const updatedReplies = replies.filter((rep)=> rep.id !== replyId);
    setReplies(updatedReplies);
  }

  const updateReply = (text, replyId) => {
    const updatedreply = replies.map((rep)=>{
      if(rep.id === replyId){
        return{...rep, content: text}
      }
      return rep;
    })
    setReplies(updatedreply);
    props.setCurrentComment(null);
  }

  return(
    <>
      <li className="bg-white p-4 m-3 grid grid-cols-1 rounded-md">
        <div className="flex items-center">
          <img className="h-1/12 w-1/12" src={props.user.image.webp} alt={props.user.username} />
          <p className="px-3 font-bold text-neutral-blue">
            {props.user.username}
            {props.user.username === props.currentUser.username && (<span className="tag">you</span>)}
          </p>
          <p className="text-neutral-graylish font-medium">{props.createdAt}</p>
        </div>
        {!isEditing && <p className="text-neutral-graylish font-medium my-4">{props.content}</p>}
        {isEditing && (
            <NewComment
              currentUser={props.currentUser}
              handleSubmit={(text) => {
                props.updateComments(text, props.id);
              }}
              initialText={props.content}
              isEdit
              buttonText='update'
            />)
        }
        <div className="grid grid-cols-2 gap-16">
          <div className="flex justify-center items-center gap-4 bg-sky-50  px-3 py-2 rounded-xl">
            <button onClick={addRating}><img src={plusIcon} alt="Plus Icon" /></button>
            <p className="text-primary-blue font-bold">{score}</p>
            <button onClick={minusRating}><img src={minusIcon} alt="minus Icon" /></button>
          </div>
          {!isCurrentUser 
            ?  (<button className="text-primary-blue font-bold flex items-center gap-2" onClick={()=> {props.setCurrentComment({id:props.id, type:"replying"})}} ><img src={replyIcon} alt="reply Icon" />Reply</button>)
            :  (<div className="flex justify-between items-center">
                  <button className="text-red-500 font-bold flex items-center gap-1" onClick={()=>setShowDeleteModal(prev => !prev)}><img src={deleteIcon} alt="delete Icon" />Delete</button>
                  <button className="text-primary-blue font-bold flex items-center gap-1" onClick={()=>{props.setCurrentComment({id:props.id, type:"editing"})}} ><img src={editIcon} alt="edit Icon" />Edit</button>
                </div>
               )
          }
        </div>
        {isReplying && (
          <div>
            <NewComment
              currentUser={props.currentUser}
              placeholder={`Replying to @${props.user.username}`}
              handleSubmit={(text) =>
                addReply(`@${props.user.username}, ${text}`)
              }
              buttonText='reply'
            />
          </div>)
        }
      </li>
      {props.replies && (
        <ul className="border-l-2 border-gray-300 pl-2 mt-4 ml-4">
          {replies.map((reply)=>(
            <CommentReplies 
               key={reply.id} 
               currentUser={props.currentUser} 
               currentComment={props.currentComment}
               setCurrentComment={props.setCurrentComment}
               addReply={addReply}
               deleteReply={deleteReply}
               updateReply={updateReply}
               {...reply}
            />))
          }
        </ul>) 
      }
      {showDeleteModal && (
        <div className="flex items-center justify-center px-3 fixed top-0 left-0 w-screen h-screen z-50 bg-color5">
          <div className="p-3 w-11/12 h-56 top-2/4  rounded-lg bg-white" >
            <h1 className="text-neutral-blue font-bold text-lg" >Delete comment</h1>
            <p className="text-neutral-graylish font-medium my-4" >Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="flex justify-between">
              <button onClick={()=> setShowDeleteModal(prev => !prev)} className="uppercase text-white bg-neutral-graylish rounded-lg p-3" >No, cancel</button>
              <button onClick={()=> props.deleteComment(props.id)} className="uppercase text-white bg-red-500 rounded-lg p-3" >Yes, delete</button>
            </div>
          </div>
        </div>)
      }
    </>
  )
}

function CommentReplies(props){

  const [score, setScore] = useState(props.score);
  const[showDeleteModal, setShowDeleteModal] = useState(false);

  const isCurrentUser = props.user.username === props.currentUser.username;
  const isReplying =
    props.currentComment &&
    props.currentComment.id === props.id &&
    props.currentComment.type === "replying";
  const isEditing =
    props.currentComment &&
    props.currentComment.id === props.id &&
    props.currentComment.type === "editing";
  
  const addRating = () =>{
    setScore(prev => prev + 1);
  }

  const minusRating = () => {
    setScore((prevScore) => prevScore > 0 ? prevScore - 1 : 0);
  }

  return(
    <li className="bg-white p-3 mx-3 mb-4 my-0 grid grid-cols-1 rounded-md">
      <div className="flex items-center">
        <img className="h-1/12 w-1/12" src={props.user.image.webp} alt={props.user.username} />
        <p className="px-3 font-bold text-neutral-blue">{props.user.username} {props.user.username === props.currentUser.username && <span className="text-white font-bold py-0.5 px-1 rounded bg-primary-blue">you</span> } </p>
        <p className="text-neutral-graylish font-medium">{props.createdAt}</p>
      </div>
      {!isEditing && <p className="text-neutral-graylish font-medium my-4">{props.content}</p>}
      {isEditing && (
          <NewComment
            currentUser={props.currentUser}
            handleSubmit={(text) => {
              props.updateReply(text, props.id);
            }}
            initialText={props.content}
            isEdit
            buttonText='update'
          />)
      }
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center items-center gap-4 bg-sky-50   px-3 py-2 rounded-xl col-span-1">
          <button onClick={addRating}><img src={plusIcon} alt="Plus Icon" /></button>
          <p className="text-primary-blue font-bold">{score}</p>
          <button onClick={minusRating}><img src={minusIcon} alt="minus Icon" /></button>
        </div>
        {!isCurrentUser 
          ?(<button className="text-primary-blue font-bold flex items-center gap-2" onClick={()=> {props.setCurrentComment({id:props.id, type:"replying"})}} ><img src={replyIcon} alt="reply Icon" />Reply</button>)
          :(<div className="flex justify-between items-center">
              <button className="text-red-500 font-bold flex items-center gap-1" onClick={()=>setShowDeleteModal(prev => !prev)}><img src={deleteIcon} alt="delete Icon" />Delete</button>
              <button className="text-primary-blue font-bold flex items-center gap-1" onClick={()=>{props.setCurrentComment({id:props.id, type:"editing"})}} ><img src={editIcon} alt="edit Icon" />Edit</button>
            </div>
            )
        }
      </div>
      {isReplying && (
        <div>
          <NewComment
            currentUser={props.currentUser}
            placeholder={`Replying to @${props.user.username}`}
            handleSubmit={(text) =>
              props.addReply(`@${props.user.username}, ${text}`)
            }
            buttonText='reply'
          />
        </div>)
      }
      {showDeleteModal && (
        <div className="flex items-center justify-center px-3 fixed top-0 left-0 w-screen h-screen z-50 bg-color5">
          <div className="p-3 w-11/12 h-56 top-2/4  rounded-lg bg-white" >
            <h1 className="text-neutral-blue font-bold text-lg" >Delete comment</h1>
            <p className="text-neutral-graylish font-medium my-4" >Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="flex justify-between">
              <button onClick={()=> setShowDeleteModal(prev => !prev)} className="uppercase text-white bg-neutral-graylish rounded-lg p-3" >No, cancel</button>
              <button onClick={()=> props.deleteReply(props.id)} className="uppercase text-white bg-red-500 rounded-lg p-3" >Yes, delete</button>
            </div>
          </div>
        </div>)
      }
    </li>
    
    
  )
}

function NewComment({currentUser, handleSubmit, placeholder = "Add comment...", initialText = "", isEdit = false, buttonText}){

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




import { useState } from "react";
import replyIcon from "../assets/icon-reply.svg";
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg"
import editIcon from "../assets/icon-edit.svg"
import deleteIcon from "../assets/icon-delete.svg"
import NewComment from "./NewComment";
import CommentReplies from "./CommentReplies";
import DeleteData from "./DeleteData";


export default function Comment(props) {
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
      props.setCurrentComment(null);
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
        <DeleteData id={props.id}
          type="comment"
          deleteComment={props.deleteComment}
          setShowDeleteModal={setShowDeleteModal}/>)
      }
    </>
  )
}
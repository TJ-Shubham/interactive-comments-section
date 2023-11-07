import { useState } from "react";
import replyIcon from "/icon-reply.svg";
import plusIcon from "/icon-plus.svg";
import minusIcon from "/icon-minus.svg"
import editIcon from "/icon-edit.svg"
import deleteIcon from "/icon-delete.svg"
import NewComment from "./NewComment";
import DeleteData from "./DeleteData";


export default function CommentReplies(props) {
  const [score, setScore] = useState(props.score);
  const[showDeleteModal, setShowDeleteModal] = useState(false);

  const isCurrentUser = props.user.username === props.currentUser.username;
  const isReplying = props.currentComment && props.currentComment.id === props.id && props.currentComment.type === "replying";
  const isEditing = props.currentComment && props.currentComment.id === props.id && props.currentComment.type === "editing";
  
  const addRating = () =>{
    setScore(prev => prev + 1);
  }

  const minusRating = () => {
    setScore((prevScore) => prevScore > 0 ? prevScore - 1 : 0);
  }
  
  return(
    <>
      <li className="bg-white p-3 mx-1 mb-4 my-0 grid rounded-md md:grid-rows-[20%_70%] md:grid-cols-[6%_60%_25%] md:gap-x-4 md:pb-0 md:pr-0 md:pt-6">
        <div className="flex items-center col-span-2 md:col-span-1 md:col-start-2">
          <img className="h-1/12 w-1/12" src={props.user.image.webp} alt={props.user.username} />
          <p className="px-3 font-bold text-neutral-blue">{props.user.username} {props.user.username === props.currentUser.username && <span className="text-white font-bold py-0.5 px-1 rounded bg-primary-blue">you</span>}</p>
          <p className="text-neutral-graylish font-medium">{props.createdAt}</p>
        </div>
        <div className="col-span-2 md:col-start-2 overflow-hidden break-words">
          {!isEditing && <p className="text-neutral-graylish font-medium my-4"><span className="font-bold text-primary-blue" >@{props.replyingTo} </span>{props.content}</p>}
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
        </div>
        <div className="flex justify-center items-center gap-6 bg-sky-50 px-3 py-2 rounded-xl md:col-start-1 md:row-start-1 md:row-end-3 md:flex-col md:py-6">
          <button onClick={addRating}><img src={plusIcon} alt="Plus Icon" /></button>
          <p className="text-primary-blue font-bold">{score}</p>
          <button onClick={minusRating}><img src={minusIcon} alt="minus Icon" /></button>
        </div>
        <div className="grid grid-cols-[50%] gap-6 pl-5 md:col-start-3 md:row-start-1">
          {!isCurrentUser 
            ?(<button className="text-primary-blue font-bold flex items-center gap-2" onClick={()=> {props.setCurrentComment({id:props.id, type:"replying"})}} ><img src={replyIcon} alt="reply Icon" />Reply</button>)
            :(<div className="flex justify-between items-center gap-6">
                <button className="text-red-500 font-bold flex items-center gap-1" onClick={()=>setShowDeleteModal(prev => !prev)}><img src={deleteIcon} alt="delete Icon" />Delete</button>
                <button className="text-primary-blue font-bold flex items-center gap-1" onClick={()=>{props.setCurrentComment({id:props.id, type:"editing"})}} ><img src={editIcon} alt="edit Icon" />Edit</button>
              </div>
              )
          }
        </div>
      </li>
      {isReplying && (
          <div>
            <NewComment
              currentUser={props.currentUser}
              placeholder={`Replying to @${props.user.username}`}
              handleSubmit={(text) =>
                props.addReply(text)
              }
              buttonText='reply'
            />
          </div>)
        }
        {showDeleteModal && (
          <DeleteData
            id={props.id}
            type="reply"
            deleteReply={props.deleteReply}
            setShowDeleteModal={setShowDeleteModal}
          />)
        }
    </>
  )
}
import { useState } from "react";
import data from "/data.json";
import NewComment from "./NewComment";
import Comment from "./Comment";


export default function CommentsList({currentUser}) {
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
      <main className="flex flex-col justify-center items-center p-3 md:w-3/6">
        <ul>
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
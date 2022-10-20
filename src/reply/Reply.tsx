import "./Reply.scss"
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg"
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg"
import { ReactComponent as ReplyIcon } from "../assets/icon-reply.svg"
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg"
import { useState } from "react"
import {db} from "../firebase"
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"


const Reply = ({replyProps, setReplyComment, postId, setDeleteReply, setShowReplyPopup, setRenderUpdateReply,setReplyingToState}:any) => {

  const [editCommentState, setEditCommentState] = useState(false);
  const [comment, setComment] = useState(replyProps.content);

  const updateReply = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const docRef=doc(db,"post",postId)
    
    updateDoc(docRef,{
      replies:arrayUnion({
        content: comment,
        createdAt: replyProps.createdAt,
        id: Math.random()*10,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username,
        replyingTo: replyProps.replyingTo
      })
    })

    updateDoc(docRef,{
      replies:arrayRemove({
        content: replyProps.content,
        createdAt: replyProps.createdAt,
        id: replyProps.id,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username,
        replyingTo: replyProps.replyingTo
      })
    })
    setRenderUpdateReply(comment)
    setEditCommentState(false)
  }

  const editComment =
 <form> 
 <textarea value={comment} onChange={(e)=> setComment(e.target.value)}>
 </textarea>
 <button onClick={updateReply}>UPDATE</button>
 </form>

  const deleteReplyComment = () => {
    setShowReplyPopup(true)
    setDeleteReply({
      postId:postId,
      replies:{
        content: replyProps.content,
        createdAt: replyProps.createdAt,
        id: replyProps.id,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username,
        replyingTo: replyProps.replyingTo
      }
    })
  }

  return (
    <article className="reply">
        <div className="post__left">
          <div className="plus"><PlusIcon/></div>
          <p className="score">{replyProps.score}</p>
          <div className="minus"><MinusIcon/></div>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src={replyProps.img} alt="avatar" />
              <div className="username">{replyProps.username}</div>
              <div className="time">{replyProps.createdAt}</div>
            </div>
            {replyProps.username != "juliusomo" ?
            <div onClick={() => {setReplyComment(true);setReplyingToState(replyProps.username)}} className="reply__container">
              <ReplyIcon/>
              <span>Reply</span>
            </div>
            :
            <div className="delete__edit__container">
              <div onClick={deleteReplyComment} className="delete__container">
                <DeleteIcon/>
                <span>Delete</span>
              </div>
              <div onClick={()=> setEditCommentState(true)} className="edit__container">
              <EditIcon/>
              <span>Edit</span>
              </div>
            </div>}
          </div>
          <div className="post__right__bottom">
          {editCommentState ? editComment : 
          <>
          <span className="postUsername">@{replyProps.replyingTo} </span> 
          <span>{replyProps.content}</span>
          </>
          }
          </div>
        </div>
    </article>
  )
}

export default Reply
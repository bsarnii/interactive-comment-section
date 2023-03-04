import "./Reply.scss"
import { Timestamp } from "firebase/firestore"
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg"
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg"
import { ReactComponent as ReplyIcon } from "../assets/icon-reply.svg"
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg"
import { useState } from "react"
import {db} from "../firebase"
import { doc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore"
import { deleteReplyInterface } from "../types/deleteReply.interface"

type Props = {
  replyProps: {content: string, score: number, timestamp:any,
     img:string, username:string, replyingTo:string, id:number, convertedTime:string | undefined}
  setReplyComment: React.Dispatch<React.SetStateAction<boolean>>
  postId: string
  setDeleteReply: React.Dispatch<React.SetStateAction<deleteReplyInterface>>
  setShowReplyPopup: React.Dispatch<React.SetStateAction<boolean>>
  setReplyingToState: React.Dispatch<React.SetStateAction<string>>
  loggedIn: boolean
  userData: {username: string; img: string;}
}
const Reply = ({loggedIn, userData, replyProps, setReplyComment, postId, setDeleteReply, setShowReplyPopup,setReplyingToState}:Props) => {

  const [editCommentState, setEditCommentState] = useState(false);
  const [comment, setComment] = useState(replyProps.content);
  const [scoreState, setScoreState] = useState(replyProps.score)

  const updateReply = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const docRef=doc(db,"post",postId)
    updateDoc(docRef,{
      replies:arrayUnion({
        content: comment,
        id: Math.random()*10,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username,
        replyingTo: replyProps.replyingTo,
        timestamp: Timestamp.fromMillis(replyProps.timestamp)
      })
    })

    updateDoc(docRef,{
      replies:arrayRemove({
        content: replyProps.content,
        id: replyProps.id,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username,
        replyingTo: replyProps.replyingTo,
        timestamp: Timestamp.fromMillis(replyProps.timestamp)
      })
    })
    setEditCommentState(false)
  }

  const addScore = () => {
    setScoreState(scoreState + 1);
    
  }
  const subtractScore = () => {
    if (scoreState <= 0) {
      return
    }
    setScoreState(scoreState - 1);

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
        id: replyProps.id,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username,
        replyingTo: replyProps.replyingTo,
        timestamp: Timestamp.fromMillis(replyProps.timestamp)
      }
    })
  }

  return (
    <article className="reply">
        <div className="post__left">
          <button disabled={!loggedIn} className="plus" onClick={()=> addScore()}><PlusIcon/></button>
          <p className="score">{scoreState}</p>
          <button disabled={!loggedIn} className="minus" onClick={()=> subtractScore()}><MinusIcon/></button>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src={replyProps.img} alt="avatar" />
              <div className="username">{replyProps.username}</div>
              {replyProps.username === userData.username ? <div className="you">you</div> : ""}
              <div className="time">{replyProps.convertedTime}</div>
            </div>
            {loggedIn === false ? "" : replyProps.username != userData.username ?
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
import "./Reply.scss"
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg"
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg"
import { ReactComponent as ReplyIcon } from "../assets/icon-reply.svg"
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg"
import {db} from "../firebase"
import { doc, updateDoc, arrayRemove } from "firebase/firestore"


const Reply = ({replyProps, setReplyComment, postId, setDeleteReply, setShowReplyPopup}:any) => {

  const deleteReplyComment = () => {
    console.log(`ReplyComment with id:${replyProps.id} deleted`)
    const docRef=doc(db,"post",postId)
    updateDoc(docRef,{
      replies:arrayRemove({
        content: replyProps.content,
        createdAt: replyProps.createdAt,
        id: replyProps.id,
        img: replyProps.img,
        score: replyProps.score,
        username: replyProps.username
      })
    })
    setDeleteReply(`ReplyComment with id:${replyProps.id} deleted`)
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
            <div onClick={() => setReplyComment(true)} className="reply__container">
              <ReplyIcon/>
              <span>Reply</span>
            </div>
            :
            <div className="delete__edit__container">
              <div onClick={()=>setShowReplyPopup(true)} className="delete__container">
                <DeleteIcon/>
                <span>Delete</span>
              </div>
              <div className="edit__container">
              <EditIcon/>
              <span>Edit</span>
              </div>
            </div>}
          </div>
          <div className="post__right__bottom">
            {replyProps.content}
          </div>
        </div>
    </article>
  )
}

export default Reply
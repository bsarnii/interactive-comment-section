import "./Post.scss"
import Reply from "../reply/Reply"
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg"
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg"
import { ReactComponent as ReplyIcon } from "../assets/icon-reply.svg"
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg"
import ReplyComment from "../replyComment/replyComment"
import { useState } from "react"

type Props = {
  count: any
  key: any,
  content: any,
  img:any,
  createdAt:any,
  username:any
  replies: any
}

const Post = ({count, key, content, createdAt, username, img, replies}:Props) => {
 const [replyComment, setReplyComment] = useState(false)


  let renderReply = replies.map((reply:any)=>{
    return <Reply replyProps={reply}/>})
  return (
    <>
    <article className="post" key={key}>
        <div className="post__left">
          <div className="plus"><PlusIcon/></div>
          <p className="score">{count}</p>
          <div className="minus"><MinusIcon/></div>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src={img} alt="" />
              <div className="username">{username}</div>
              <div className="time">{createdAt}</div>
            </div>
            {username != "juliusomo" ?
            <div onClick={() => setReplyComment(true)} className="reply__container">
              <ReplyIcon/>
              <span>Reply</span>
            </div>
            :
            <div className="delete__edit__container">
              <div className="delete__container">
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
            {content}
          </div>
        </div>
    </article>
    <div className="replies">
     {renderReply}
     {replyComment === true ? <ReplyComment/> : ""}
    </div>
    </>
  )
  
}

export default Post
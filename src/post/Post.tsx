import "./Post.scss"
import Reply from "../reply/Reply"
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg"
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg"
import { ReactComponent as ReplyIcon } from "../assets/icon-reply.svg"
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg"
import ReplyComment from "../replyComment/ReplyComment"
import { useState } from "react"
import {db} from "../firebase"
import { doc, updateDoc } from "firebase/firestore"

type Props = {
  count: any
  id: string,
  content: any,
  img:any,
  createdAt:any,
  username:any
  replies: any
  setNewReplyComment:any
  setDeleteComment:any
  setDeleteReply:any
  setShowPopup:any
  setShowReplyPopup:any
  setRenderUpdatePost: any
  setRenderUpdateReply: any
}

const Post = ({count, id, content, createdAt, username, img, replies, setNewReplyComment, setDeleteComment, setDeleteReply, setShowPopup, setShowReplyPopup, setRenderUpdatePost, setRenderUpdateReply}:Props) => {
 const [replyComment, setReplyComment] = useState(false)
 const [editCommentState, setEditCommentState] = useState(false)
 const [comment, setComment] = useState(content)
 const [replyingToState, setReplyingToState] = useState("");
 const [scoreState, setScoreState] = useState(count)


 const updatePost = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  const docRef= doc(db, "post", id);
  updateDoc((docRef),{
      content: comment,
      createdAt: createdAt,
      img: img,
      score: count,
      username: username,
      id: id,
      replies: replies
  })
  setRenderUpdatePost(comment)
  setEditCommentState(false)
 }

 const editComment =
 <form> 
 <textarea value={comment} onChange={(e)=> setComment(e.target.value)}>
 </textarea>
 <button onClick={updatePost}>UPDATE</button>
 </form>

 const deletePostRequest = () => {
  setShowPopup(true)
  setDeleteComment(id)
 }

  let renderReply = replies.map((reply:any)=>{
    return <Reply key={reply.id} setReplyingToState={setReplyingToState} replyProps={reply} postId={id} setReplyComment={setReplyComment} setDeleteReply={setDeleteReply} setShowReplyPopup={setShowReplyPopup} setRenderUpdateReply={setRenderUpdateReply}/>})
  return (
    <>
    <article className="post">
        <div className="post__left">
          <div className="plus" onClick={()=> setScoreState(scoreState + 1)}><PlusIcon/></div>
          <p className="score">{scoreState}</p>
          <div className="minus"  onClick={()=> setScoreState(scoreState - 1)}><MinusIcon/></div>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src={img} alt="" />
              <div className="username">{username}</div>
              {username === "juliusomo" ? <div className="you">you</div> : ""}
              <div className="time">{createdAt}</div>
            </div>
            {username != "juliusomo" ?
            <div onClick={() => {setReplyComment(true);setReplyingToState(username)}} className="reply__container">
              <ReplyIcon/>
              <span>Reply</span>
            </div>
            :
            <div className="delete__edit__container">
              <div onClick={deletePostRequest} className="delete__container">
                <DeleteIcon/>
                <span>Delete</span>
              </div>
              <div onClick={() => setEditCommentState(true)} className="edit__container">
              <EditIcon/>
              <span>Edit</span>
              </div>
            </div>}
          </div>
          <div className="post__right__bottom">
            {editCommentState ? editComment : content}
          </div>
        </div>
    </article>
    <div className="replies">
     {renderReply}
     {replyComment === true ? <ReplyComment id={id} replyingToState={replyingToState} setNewReplyComment={setNewReplyComment} setReplyComment={setReplyComment}/> : ""}
    </div>
    </>
  )
  
}

export default Post
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
import { deleteReplyInterface } from "../types/deleteReply.interface"
import { Replies } from "../types/post.interface"


type Props = {
  count: number
  id: string,
  content: string,
  img: string,
  username: string
  replies: Replies[]
  convertedTime: string | undefined
  setDeleteComment: React.Dispatch<React.SetStateAction<string>>
  setDeleteReply: React.Dispatch<React.SetStateAction<deleteReplyInterface>>
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
  setShowReplyPopup: React.Dispatch<React.SetStateAction<boolean>>
  userData: {username: string; img: string;}
  loggedIn: boolean
}

const Post = ({loggedIn, userData, count, convertedTime, id, content, username, img, replies, setDeleteComment, setDeleteReply, setShowPopup, setShowReplyPopup}:Props) => {
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
      img: img,
      score: count,
      username: username,
      id: id,
      replies: replies
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
 <button onClick={updatePost}>UPDATE</button>
 </form>

 const deletePostRequest = () => {
  setShowPopup(true)
  setDeleteComment(id)
 }

  let renderReply = replies.map((reply:any)=>{
    return <Reply loggedIn={loggedIn} userData={userData} key={reply.id} setReplyingToState={setReplyingToState} replyProps={reply} postId={id} setReplyComment={setReplyComment} setDeleteReply={setDeleteReply} setShowReplyPopup={setShowReplyPopup}/>})
  return (
    <>
    <article className="post">
        <div className="post__left">
          <button disabled={!loggedIn} className="plus" onClick={()=> addScore()}><PlusIcon/></button>
          <p className="score">{scoreState}</p>
          <button disabled={!loggedIn} className="minus"  onClick={()=> subtractScore()}><MinusIcon/></button>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src={img} alt={`Profile picture from ${username}`} />
              <div className="username">{username}</div>
              {username === userData.username ? <div className="you">you</div> : ""}
              <div className="time">{convertedTime}</div>
            </div>
            {loggedIn === false ? "" : username != userData.username ?
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
     {replyComment === true ? <ReplyComment loggedIn={loggedIn} userData={userData} id={id} replyingToState={replyingToState} setReplyComment={setReplyComment}/> : ""}
    </div>
    </>
  )
  
}

export default Post
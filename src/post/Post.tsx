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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {IDeleteReply} from "../App"


type Props = {
  count: number
  id: string,
  content: string,
  img: string,
  username: string
  replies: object[]
  setNewReplyComment: React.Dispatch<React.SetStateAction<number>>
  setDeleteComment: React.Dispatch<React.SetStateAction<string>>
  setDeleteReply: React.Dispatch<React.SetStateAction<IDeleteReply>>
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
  setShowReplyPopup: React.Dispatch<React.SetStateAction<boolean>>
  setRenderUpdatePost: React.Dispatch<React.SetStateAction<string>>
  setRenderUpdateReply: React.Dispatch<React.SetStateAction<string>>
  timestamp: any
  userData: {username: string; img: string;}
  loggedIn: boolean
}

const Post = ({loggedIn, userData, count,timestamp, id, content, username, img, replies, setNewReplyComment, setDeleteComment, setDeleteReply, setShowPopup, setShowReplyPopup, setRenderUpdatePost, setRenderUpdateReply}:Props) => {
 const [replyComment, setReplyComment] = useState(false)
 const [editCommentState, setEditCommentState] = useState(false)
 const [comment, setComment] = useState(content)
 const [replyingToState, setReplyingToState] = useState("");
 const [scoreState, setScoreState] = useState(count)
 dayjs.extend(relativeTime)
 let timeAgo:String= "";
if (timestamp != undefined) {
  timeAgo=dayjs(new Date(timestamp.toDate())).fromNow()
}

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
    return <Reply loggedIn={loggedIn} userData={userData} key={reply.id} setReplyingToState={setReplyingToState} replyProps={reply} postId={id} setReplyComment={setReplyComment} setDeleteReply={setDeleteReply} setShowReplyPopup={setShowReplyPopup} setRenderUpdateReply={setRenderUpdateReply}/>})
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
              {username === userData.username ? <div className="you">you</div> : ""}
              <div className="time">{timeAgo}</div>
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
     {replyComment === true ? <ReplyComment loggedIn={loggedIn} userData={userData} id={id} replyingToState={replyingToState} setNewReplyComment={setNewReplyComment} setReplyComment={setReplyComment}/> : ""}
    </div>
    </>
  )
  
}

export default Post
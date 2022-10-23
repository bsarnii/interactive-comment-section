import "./ReplyPopup.scss";
import {db} from "../firebase"
import { doc, updateDoc, arrayRemove } from "firebase/firestore"

const ReplyPopup = ({setShowReplyPopup,deleteReply}:any) => {

  const deleteConfirm = () => {
    const docRef=doc(db,"post",deleteReply.postId)
    updateDoc(docRef,{
      replies:arrayRemove({
        content: deleteReply.replies.content,
        id: deleteReply.replies.id,
        img: deleteReply.replies.img,
        score: deleteReply.replies.score,
        username: deleteReply.replies.username,
        replyingTo: deleteReply.replies.replyingTo,
        timestamp: deleteReply.replies.timestamp
      })
    })
  setShowReplyPopup(false)
  }

  return (
    <div className='replyPopup'>
        <div className="popup__inner">
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="button__container">
                <button onClick={()=> setShowReplyPopup(false)} className="btn__cancel">NO, CANCEL</button>
                <button onClick={deleteConfirm} className="btn__confirm">YES, DELETE</button>
            </div>
      </div>
    </div>
  )
}

export default ReplyPopup
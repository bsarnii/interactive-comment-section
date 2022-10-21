import "./ReplyComment.scss"
import { useState } from "react"
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"

type Props = {
  id:string,
  setNewReplyComment:any,
  setReplyComment: any,
  replyingToState:any
}
const ReplyComment = ({id, setNewReplyComment, setReplyComment, replyingToState}:Props) => {
  const [comment, setComment] = useState("");
  const addReply = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const docRef= doc(db, "post", id);
        const replyId= Math.random()*10
        updateDoc((docRef), {
          replies:arrayUnion({
            content: comment,
            createdAt: "1 minute ago",
            img: "./assets/avatars/image-juliusomo.png",
            score: 1,
            username: "juliusomo",
            id: replyId,
            replyingTo: replyingToState
          })
        })
        setNewReplyComment(replyId)
        setReplyComment(false)
        setComment("");
        
      }

  return (
    <section className="reply__comment">
      <form>
        <img src="../src/assets/avatars/image-juliusomo.png" alt="avatar"/>
        <textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        >
        </textarea>
        <button type="submit" onClick={addReply}>Reply</button>
      </form>
    </section>
  )
}

export default ReplyComment

function now(): any {
  throw new Error("Function not implemented.")
}

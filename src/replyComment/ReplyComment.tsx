import "./ReplyComment.scss"
import { useState } from "react"
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"


type Props = {
  id:string,
  setNewReplyComment: React.Dispatch<React.SetStateAction<number>>,
  setReplyComment: React.Dispatch<React.SetStateAction<boolean>>,
  replyingToState: string
  userData: {username: string; img: string;}
  loggedIn: boolean
}
const ReplyComment = ({userData, loggedIn, id, setNewReplyComment, setReplyComment, replyingToState}:Props) => {
  const [comment, setComment] = useState("");
  const addReply = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const docRef= doc(db, "post", id);
        const replyId= Math.random()*10
        updateDoc((docRef), {
          replies:arrayUnion({
            content: comment,
            img: userData.img,
            score: 1,
            username: userData.username,
            id: replyId,
            replyingTo: replyingToState,
            timestamp: new Date()
          })
        })
        setNewReplyComment(replyId)
        setReplyComment(false)
        setComment("");
        
      }

  return (
    <section className="reply__comment">
      <form>
        <img src={userData.img} alt="avatar"/>
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

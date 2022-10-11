import "./ReplyComment.scss"
import { useState } from "react"
import { colRef } from "../firebase"
import { addDoc } from "firebase/firestore"

const ReplyComment = () => {
  const [comment, setComment] = useState("");

  const sendPost = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(comment);
        addDoc((colRef), {
          content: comment,
          createdAt: "1 minute ago",
          img: "../src/assets/avatars/image-juliusomo.png",
          score: 1,
          username: "juliusomo",
          id: "3",
          replies: []
        })
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
        <button type="submit" onClick={sendPost}>Reply</button>
      </form>
    </section>
  )
}

export default ReplyComment
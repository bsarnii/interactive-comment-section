import "./Comment.scss"
import { useState } from "react"
import { colRef } from "../firebase"
import { addDoc, serverTimestamp } from "firebase/firestore"
import avatar from "../assets/avatars/image-juliusomo.png"

const Comment = ({setNewComment}:any) => {
  const [comment, setComment] = useState("");

  const sendPost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addDoc((colRef), {
      content: comment,
      img: "./assets/avatars/image-juliusomo.png",
      score: 1,
      username: "juliusomo",
      id: "3",
      replies: [],
      timestamp: serverTimestamp()
    })
    setNewComment(Math.random()*10)
    setComment("");
    
  }
  
  return (
    <section className="comment">
      <form>
        <img src={avatar} alt="avatar"/>
        <textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        >
        </textarea>
        <button type="submit" onClick={sendPost}>SEND</button>
      </form>
    </section>
  )
}

export default Comment




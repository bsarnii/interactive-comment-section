import "./Comment.scss"
import { useState } from "react"
import { colRef } from "../firebase"
import { addDoc, serverTimestamp } from "firebase/firestore"

type prop = {
  setNewComment: React.Dispatch<React.SetStateAction<number>>
  userData: {username: string; img: string;}
}
const Comment = ({setNewComment, userData}:prop) => {
  const [comment, setComment] = useState("");

  const sendPost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addDoc((colRef), {
      content: comment,
      img: userData.img,
      score: 1,
      username: userData.username,
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
        <img src={userData.img} alt="avatar"/>
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




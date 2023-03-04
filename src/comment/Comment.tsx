import "./Comment.scss"
import { useState } from "react"
import { colRef } from "../firebase"
import { addDoc, serverTimestamp } from "firebase/firestore"

type prop = {
  userData: {username: string; img: string;}
}
const Comment = ({userData}:prop) => {
  const [comment, setComment] = useState("");

  const sendPost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addDoc((colRef), {
      content: comment,
      img: userData.img,
      score: 1,
      username: userData.username,
      id: Math.random()*10,
      replies: [],
      timestamp: serverTimestamp()
    })
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




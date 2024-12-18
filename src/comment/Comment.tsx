import "./Comment.scss"
import { useState } from "react"
import { colRef } from "../firebase"
import { addDoc, serverTimestamp } from "firebase/firestore"

type props = {
  userData: {username: string; img: string;}
  logout: () => void
}
const Comment = ({userData, logout}:props) => {
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
        <div className="avatar-logout-wrapper">
          <img src={userData.img} alt="avatar"/>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
        
        <textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        >
        </textarea>
        <button className="submit-btn" type="submit" onClick={sendPost}>SEND</button>
      </form>
    </section>
  )
}

export default Comment




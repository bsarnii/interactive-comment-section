import "./ReplyComment.scss"
import { useState } from "react"
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"

type Props = {
  id:string
}

const ReplyComment = ({id}:Props) => {
  const [comment, setComment] = useState("");
  console.log(id)
  const addReply = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const docRef= doc(db, "post", "3Mlc1ozg5usQOE0bHyPL");
        updateDoc((docRef), {
          replies:arrayUnion({
            content: comment,
            createdAt: "1 minute ago",
            img: "../src/assets/avatars/image-juliusomo.png",
            score: 1,
            username: "juliusomo"
          })
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
        <button type="submit" onClick={addReply}>Reply</button>
      </form>
    </section>
  )
}

export default ReplyComment
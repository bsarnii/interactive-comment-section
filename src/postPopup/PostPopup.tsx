import "./PostPopup.scss";
import {db} from "../firebase"
import { doc, deleteDoc } from "firebase/firestore"

const PostPopup = () => {
  return (
    <div className='postPopup'>
        <div className="popup__inner">
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="button__container">
                <button className="btn__cancel">NO, CANCEL</button>
                <button className="btn__confirm">YES, DELETE</button>
            </div>
      </div>
    </div>
  )
}

export default PostPopup
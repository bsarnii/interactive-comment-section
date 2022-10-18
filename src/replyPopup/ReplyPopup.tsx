import "./ReplyPopup.scss";

const ReplyPopup = ({setShowReplyPopup}:any) => {
  return (
    <div className='replyPopup'>
        <div className="popup__inner">
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="button__container">
                <button onClick={()=> setShowReplyPopup(false)} className="btn__cancel">NO, CANCEL</button>
                <button onClick={()=> setShowReplyPopup(false)} className="btn__confirm">YES, DELETE</button>
            </div>
      </div>
    </div>
  )
}

export default ReplyPopup
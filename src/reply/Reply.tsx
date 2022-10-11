import "./Reply.scss"
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg"
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg"
import { ReactComponent as ReplyIcon } from "../assets/icon-reply.svg"
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg"
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg"


const Reply = ({replyProps}:any) => {

  return (
    <article className="reply">
        <div className="post__left">
          <div className="plus"><PlusIcon/></div>
          <p className="score">{replyProps.score}</p>
          <div className="minus"><MinusIcon/></div>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src={replyProps.img} alt="avatar" />
              <div className="username">{replyProps.username}</div>
              <div className="time">{replyProps.createdAt}</div>
            </div>
            {replyProps.username != "juliusomo" ?
            <div className="reply__container">
              <ReplyIcon/>
              <span>Reply</span>
            </div>
            :
            <div className="delete__edit__container">
              <div className="delete__container">
                <DeleteIcon/>
                <span>Delete</span>
              </div>
              <div className="edit__container">
              <EditIcon/>
              <span>Edit</span>
              </div>
            </div>}
          </div>
          <div className="post__right__bottom">
            {replyProps.content}
          </div>
        </div>
    </article>
  )
}

export default Reply
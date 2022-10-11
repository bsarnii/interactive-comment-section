import React from 'react'
import { ReactComponent as Plus } from "../assets/icon-plus.svg"
import { ReactComponent as Minus } from "../assets/icon-minus.svg"
import { ReactComponent as Reply } from "../assets/icon-reply.svg"
import "./Post.scss"

const PostSkeleton = () => {
  return (
    <article className="post">
        <div className="post__left">
          <div className="plus"><Plus/></div>
          <p className="score">0</p>
          <div className="minus"><Minus/></div>
        </div>
        <div className="post__right">
          <div className="post__right__top">
            <div className="avatar__username__time">
              <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" className="skeleton" alt="" />
              <div className="time skeleton skeleton-heading"></div>
            </div>
            <div className="reply__container">
              <Reply />
              <span>Reply</span>
            </div>
          </div>
          <div className="post__right__bottom skeleton-text skeleton">
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!"
          </div>
        </div>
    </article>
  )
}

export default PostSkeleton
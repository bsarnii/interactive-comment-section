import './App.scss'
import Post from './post/Post'
import PostSkeleton from './post/PostSkeleton'
import Comment from './comment/Comment'
import Login from './login/Login'
import { useEffect, useState } from 'react'
import PostPopup from "./postPopup/PostPopup"
import ReplyPopup from './replyPopup/ReplyPopup'
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from './Store/store'
import { fetchPosts, postsReducer, setPosts } from './Store/Reducers/postsReducer'


export interface IDeleteReply {postId: string; replies: {content:string,id:number,img:string,score:number,username:string,replyingTo:string,timestamp:any}}
function App() {
  const {fetchedPosts, isLoading, error} = useSelector(
    (state: RootState) => state.posts
  )
  const dispatch = useDispatch<AppDispatch>();

        //Getting props from child//
  const [deleteComment, setDeleteComment] = useState("");
  const [deleteReply, setDeleteReply] = useState<IDeleteReply>({postId: "", replies: {content:"",id:0,img:"",score:0,username:"",replyingTo:"",timestamp:""}});
  const [showPopup, setShowPopup] = useState(false);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [renderUpdatePost, setRenderUpdatePost] = useState("");
  const [renderUpdateReply,setRenderUpdateReply] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({username:" ",img:" "})
  
  useEffect(()=>{
    const timer =setTimeout(()=> dispatch(fetchPosts()), 300 )
    console.log("dispatched")
      return () => clearTimeout(timer);
  },[dispatch,showPopup,showReplyPopup, renderUpdatePost, renderUpdateReply, loggedIn])


  const posts = fetchedPosts.map( post => {
    return <Post
    content={post.content} userData={userData} loggedIn={loggedIn}
     count={post.score} id={post.id} key={post.id}
     img={post.img} username={post.username} convertedTime={post.convertedTime}
     timestamp={post.timestamp}
     replies={post.replies} 
     setDeleteComment={setDeleteComment} setDeleteReply={setDeleteReply}
     setShowPopup={setShowPopup} setShowReplyPopup={setShowReplyPopup}
     setRenderUpdatePost={setRenderUpdatePost} setRenderUpdateReply={setRenderUpdateReply}
     />
  })
  return (
    <>
    <main className='container'>
      {loggedIn===true ? "" : <Login setLoggedIn={setLoggedIn} setUserData={setUserData} />}
      {loggedIn === false ? "" : <Comment userData={userData} />}
      <section className='posts'>
        {fetchedPosts.length > 1 ? 
        <>
          {posts}
        </> 
        :
        <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        </>
        }
      </section>
    </main>
    {showPopup ? <PostPopup setShowPopup={setShowPopup} deleteComment={deleteComment}/> : ""}
    {showReplyPopup ? <ReplyPopup setShowReplyPopup={setShowReplyPopup} deleteReply={deleteReply}/> : ""}
    </>
  )
}

export default App

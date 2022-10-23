import './App.scss'
import Post from './post/Post'
import PostSkeleton from './post/PostSkeleton'
import Comment from './comment/Comment'
import { onSnapshot, orderBy, query
} from "firebase/firestore"
import { colRef } from "./firebase"
import { useEffect, useState } from 'react'
import PostPopup from "./postPopup/PostPopup"
import ReplyPopup from './replyPopup/ReplyPopup'
export interface IDeleteReply {postId: string; replies: {content:string,id:number,img:string,score:number,username:string,replyingTo:string,timestamp:any}}
function App() {
  const [data, setData] = useState([{
    content: "",
    id: "",
    img: "",
    score: 0,
    username: "",
    replies: [],
    timestamp: ""
  }
]);
        //Getting props from child//
  const [newComment, setNewComment] = useState(0);
  const [newReplyComment, setNewReplyComment] = useState(0);
  const [deleteComment, setDeleteComment] = useState("");
  const [deleteReply, setDeleteReply] = useState<IDeleteReply>({postId: "", replies: {content:"",id:0,img:"",score:0,username:"",replyingTo:"",timestamp:""}});
  const [showPopup, setShowPopup] = useState(false);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [renderUpdatePost, setRenderUpdatePost] = useState("");
  const [renderUpdateReply,setRenderUpdateReply] = useState("");
  
  const q = query(colRef, orderBy("timestamp"))
  const fetchData =  () => {
    onSnapshot(q,(snapshot) => {
       let posts:any= []
       snapshot.docs.forEach((doc) => {
         posts.push({ ...doc.data(), id: doc.id })
       })
       setData(posts)
   })
   }
  useEffect(()=>{
    const timer =setTimeout(()=> fetchData(), 300 )
    return () => clearTimeout(timer);
    
  },[newComment, newReplyComment,showPopup,showReplyPopup, renderUpdatePost, renderUpdateReply])
  const posts = data.map( post => {
    return <Post
    content={post.content}
     count={post.score} id={post.id} key={post.id}
     img={post.img} username={post.username} timestamp={post.timestamp}
     replies={post.replies} setNewReplyComment={setNewReplyComment}
     setDeleteComment={setDeleteComment} setDeleteReply={setDeleteReply}
     setShowPopup={setShowPopup} setShowReplyPopup={setShowReplyPopup}
     setRenderUpdatePost={setRenderUpdatePost} setRenderUpdateReply={setRenderUpdateReply}
     />
  })
  return (
    <>
    <main className='container'>
      <section className='posts'>
        {data.length > 1 ? 
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
      <Comment setNewComment={setNewComment} />
    </main>
    {showPopup ? <PostPopup setShowPopup={setShowPopup} deleteComment={deleteComment}/> : ""}
    {showReplyPopup ? <ReplyPopup setShowReplyPopup={setShowReplyPopup} deleteReply={deleteReply}/> : ""}
    </>
  )
}

export default App

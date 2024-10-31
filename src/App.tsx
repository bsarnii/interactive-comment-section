import './App.scss'
import Post from './post/Post'
import PostSkeleton from './post/PostSkeleton'
import Comment from './comment/Comment'
import Login from './login/Login'
import { useEffect, useState } from 'react'
import PostPopup from "./postPopup/PostPopup"
import ReplyPopup from './replyPopup/ReplyPopup'
import { useSelector, useDispatch, Provider } from "react-redux";
import { RootState, AppDispatch, store, persistor } from './Store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchPosts } from './Store/Reducers/postsReducer'
import { deleteReplyInterface } from './types/deleteReply.interface'
import { selectIsLoggedIn, selectUser, setUser } from './Store/Reducers/userReducer'


function App() {
  const {fetchedPosts} = useSelector((state: RootState) => state.posts);
  const userData = useSelector((state: RootState) => selectUser(state));
  const loggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  const dispatch = useDispatch<AppDispatch>();

        //Getting props from child//
  const [deleteComment, setDeleteComment] = useState("");
  const [deleteReply, setDeleteReply] = useState<deleteReplyInterface>({postId: "", replies: {content:"",id:0,img:"",score:0,username:"",replyingTo:"",timestamp:0}});
  const [showPopup, setShowPopup] = useState(false);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  
  useEffect(()=>{
    const timer =setTimeout(()=> dispatch(fetchPosts()), 300 )
      return () => clearTimeout(timer);
  },[dispatch,showPopup,showReplyPopup, loggedIn])

  const login = (username:string, img:string) => {
    dispatch(setUser({ username, img }));
  }
  const logout = () => {
    dispatch(setUser({ username: '', img:'' }));
  }


  const posts = fetchedPosts.map( post => {
    return <Post
    content={post.content} userData={userData} loggedIn={loggedIn}
     count={post.score} id={post.id} key={post.id}
     img={post.img} username={post.username} convertedTime={post.convertedTime}
     replies={post.replies} 
     setDeleteComment={setDeleteComment} setDeleteReply={setDeleteReply}
     setShowPopup={setShowPopup} setShowReplyPopup={setShowReplyPopup}
    
     />
  })
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className='container'>
          {loggedIn===true 
          ? <Comment logout={logout} userData={userData} /> 
          : <Login login={login}/>}
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
      </PersistGate>
    </Provider>
  )
}

export default App

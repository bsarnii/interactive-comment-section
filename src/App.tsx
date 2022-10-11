import './App.scss'
import Post from './post/Post'
import PostSkeleton from './post/PostSkeleton'
import Comment from './comment/Comment'
import { getDocs
} from "firebase/firestore"
import { colRef } from "./firebase"
import { useEffect, useState } from 'react'

type data = {
  content:string,
  createdAt: string,
  id: string,
  img: string,
  score: number,
  username: string,
  imgClass: string,
  textClass: string,
  replies: []
}
function App() {
  const [data, setData] = useState([{
    content: "",
    createdAt: "",
    id: "0",
    img: "",
    score: 0,
    username: "",
    replies: []
  }
]);
        //Getting props from child//
  const [newComment, setNewComment] = useState("");
  
  useEffect(()=>{
     const fetchData = async () => {
     const fdata = await getDocs(colRef)
    .then((snapshot) => {
        let posts:any= []
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id })
        })
        setData(posts)
        console.log(posts)
    })
    }
    fetchData()
  },[newComment])
  const posts = data.map( post => {
    return <Post
    content={post.content} createdAt={post.createdAt}
     count={post.score} key={post.id}
     img={post.img} username={post.username}
     replies={post.replies}
     />
  })
  return (
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
    
  )
}

export default App

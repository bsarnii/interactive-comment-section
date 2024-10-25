import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { PostInterface } from '../../types/post.interface'
import { RootState } from '../store'
import { collection, CollectionReference, getDocs, onSnapshot, orderBy, query
} from "firebase/firestore"
import firebase from "firebase/app"
import "firebase/firestore"
import { colRef, db } from "../../firebase"
import { AppThunk } from '../AppThunk'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface PostsData {
  fetchedPosts:PostInterface[]
  isLoading: boolean
  error: string | null
}

const initialState:PostsData = {
    fetchedPosts: [{
        content: "",
        id: "",
        img: "",
        score: 0,
        username: "",
        replies: [],
        timestamp: "",
        convertedTime: ""
    }],
    isLoading: false,
    error: null
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setPosts: (state, action: PayloadAction<PostInterface[]>) => {
      state.fetchedPosts = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoading,setError,setPosts } = postsSlice.actions

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async(_,{dispatch}) =>{
  const q = query(colRef, orderBy("timestamp", "desc"))
  try {
      dispatch(setLoading(true))
      onSnapshot(q,(snapshot) => {
         let posts:PostInterface[]= []
         snapshot.docs.forEach((doc) => {
           return posts.push({ ...doc.data(), id: doc.id } as PostInterface)
         })
         // converting the timestamp to string
         posts.forEach(post => {
          dayjs.extend(relativeTime)
          post.convertedTime = post.timestamp && dayjs(new Date(post.timestamp.toDate())).fromNow()
          post.timestamp = post.timestamp && post.timestamp.toMillis && post.timestamp.toMillis()
          // converting the timestamp to string in replies
          if (post.replies){
            post.replies.forEach(reply => {
              reply.convertedTime = reply.timestamp.toDate && dayjs(new Date(reply.timestamp.toDate())).fromNow()
              reply.timestamp = reply.timestamp && reply.timestamp.toDate && reply.timestamp.toMillis()
            })
          }
         })
         dispatch(setPosts(posts))
         dispatch(setLoading(false))
     })
  } catch (error) {
    dispatch(setError(error as string))
  }
})
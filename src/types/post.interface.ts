import { Timestamp } from "firebase/firestore";

export interface PostInterface{
    content: string
    id: string
    img: string
    score: number
    username: string
    replies: [] | Replies[]
    timestamp: any
    convertedTime?: string
}

export interface Replies {
    content: string
    id: number
    replyingTo: string
    timestamp: any
    username: string
    convertedTime?: string
}
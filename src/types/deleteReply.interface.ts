
export interface deleteReplyInterface {
    postId: string
    replies: {
        content:string
        id:number
        img:string
        score:number
        username:string
        replyingTo:string
        timestamp:number | Date
    }
}
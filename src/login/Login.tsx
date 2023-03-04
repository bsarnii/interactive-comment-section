import "./Login.scss"
import GoogleButton from "react-google-button"
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = ({setLoggedIn,setUserData}:any) => {

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((re)=>{
      setLoggedIn(true)
      setUserData({username:re.user.displayName,img:re.user.photoURL})
    })
    .catch((err)=>{
      setLoggedIn(false)
      console.log(err)
    })
  }

  return (
    <div className='login'>
      <h1>Sign in to write a comment!</h1>
      <GoogleButton onClick={handleGoogleSignIn}/>
    </div>
  )
}

export default Login
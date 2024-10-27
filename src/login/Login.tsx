import "./Login.scss"
import GoogleButton from "react-google-button"
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type props = {
  login: (username:string,url:string) => void
}

const Login = ({login}:props) => {

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then((re)=>{
      login(re.user.displayName || '',re.user.photoURL || '')
    })
    .catch((err)=>{
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
import { useState } from "react";
import "./css/signin.css";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const From = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const changeName= (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  }

  const changePassword= (e) => {
    setPassword(e.target.value);
  }

 


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert("Signed :");
      console.log(result);
    }catch(err){
      alert( err.message)
    }
  }

 return(
  <div className="container">
  <form onSubmit={handleSubmit} className="form">
    <h1>Signin</h1>
    <input type="text" placeholder="Email"  onInput={changeName} className="userDeatils"required/>
    <input type="password" placeholder="Password" onInput={changePassword} className="userDeatils" required/>
    <button type="submit">Submit</button>
  </form>
  </div>
 )
}
const Sigin = () => {
 return(
   <From></From>
 )
}
export default Sigin;
import { useState } from "react";
import "./css/signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigation

  const changeName = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in user:", result.user);
      navigate("/dashboard"); // ✅ redirect after signin
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Signin</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={changeName}
          className="userDeatils"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={changePassword}
          className="userDeatils"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Sigin = () => {
  return <Form />;
};

export default Sigin;

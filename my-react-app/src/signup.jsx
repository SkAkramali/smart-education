import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./css/signup.css";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();  // ✅ initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Default profile picture URL
      let photoURL =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default avatar

      // If user uploaded a profile pic
      if (profilePic) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Save user details in Firestore
      await setDoc(doc(db, "Students", user.uid), {
        name,
        email,
        photoURL,
        createdAt: new Date(),
      });

      setSuccess("Signup successful! 🎉");

      // ✅ Redirect user to /userInterest
      navigate("/userInterest");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;

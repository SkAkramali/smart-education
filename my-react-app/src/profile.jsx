import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./css/profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Try fetching from Firestore if extra details exist
        const docRef = doc(db, "Students", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData({ ...docSnap.data(), email: user.email, photoURL: user.photoURL });
        } else {
          // fallback if no Firestore data
          setUserData({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin"); // redirect to signin after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={userData.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Profile"
          className="profile-pic-large"
        />
        <h2>{userData.name || "No Name"}</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        {userData.currentEducation && <p><strong>Education:</strong> {userData.currentEducation}</p>}
        {userData.interests && userData.interests.length > 0 && (
          <p><strong>Interests:</strong> {userData.interests.join(", ")}</p>
        )}

        {/* ✅ Sign Out Button */}
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

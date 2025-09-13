// src/roadmap.jsx
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Roadmap() {
  const [roadmap, setRoadmap] = useState("Loading your roadmap...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      const user = auth.currentUser;
      if (!user) {
        setRoadmap("❌ Please login to view your roadmap.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "Students", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRoadmap(data.roadmap || "⚠️ No roadmap generated yet.");
        } else {
          setRoadmap("⚠️ No data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setRoadmap("❌ Error loading roadmap.");
      }

      setLoading(false);
    };

    fetchRoadmap();
  }, []);

  if (loading) return <p>Loading roadmap...</p>;

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Your Career Roadmap</h2>
        <pre
          style={{
            textAlign: "left",
            whiteSpace: "pre-wrap",
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {roadmap}
        </pre>
      </div>
    </div>
  );
}

export default Roadmap;

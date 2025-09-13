// src/dashboard.jsx
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Listen to the student document in Firestore
    const unsub = onSnapshot(
      doc(db, "Students", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          setStudent(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!student) return <p>No student data found.</p>;

  return (
    <div className="dashboard-container p-6 max-w-3xl mx-auto">
      {/* Student Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {student.name}!</h1>
        {student.interests && student.interests.length > 0 ? (
          <p className="text-gray-700 mb-2">
            Your selected interests: {student.interests.join(", ")}
          </p>
        ) : (
          <p className="text-gray-500 mb-2">
            You haven’t added any interests yet.
          </p>
        )}
      </div>

      {/* Career Roadmap Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-3">Your Career Roadmap</h2>
        {student.roadmap ? (
          <pre className="whitespace-pre-wrap text-gray-800">
            {student.roadmap}
          </pre>
        ) : (
          <p className="text-gray-500">
            Roadmap will appear after you submit your interests.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

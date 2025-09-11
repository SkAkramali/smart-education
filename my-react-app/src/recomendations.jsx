import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const CareerResult = ({ studentId }) => {
  const [recommendation, setRecommendation] = useState("⏳ Waiting...");

  useEffect(() => {
    if (!studentId) return;
    const unsub = onSnapshot(doc(db, "students", studentId), (docSnap) => {
      if (docSnap.exists()) {
        setRecommendation(docSnap.data().recommendation || "⏳ Generating...");
      }
    });
    return () => unsub();
  }, [studentId]);

  return (
    <div className="result-box">
      <h3>Career Recommendation</h3>
      <p>{recommendation}</p>
    </div>
  );
};

export default CareerResult;

// src/Recommendations.jsx
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

function Recommendations() {
  const [recommendations, setRecommendations] = useState("Generating...");

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      const user = auth.currentUser;
      if (!user) {
        setRecommendations("Please login to see recommendations.");
        return;
      }

      const functions = getFunctions();
      const generateCareerRecommendation = httpsCallable(
        functions,
        "generateCareerRecommendation"
      );

      try {
        const result = await generateCareerRecommendation();
        setRecommendations(result.data.recommendations);
      } catch (error) {
        console.error("Error:", error);
        setRecommendations("Failed to fetch recommendations.");
      }
    };

    fetchAIRecommendations();
  }, []);

  return (
    <div>
      <h3>Your Career Recommendations</h3>
      <pre>{recommendations}</pre>
    </div>
  );
}

export default Recommendations;

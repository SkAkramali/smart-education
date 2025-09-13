import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Questionnaire
const questions = [
  {
    id: "interest",
    question: "Which area are you most interested in?",
    options: [
      { label: "Arts & Humanities", value: "B.A." },
      { label: "Science & Research", value: "B.Sc." },
      { label: "Commerce & Finance", value: "B.Com." },
      { label: "Business & Management", value: "BBA" },
      { label: "Technology & Engineering", value: "B.Tech" },
      { label: "Computer Applications", value: "BCA" },
      { label: "Finance & Accounting", value: "BAF" },
      { label: "Management Studies", value: "BMS" },
    ],
  },
  {
    id: "education",
    question: "What is your current education level?",
    options: [
      { label: "High School (10+2)", value: "High School" },
      { label: "Diploma", value: "Diploma" },
      { label: "Undergraduate", value: "Undergraduate" },
    ],
  },
  {
    id: "strengths",
    question: "Which of these best describes your strengths?",
    options: [
      { label: "Analytical & Logical Thinking", value: "Analytical" },
      { label: "Creativity & Writing", value: "Creative" },
      { label: "Leadership & Management", value: "Leadership" },
      { label: "Numbers & Finance", value: "Finance" },
      { label: "Technical & Coding", value: "Technical" },
    ],
  },
  {
    id: "goal",
    question: "What is your main goal after graduation?",
    options: [
      { label: "Secure a Government Job", value: "Government" },
      { label: "Work in Private Sector", value: "Private" },
      { label: "Start My Own Business", value: "Startup" },
      { label: "Pursue Higher Studies", value: "Higher Studies" },
      { label: "Work in Tech/Innovation", value: "Tech" },
    ],
  },
];

function UserCourseInterest() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login first");

    try {
      // Save answers to Firestore
      await setDoc(doc(db, "StudentInterests", user.uid), {
        uid: user.uid,
        name: user.displayName || "Student",
        email: user.email,
        answers,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving student interests:", error);
      alert("Failed to save your answers. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Tell Us About Your Interests</h2>
        {questions.map((q) => (
          <div key={q.id} className="question-block">
            <label>{q.question}</label>
            <select
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswer(q.id, e.target.value)}
              required
            >
              <option value="">Select an option</option>
              {q.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Save & Go to Dashboard</button>
      </form>
    </div>
  );
}

export default UserCourseInterest;

import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./css/userInterest.css";

// Extended Questionnaire (10 Questions)
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
  {
    id: "workstyle",
    question: "What work environment suits you best?",
    options: [
      { label: "Corporate Office", value: "Corporate" },
      { label: "Startup & Innovation", value: "Startup" },
      { label: "Research & Labs", value: "Research" },
      { label: "Creative Fields", value: "Creative" },
      { label: "Field/Outdoor Work", value: "Outdoor" },
    ],
  },
  {
    id: "location",
    question: "Where do you prefer to work?",
    options: [
      { label: "India (Domestic)", value: "India" },
      { label: "Abroad", value: "Abroad" },
      { label: "No Preference", value: "Any" },
    ],
  },
  {
    id: "salary",
    question: "What is your expected salary range initially?",
    options: [
      { label: "2-4 LPA", value: "Low" },
      { label: "4-8 LPA", value: "Mid" },
      { label: "8+ LPA", value: "High" },
    ],
  },
  {
    id: "skills",
    question: "Which additional skills do you want to build?",
    options: [
      { label: "Communication & Public Speaking", value: "Communication" },
      { label: "Data Analysis", value: "Data" },
      { label: "Programming & Development", value: "Coding" },
      { label: "Finance & Accounting", value: "Finance" },
      { label: "Management & Leadership", value: "Management" },
    ],
  },
  {
    id: "higherStudies",
    question: "Do you plan to pursue higher studies?",
    options: [
      { label: "Yes, in India", value: "India" },
      { label: "Yes, Abroad", value: "Abroad" },
      { label: "Not Sure Yet", value: "Maybe" },
      { label: "No", value: "No" },
    ],
  },
  {
    id: "learningStyle",
    question: "How do you prefer to learn?",
    options: [
      { label: "Practical / Hands-On", value: "Practical" },
      { label: "Theoretical / Research", value: "Research" },
      { label: "Online Courses & Self-learning", value: "Online" },
      { label: "Traditional Classroom", value: "Classroom" },
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
      // ✅ Save answers to Firestore in StudentInterests collection
      const a = await setDoc(
        doc(db, "StudentInterests", user.uid),
        {
          uid: user.uid,
          name: user.displayName || "Student",
          email: user.email,
          answers,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
  
      );

      // ✅ Navigate to dashboard (or roadmap)
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

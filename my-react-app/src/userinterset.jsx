// src/StudentForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import navigation
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import "./css/userinterest.css";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [currentEducation, setCurrentEducation] = useState("");
  const [interests, setInterests] = useState([]);
  const [other, setOther] = useState("");
  const navigate = useNavigate();  // ✅ init navigate

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setInterests(
      checked ? [...interests, value] : interests.filter((i) => i !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login first");

    // Combine checkbox interests + other interest (if filled)
    const allInterests = other
      ? [...interests, other.trim()]
      : [...interests];

    await setDoc(doc(db, "students", user.uid), {
      name,
      currentEducation,
      interests: allInterests,
      createdAt: new Date(),
    });

    alert("✅ Student data saved!");

    // Reset form
    setName("");
    setCurrentEducation("");
    setInterests([]);
    setOther("");

    // ✅ Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Student Information</h2>
        <p className="form-subtitle">
          Fill in your details to get career recommendations
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="education">Current Education</label>
            <select
              id="education"
              value={currentEducation}
              onChange={(e) => setCurrentEducation(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              <option value="10th Class">Schooling</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Degree">Undergraduate</option>
              <option value="Post Graduation">Post Graduation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Interests</label>
            <div className="checkbox-group">
              {["Coding", "Sports", "Reading"].map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    value={interest}
                    checked={interests.includes(interest)}
                    onChange={handleCheckbox}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="other">Other Interests</label>
            <textarea
              id="other"
              placeholder="Type other interests..."
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

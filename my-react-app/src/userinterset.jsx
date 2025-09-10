import "./css/userinterest.css"
import { useState } from "react";
import { db } from "./firebase"; // ✅ import Firestore instance
import { collection, addDoc } from "firebase/firestore";

const UserRecommendations = () => {
  // State variables
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [other, setOther] = useState("");

  // ✅ handle checkbox
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (hobbies.includes(value)) {
      setHobbies(hobbies.filter((hobby) => hobby !== value));
    } else {
      setHobbies([...hobbies, value]);
    }
  };

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "student_interests"), {
        fullName: name,
        educationStatus: education,
        hobbies: hobbies,
        otherInterests: other,
        createdAt: new Date()
      });
      alert("Data saved successfully! 🎉");

      // Reset form
      setName("");
      setEducation("");
      setHobbies([]);
      setOther("");

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data. Try again!");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Student Information</h2>
        <p className="form-subtitle">
          Please fill in your details and select your interests
        </p>

        <form className="student-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Current Education */}
          <div className="form-group">
            <label>Current Education Status</label>
            <select 
              value={education} 
              onChange={(e) => setEducation(e.target.value)}
              required
            >
              <option value="">Select your class</option>
              <option>10th Class</option>
              <option>11th Class</option>
              <option>12th Class</option>
              <option>Undergraduate</option>
              <option>Other</option>
            </select>
          </div>

          {/* Hobbies & Interests */}
          <div className="form-group">
            <label>Hobbies & Interests</label>
            <div className="checkbox-group">
              {["Sports", "Reading", "Coding", "Music", "Drawing", "Traveling"].map((hobby) => (
                <label key={hobby}>
                  <input
                    type="checkbox"
                    value={hobby}
                    checked={hobbies.includes(hobby)}
                    onChange={handleCheckboxChange}
                  />{" "}
                  {hobby}
                </label>
              ))}
            </div>
          </div>

          {/* Other Interests */}
          <div className="form-group">
            <label>Other (if any)</label>
            <textarea 
              placeholder="Write your other interests here..."
              value={other}
              onChange={(e) => setOther(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRecommendations;

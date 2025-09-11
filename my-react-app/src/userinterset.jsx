import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./css/userinterest.css"; // ✅ Import your CSS file

const StudentForm = () => {
  const [name, setName] = useState("");
  const [currentEducation, setCurrentEducation] = useState("");
  const [interests, setInterests] = useState([]);
  const [other, setOther] = useState("");

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setInterests(
      checked ? [...interests, value] : interests.filter((i) => i !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), {
        name,
        currentEducation,
        interests,
        other,
        createdAt: serverTimestamp(),
      });
      alert("✅ Student data saved!");
      setName("");
      setCurrentEducation("");
      setInterests([]);
      setOther("");
    } catch (error) {
      console.error("❌ Error adding document: ", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Student Information</h2>
        <p className="form-subtitle">Fill in your details below</p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
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
            <label>Current Education</label>
            <select
              value={currentEducation}
              onChange={(e) => setCurrentEducation(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              <option value="10th Class">Schooling</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Degree">under Garduate</option>
              <option value="Post Graduation">Post Graduation</option>
            </select>
          </div>

          {/* Interests */}
          <div className="form-group">
            <label>Interests</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  value="Sports"
                  checked={interests.includes("Sports")}
                  onChange={handleCheckbox}
                />
                Sports
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Coding"
                  checked={interests.includes("Coding")}
                  onChange={handleCheckbox}
                />
                Coding
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  checked={interests.includes("Reading")}
                  onChange={handleCheckbox}
                />
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Drawing"
                  checked={interests.includes("Drawing")}
                  onChange={handleCheckbox}
                />
                Drawing
              </label>
            </div>
          </div>

          {/* Other */}
          <div className="form-group">
            <label>Other Interests</label>
            <textarea
              placeholder="E.g. Photography, Music..."
              value={other}
              onChange={(e) => setOther(e.target.value)}
            ></textarea>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

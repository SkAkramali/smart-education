// src/CollegesList.jsx
import { useState } from "react";
import "./css/colleges.css";

// Sample college data
const collegesData = {
  "B.A.": [
    { name: "Miranda House", location: "Delhi", type: "Public", fee: "₹50,000/year" },
    { name: "Lady Shri Ram College", location: "Delhi", type: "Public", fee: "₹55,000/year" },
    { name: "Hindu College", location: "Delhi", type: "Public", fee: "₹45,000/year" },
  ],
  "B.Sc.": [
    { name: "St. Xavier's College", location: "Mumbai", type: "Private", fee: "₹70,000/year" },
    { name: "Presidency College", location: "Chennai", type: "Public", fee: "₹60,000/year" },
    { name: "Madras Christian College", location: "Chennai", type: "Private", fee: "₹65,000/year" },
  ],
  "B.Com.": [
    { name: "Shri Ram College of Commerce", location: "Delhi", type: "Public", fee: "₹50,000/year" },
    { name: "Loyola College", location: "Chennai", type: "Private", fee: "₹60,000/year" },
  ],
  "BBA": [
    { name: "NMIMS", location: "Mumbai", type: "Private", fee: "₹2,00,000/year" },
    { name: "Christ University", location: "Bengaluru", type: "Private", fee: "₹1,80,000/year" },
  ],
  "B.Tech": [
    { name: "IIT Bombay", location: "Mumbai", type: "Public", fee: "₹2,00,000/year" },
    { name: "IIT Delhi", location: "Delhi", type: "Public", fee: "₹1,80,000/year" },
    { name: "NIT Trichy", location: "Tamil Nadu", type: "Public", fee: "₹1,50,000/year" },
  ],
  "BCA": [
    { name: "Christ University", location: "Bengaluru", type: "Private", fee: "₹1,50,000/year" },
    { name: "St. Xavier's College", location: "Mumbai", type: "Private", fee: "₹1,20,000/year" },
  ],
  "BAF": [
    { name: "H.R. College", location: "Mumbai", type: "Private", fee: "₹1,50,000/year" },
    { name: "Sydenham College", location: "Mumbai", type: "Public", fee: "₹1,20,000/year" },
  ],
  "BMS": [
    { name: "KJ Somaiya College", location: "Mumbai", type: "Private", fee: "₹1,60,000/year" },
    { name: "NMIMS", location: "Mumbai", type: "Private", fee: "₹2,00,000/year" },
  ],
};

function CollegesList() {
  const [selectedCourse, setSelectedCourse] = useState("B.A.");

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const colleges = collegesData[selectedCourse] || [];

  return (
    <div className="colleges-container">
      <h2>Colleges for {selectedCourse}</h2>

      <label>Select Course:</label>
      <select value={selectedCourse} onChange={handleCourseChange}>
        {Object.keys(collegesData).map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>

      <div className="college-list">
        {colleges.length === 0 ? (
          <p>No colleges found for this course.</p>
        ) : (
          colleges.map((college, index) => (
            <div key={index} className="college-card">
              <h3>{college.name}</h3>
              <p>Location: {college.location}</p>
              <p>Type: {college.type}</p>
              <p>Fee: {college.fee}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CollegesList;

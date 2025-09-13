// src/userInterest.jsx
import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";  // ✅ use setDoc instead of updateDoc
import { useNavigate } from "react-router-dom";

// --- Tech Roadmap Templates ---
const techRoadmapTemplates = {
  "AI": {
    careers: ["AI Researcher", "ML Engineer", "Data Scientist"],
    skills: ["Python", "ML Algorithms", "TensorFlow/PyTorch"],
    courses: ["Coursera AI Courses", "Fast.ai", "YouTube tutorials"],
  },
  "Web Development": {
    careers: ["Front-End Developer", "Full-Stack Developer", "UI/UX Designer"],
    skills: ["HTML, CSS, JS", "React", "Node.js", "Git/GitHub"],
    courses: ["freeCodeCamp", "MDN Web Docs", "YouTube tutorials"],
  },
  "Mobile Development": {
    careers: ["Android Developer", "iOS Developer", "Flutter Developer"],
    skills: ["Java/Kotlin/Swift", "Flutter/Dart", "Firebase"],
    courses: ["Udemy Free Courses", "YouTube Tutorials"],
  },
  "Data Science": {
    careers: ["Data Analyst", "Data Engineer", "ML Engineer"],
    skills: ["Python", "SQL", "Statistics", "Pandas/Numpy"],
    courses: ["Kaggle Free Courses", "Coursera", "YouTube"],
  },
};

// --- Sports Roadmap Templates ---
const sportsRoadmapTemplates = {
  "Cricket": {
    careers: ["Professional Cricketer", "Coach", "Sports Analyst"],
    skills: ["Batting/Bowling/Fielding", "Fitness & Strategy"],
    courses: ["State Academy Programs", "Online Cricket Analysis Courses"],
  },
  "Football": {
    careers: ["Professional Footballer", "Fitness Coach", "Sports Journalist"],
    skills: ["Dribbling, Passing, Fitness", "Teamwork"],
    courses: ["AIFF Training Programs", "YouTube Skill Drills"],
  },
  "Badminton": {
    careers: ["Professional Badminton Player", "Coach", "Sports Physiotherapist"],
    skills: ["Agility, Stamina, Shot Accuracy"],
    courses: ["BWF Training Programs", "Fitness & Nutrition Courses"],
  },
  "Athletics": {
    careers: ["Sprinter", "Long-Distance Runner", "Fitness Trainer"],
    skills: ["Strength Training", "Endurance", "Discipline"],
    courses: ["Sports Authority of India Training", "Athletic Coaching Workshops"],
  },
};

// --- Roadmap Generator ---
const generateRoadmap = (name, educationLevel, techInterests, sportsInterests) => {
  let roadmap = `🎓 Career Roadmap for ${name}\n`;
  roadmap += `Current Education Level: ${educationLevel}\n\n`;

  switch (educationLevel) {
    case "10th":
      roadmap += `👉 Focus: Build strong foundation in Math, Science, Computers & Fitness.\n`;
      roadmap += `📘 Recommended: Basic coding + Sports practice + Logical reasoning.\n\n`;
      break;
    case "Intermediate":
      roadmap += `👉 Focus: Choose a stream (MPC/Science/Commerce/Arts) + continue sports if serious.\n`;
      roadmap += `📘 Recommended: Learn 1 programming language, explore web basics, maintain fitness.\n\n`;
      break;
    case "Undergraduate":
      roadmap += `👉 Focus: Specialize in CS/IT (DSA, OS, DBMS, AI, etc.) + College sports competitions.\n`;
      roadmap += `📘 Recommended: Projects, internships, hackathons + Inter-university sports.\n\n`;
      break;
    case "Postgraduate":
      roadmap += `👉 Focus: Research + Industry specialization + Coaching certifications for sports.\n`;
      roadmap += `📘 Recommended: Publications, advanced projects + Sports mentorship.\n\n`;
      break;
    default:
      roadmap += `👉 Focus: Explore your interests step by step.\n\n`;
  }

  // Tech Interests
  if (techInterests.length > 0) {
    roadmap += `💻 Technology Paths:\n`;
    techInterests.forEach((interest) => {
      const template = techRoadmapTemplates[interest] || {
        careers: ["Intern", "Freelancer"],
        skills: ["Basic skills"],
        courses: ["Free online resources"],
      };

      roadmap += `🔹 ${interest} Path:\n`;
      roadmap += `   Careers: ${template.careers.join(", ")}\n`;
      roadmap += `   Skills: ${template.skills.join(", ")}\n`;
      roadmap += `   Courses: ${template.courses.join(", ")}\n\n`;
    });
  }

  // Sports Interests
  if (sportsInterests.length > 0) {
    roadmap += `⚽ Sports Paths:\n`;
    sportsInterests.forEach((sport) => {
      const template = sportsRoadmapTemplates[sport] || {
        careers: ["Amateur Player", "Coach"],
        skills: ["Fitness", "Discipline"],
        courses: ["Local academies", "YouTube Training"],
      };

      roadmap += `🔹 ${sport} Path:\n`;
      roadmap += `   Careers: ${template.careers.join(", ")}\n`;
      roadmap += `   Skills: ${template.skills.join(", ")}\n`;
      roadmap += `   Training: ${template.courses.join(", ")}\n\n`;
    });
  }

  roadmap += `🚀 Dual Path Options:\n`;
  roadmap += `1. Pursue Tech Career + play sports recreationally (balanced).\n`;
  roadmap += `2. Focus on Sports Career + use Tech as backup.\n`;
  roadmap += `3. Merge both → Sports + Tech (e.g., Sports Analytics, Fitness Apps, AI in Sports).\n\n`;

  roadmap += `✅ Next Steps:\n`;
  roadmap += `- Build portfolio (GitHub for tech / tournaments for sports).\n`;
  roadmap += `- Join relevant communities.\n`;
  roadmap += `- Look for internships, academies, or coaching programs.\n`;

  return roadmap;
};

// --- Component ---
function UserInterest() {
  const [educationLevel, setEducationLevel] = useState("");
  const [techInterests, setTechInterests] = useState("");
  const [sportsInterests, setSportsInterests] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login first");

    const techArray = techInterests
      ? techInterests.split(",").map((i) => i.trim())
      : [];
    const sportsArray = sportsInterests
      ? sportsInterests.split(",").map((i) => i.trim())
      : [];

    const roadmap = generateRoadmap(
      user.displayName || "Student",
      educationLevel,
      techArray,
      sportsArray
    );

    // ✅ Save in StudentInterests collection (separate)
    await setDoc(doc(db, "StudentInterests", user.uid), {
      uid: user.uid,
      name: user.displayName || "Student",
      email: user.email,
      educationLevel,
      interests: techArray,
      sportsInterests: sportsArray,
      roadmap,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Tell Us About Yourself</h2>

        <label>Current Education</label>
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          required
        >
          <option value="">Select your education</option>
          <option value="10th">10th</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>

        <label>Technology Interests</label>
        <input
          type="text"
          placeholder="AI, Web Development"
          value={techInterests}
          onChange={(e) => setTechInterests(e.target.value)}
        />

        <label>Sports Interests</label>
        <input
          type="text"
          placeholder="Cricket, Football"
          value={sportsInterests}
          onChange={(e) => setSportsInterests(e.target.value)}
        />

        <button type="submit">Generate Roadmap</button>
      </form>
    </div>
  );
}

export default UserInterest;

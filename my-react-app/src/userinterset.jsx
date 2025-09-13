import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// --- Course Roadmap Templates ---
const courseRoadmapTemplates = {
  "B.A.": {
    industries: ["Education", "Journalism", "Public Sector", "NGOs"],
    govtExams: ["UPSC Civil Services", "SSC", "State PSC"],
    privateJobs: ["Content Writer", "HR Executive", "Marketing Executive"],
    entrepreneurship: ["Consultancy", "Content Creation", "NGO Setup"],
    higherEducation: ["M.A.", "MBA", "Journalism Studies", "Law (LLB)"],
  },
  "B.Sc.": {
    industries: ["Research", "Healthcare", "IT", "Laboratories"],
    govtExams: ["UPSC/State Exams", "ISRO/DRDO Jobs", "Banking Exams"],
    privateJobs: ["Lab Technician", "Data Analyst", "Software Developer"],
    entrepreneurship: ["Lab Services", "EdTech Startup", "Healthcare Services"],
    higherEducation: ["M.Sc.", "M.Tech.", "MBA", "PhD"],
  },
  "B.Com.": {
    industries: ["Finance", "Banking", "Accounting", "Taxation"],
    govtExams: ["CA", "CMA", "Bank PO Exams", "SSC Finance Posts"],
    privateJobs: ["Accountant", "Financial Analyst", "Auditor"],
    entrepreneurship: ["Accounting Firm", "Financial Consultancy"],
    higherEducation: ["M.Com.", "MBA Finance", "CA", "CFA"],
  },
  "BBA": {
    industries: ["Management", "Business Analytics", "Marketing", "HR"],
    govtExams: ["Banking Exams", "SSC", "UPSC (Management Trainee)"],
    privateJobs: ["Business Analyst", "Marketing Executive", "HR Coordinator"],
    entrepreneurship: ["Startup Founder", "Consultancy", "Digital Marketing"],
    higherEducation: ["MBA", "PGDM", "Certification Courses"],
  },
};

// --- Roadmap Generator ---
const generateCourseRoadmap = (name, degree) => {
  const template = courseRoadmapTemplates[degree];

  if (!template) {
    return `⚠️ No roadmap available for ${degree}`;
  }

  let roadmap = `🎓 Career Roadmap for ${name}\n`;
  roadmap += `Current Degree: ${degree}\n\n`;

  roadmap += `🏭 Industries: ${template.industries.join(", ")}\n`;
  roadmap += `📝 Govt Exams: ${template.govtExams.join(", ")}\n`;
  roadmap += `💼 Private Jobs: ${template.privateJobs.join(", ")}\n`;
  roadmap += `🚀 Entrepreneurship: ${template.entrepreneurship.join(", ")}\n`;
  roadmap += `📚 Higher Education: ${template.higherEducation.join(", ")}\n\n`;
  roadmap += `✅ Next Steps:\n- Explore courses, internships, and competitions.\n- Join relevant communities and forums.\n- Build a portfolio or certifications based on your career goal.`;

  return roadmap;
};

// --- Component ---
function UserCourseInterest() {
  const [degree, setDegree] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login first");

    const roadmap = generateCourseRoadmap(user.displayName || "Student", degree);

    // ✅ Save in Firestore
    await setDoc(doc(db, "StudentInterests", user.uid), {
      uid: user.uid,
      name: user.displayName || "Student",
      email: user.email,
      degree,
      roadmap,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Tell Us About Your Course</h2>

        <label>Current Degree</label>
        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
        >
          <option value="">Select your degree</option>
          <option value="B.A.">B.A.</option>
          <option value="B.Sc.">B.Sc.</option>
          <option value="B.Com.">B.Com.</option>
          <option value="BBA">BBA</option>
        </select>

        <button type="submit">Generate Roadmap</button>
      </form>
    </div>
  );
}

export default UserCourseInterest;

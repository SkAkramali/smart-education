import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./css/roadmap.css";

// Course templates
const courseRoadmapTemplates = {
  "B.A.": {
    industries: ["Education", "Journalism"],
    govtExams: ["UPSC"],
    privateJobs: ["Content Writer"],
    entrepreneurship: ["Consultancy"],
    higherEducation: ["M.A."],
  },
  "B.Sc.": {
    industries: ["Research", "Healthcare"],
    govtExams: ["GATE"],
    privateJobs: ["Lab Technician"],
    entrepreneurship: ["Lab Services"],
    higherEducation: ["M.Sc."],
  },
  "B.Com.": {
    industries: ["Finance", "Banking"],
    govtExams: ["CA"],
    privateJobs: ["Accountant"],
    entrepreneurship: ["Financial Consultancy"],
    higherEducation: ["M.Com"],
  },
  BBA: {
    industries: ["Management", "Marketing"],
    govtExams: ["SSC"],
    privateJobs: ["Business Analyst"],
    entrepreneurship: ["Startup Founder"],
    higherEducation: ["MBA"],
  },
  "B.Tech": {
    industries: ["Software", "Engineering"],
    govtExams: ["GATE"],
    privateJobs: ["Software Engineer"],
    entrepreneurship: ["Tech Startup"],
    higherEducation: ["M.Tech"],
  },
  BCA: {
    industries: ["IT", "Software Development"],
    govtExams: ["SSC IT"],
    privateJobs: ["Web Developer"],
    entrepreneurship: ["App Development Firm"],
    higherEducation: ["MCA"],
  },
  BAF: {
    industries: ["Finance", "Investment"],
    govtExams: ["CA"],
    privateJobs: ["Financial Analyst"],
    entrepreneurship: ["Investment Advisory"],
    higherEducation: ["M.Com"],
  },
  BMS: {
    industries: ["Management", "HR"],
    govtExams: ["SSC"],
    privateJobs: ["Business Analyst"],
    entrepreneurship: ["Consultancy"],
    higherEducation: ["MBA"],
  },
};

// Function to generate roadmap
const generateCourseRoadmap = (name, degree, education, answers) => {
  const template = courseRoadmapTemplates[degree];
  if (!template) return "⚠️ No roadmap available for your selection.";

  let roadmap = `🎓 Career Roadmap for ${name}\n\n`;
  roadmap += `Current Education: ${education}\n`;
  roadmap += `Recommended Degree: ${degree}\n\n`;

  roadmap += `🏭 Industries: ${template.industries.join(", ")}\n`;
  roadmap += `📝 Govt Exams: ${template.govtExams.join(", ")}\n`;
  roadmap += `💼 Private Jobs: ${template.privateJobs.join(", ")}\n`;
  roadmap += `🚀 Entrepreneurship: ${template.entrepreneurship.join(", ")}\n`;
  roadmap += `📚 Higher Education: ${template.higherEducation.join(", ")}\n\n`;

  roadmap += `✨ Based on your profile:\n`;
  Object.entries(answers).forEach(([key, value]) => {
    roadmap += `- ${key}: ${value}\n`;
  });

  roadmap += `\n✅ Next Steps:\n- Explore courses, internships, competitions.\n- Join professional communities.\n- Build portfolio/certifications.\n- Improve soft skills alongside academics.`;

  return roadmap;
};

function Roadmap() {
  const [roadmap, setRoadmap] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert("Please login first");
        return navigate("/signin");
      }

      try {
        const docRef = doc(db, "StudentInterests", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          alert("Please fill your interests first");
          return navigate("/user-interest");
        }

        const data = docSnap.data();
        const recommendedDegree = data.answers.interest;
        const education = data.answers.education;

        setRoadmap(
          generateCourseRoadmap(
            user.displayName || "Student",
            recommendedDegree,
            education,
            data.answers
          )
        );
      } catch (err) {
        console.error("Error fetching roadmap:", err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="roadmap-container">
      <pre>{roadmap}</pre>
    </div>
  );
}

export default Roadmap;

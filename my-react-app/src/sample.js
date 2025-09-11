const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Gemini API

admin.initializeApp();
const db = admin.firestore();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateCareerRecommendation = functions.firestore
  .document("students/{studentId}")
  .onCreate(async (snap, context) => {
    const student = snap.data();

    const prompt = `
    Student Info:
    - Education: ${student.currentEducation}
    - Interests: ${student.interests.join(", ")}
    - Other: ${student.other}

    Suggest 3 career options with a short roadmap for this student.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);

    await db.collection("students")
      .doc(context.params.studentId)
      .update({
        recommendation: result.response.text(),
      });
  });

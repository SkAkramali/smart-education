// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();
const db = admin.firestore();

const genAI = new GoogleGenerativeAI("AIzaSyCJBEs48ELvVR9Hpg0-Q2e9FK6LADEsugc");

exports.generateCareerRecommendation = functions.https.onCall(
  async (data, context) => {
    const uid = context.auth?.uid;
    if (!uid) {
      throw new functions.https.HttpsError("unauthenticated", "User must be logged in");
    }

    const studentDoc = await db.collection("students").doc(uid).get();
    if (!studentDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Student data not found");
    }

    const student = studentDoc.data();
    const name = student.name || "Unknown";
    const education = student.currentEducation || "Not specified";
    const interests = Array.isArray(student.interests) && student.interests.length > 0
      ? student.interests.join(", ")
      : "None";
    const other = student.other || "None";

    const prompt = `
      A student provided the following details:
      - Name: ${name}
      - Education: ${education}
      - Interests: ${interests}
      - Other: ${other}

      Provide 3-4 possible career paths and a roadmap for each in simple points.
      Respond ONLY in JSON format like:
      {
        "careers": [
          { "name": "Career Name", "roadmap": ["Step 1", "Step 2"] }
        ]
      }
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent({ prompt, temperature: 0.7 });

      // Safe extraction of AI text
      const text = response.output_text || 
                   (response.output && response.output[0]?.content[0]?.text) || 
                   JSON.stringify({ text: "No output from AI" });

      // Try parsing JSON, fallback to raw text
      let recommendations = { text };
      try {
        recommendations = JSON.parse(text);
      } catch (err) {
        console.warn("AI output is not valid JSON, returning raw text.");
      }

      await db.collection("students").doc(uid).update({
        recommendations,
        updatedAt: new Date(),
      });

      return { recommendations };
    } catch (error) {
      console.error("Error generating recommendation:", error);
      throw new functions.https.HttpsError("internal", "AI generation failed");
    }
  }
);

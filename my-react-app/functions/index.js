exports.generateCareerRoadmap = functions.firestore
  .document("Students/{studentId}") // ✅ collection name must match Firestore
  .onCreate(async (snap, context) => {
    const student = snap.data();
    console.log("Student created:", student); // Debug log

    const { name, interests } = student;
    const interestsStr = Array.isArray(interests) ? interests.join(", ") : "General";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Create a detailed career roadmap for a student named ${name}.
        Interests: ${interestsStr}.
        Provide:
        1. Recommended career paths
        2. Skills to learn (step-by-step)
        3. Courses/technologies to explore
        4. Example roles or jobs
      `;

      console.log("Prompt sent to AI:", prompt);

      const result = await model.generateContent(prompt);
      const roadmap = result.output?.[0]?.content?.[0]?.text || "No roadmap generated";

      await snap.ref.update({ roadmap });
      console.log("Roadmap saved:", roadmap);
    } catch (err) {
      console.error("Error generating roadmap:", err);
    }
  });

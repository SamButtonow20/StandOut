import express from "express";
import OpenAI from "openai";

const router = express.Router();

let openai;

router.post("/resume-feedback", async (req, res) => {
  try {
    if (!openai) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      console.log('OpenAI client initialized');
    }

    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: "Resume text is too short." });
    }

    const prompt = `
You are an expert career coach and resume writer. Please analyze the resume text below and provide:
1. Suggestions to improve clarity, professionalism, and impact.
2. Advice on formatting and language.
3. Tips to tailor the resume for tech jobs.

Resume:
${resumeText}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });

    const feedback = completion.choices[0].message.content;

    res.json({ feedback });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to get AI feedback." });
  }
});

export default router;

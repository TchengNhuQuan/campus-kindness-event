"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateEventDescription = async (keywords: string) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Could you help me write a description for an event base on these keywords ${keywords}. The description should be in vietnamese, concise, coherent, and should not be exceed 600 characters`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};

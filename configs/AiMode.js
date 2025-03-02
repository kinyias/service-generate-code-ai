const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};
const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

//   async function run() {
// const chatSession = model.startChat({
//   generationConfig,
//   history: [],
// });

const genAiCode = model.startChat({
  generationConfig: codeGenerationConfig,
  history: [],
});

module.exports = genAiCode;

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
//   }

//   run();

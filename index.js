const express = require('express');
const bodyParser = require('body-parser');
const genAiCode = require('./configs/AiMode'); // Adjust the path as necessary
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const port = 3000;
app.use(
  cors({
    origin: [process.env.APP_ORIGIN, process.env.APP_SECOND],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/gen-ai-code', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await genAiCode.sendMessage(prompt);
    const responseText = result.response.text();
    res.json(responseText);
  } catch (e) {
    console.log('Error at /api/gen-ai-code POST', e);
    res.status(500).send('Internal Server Error');
  }
});

// Express Routes
app.get('/', (req, res) => {
  res.send('Service is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

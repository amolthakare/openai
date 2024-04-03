const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: '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' });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/chat', async (req, res) => {
  const { userText } = req.body;

  try {
    const response = await getChatResponse(userText);
    res.json({ response });
  } catch (error) {
    throw error;
  }
});

const getChatResponse = async (userText) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: userText }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

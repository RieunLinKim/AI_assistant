import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'; // allow cross-origin requests

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to receive user queries and return Deepseek responses
app.post('/api/get-ai-message', async (req, res) => {
  const { userQuery } = req.body;

  try {
    // Call API (Deepseek R1)
    const deepseekResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-zero:free",
        messages: [
            {
                "role": "developer",
                "content": [
                  {
                    "type": "text",
                    "text": `
                      You are a helpful assistant for a company named PartSelect on their e-commerce website that answers questions about their product especially Refrigerator and Dishwasher parts. 
                      You should provide product information and assist with customer transactions.
                      You should remain focused on this specific use case for PartSelect, avoiding responses to questions outside this scope.
                      When responding, please provide your answer in clear, plain text or a numbered step-by-step guide if needed as you are explaining it to the customer.
                      `
                  }
                ]
              },
          {
            role: "user",
            content: userQuery
          }
        ]
      })
    });

    const deepseekData = await deepseekResponse.json();
    console.log('Deepseek API response:', deepseekData); // Log the API response for debugging

    const answer = deepseekData.choices?.[0]?.message?.content;
    res.json({
      role: "assistant",
      content: answer || "I couldn't find an answer, please try again."
    });
  } catch (error) {
    console.error('Error calling Deepseek:', error);
    res.status(500).json({
      role: "assistant",
      content: "Sorry, I encountered an error processing your request."
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
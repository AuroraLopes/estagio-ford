import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa o middleware cors

dotenv.config();

const app = express();
const port = 3000;

// Configura CORS para permitir requisições de qualquer origem (ou você pode restringir a origem específica se desejar)
app.use(cors());

app.use(express.json());

app.post('/chat', async (req, res) => {
  const apiKey = 'AIzaSyBTR59TBVfyB95L0uyRRbbXXvEXoN9vXzY'
  if (!apiKey) return res.status(500).json({ error: 'Chave da API não encontrada' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Altere para gpt-3.5-turbo
        messages: [{ role: 'user', content: req.body.message }],
      }),
    });
    
    if (!response.ok) throw new Error(await response.text());

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: `Erro ao chamar a API do OpenAI: ${error.message}` });
  }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

const express = require('express');

const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(express.static(__dirname));

app.post('/api/quiz', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'A chave da API Groq não foi configurada no servidor.' });
  }

  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  const count = Number(req.body?.count);

  if (!text) return res.status(400).json({ error: 'Informe o conteúdo da matéria.' });
  if (text.length > 30000) return res.status(400).json({ error: 'O conteúdo deve ter no máximo 30.000 caracteres.' });
  if (!Number.isInteger(count) || count < 1 || count > 5) {
    return res.status(400).json({ error: 'A quantidade de questões deve estar entre 1 e 5.' });
  }

  const prompt = `Com base estritamente no texto de referência, crie exatamente ${count} perguntas de múltipla escolha.
Cada pergunta deve ter quatro opções e apenas uma resposta correta.
Retorne um objeto JSON com a propriedade "questions", contendo uma lista neste formato:
{"questions":[{"pergunta":"Texto da pergunta?","opcoes":["Opção A","Opção B","Opção C","Opção D"],"correta":0}]}
"correta" é o índice da resposta certa, começando em 0.
Não inclua conteúdo que não seja sustentado pelo texto de referência.
Texto de referência:
${text}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Você cria quizzes educacionais. Siga o formato JSON solicitado e retorne somente JSON válido.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Erro da API Groq:', response.status, data?.error?.message || 'sem detalhes');
      return res.status(502).json({ error: 'A API Groq não conseguiu gerar o quiz. Verifique a chave, o modelo e os limites da conta.' });
    }

    const raw = data?.choices?.[0]?.message?.content;
    if (typeof raw !== 'string' || !raw.trim()) {
      return res.status(502).json({ error: 'A API Groq retornou uma resposta vazia.' });
    }

    const parsed = JSON.parse(raw);
    const questions = parsed.questions;
    const valid = Array.isArray(questions)
      && questions.length === count
      && questions.every(q =>
        typeof q.pergunta === 'string'
        && Array.isArray(q.opcoes)
        && q.opcoes.length === 4
        && q.opcoes.every(option => typeof option === 'string')
        && Number.isInteger(q.correta)
        && q.correta >= 0
        && q.correta < q.opcoes.length
      );

    if (!valid) return res.status(502).json({ error: 'A Groq retornou questões em formato inválido.' });
    return res.json({ questions });
  } catch (error) {
    console.error('Erro ao gerar quiz:', error.message);
    return res.status(502).json({ error: 'Não foi possível conectar à API Groq.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor disponível em http://localhost:${port}`);
});

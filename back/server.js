const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal del chat
app.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Pregunta requerida' });
    }

    // Aquí puedes integrar con tu API de IA preferida
    // Por ahora, simulamos una respuesta
    const response = await processChatQuestion(question);
    
    res.json({ response });
    
  } catch (error) {
    console.error('Error en chat:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Función para procesar la pregunta del chat
async function processChatQuestion(question) {
  try {
    if (!process.env.API_KEY) {
      throw new Error('API_KEY no configurada en .env');
    }

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.API_KEY}`
    };

    // Prompt idéntico al PHP
    const data = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "Soy Robit, y estoy aquí para acompañarte en cada paso de tu viaje hacia el éxito en la tecnología. ¡Juntos, conquistaremos el futuro!. Creado para el Codemotion por el equipo de Factoria F5. Factoría F5 Ofrecemos formación tecnológica intensiva, gratuita y de calidad en las competencias más demandadas del sector tech, junto con acompañamiento hacia la empleabilidad IT. Con presencia en Cataluña, Madrid, Asturias, la zona norte de España y la Comunidad Valenciana, impulsamos el talento digital."
        },
        {
          "role": "user", 
          "content": question
        }
      ]
    };

    // Hacer petición a OpenAI usando fetch nativo
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    
    return result.choices[0].message.content;

  } catch (error) {
    console.error('Error al procesar pregunta:', error);
    
    // Fallback a respuestas simuladas si hay error
    const fallbackResponses = [
      "¡Hola! Soy Robit, estyo fallando."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor AR Chat iniciado en puerto ${PORT}`);
  console.log(`📡 Endpoint del chat: http://localhost:${PORT}/chat`);
});

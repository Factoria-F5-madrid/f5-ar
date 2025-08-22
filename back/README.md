# Backend AR Chat - Factoría F5

Backend sencillo en Node.js para el chat AR

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo .env (copia .env.example)
cp .env.example .env

# Editar .env con tu API key
nano .env
```

## ⚙️ Configuración

### Variables de Entorno (.env)
```env
# API Key para el servicio de chat
API_KEY=tu_api_key_aqui

# Puerto del servidor
PORT=3000

# URL del servicio de chat externo (opcional)
EXTERNAL_CHAT_URL=https://webextendida.es/chatCodemotion.php
```

## 🏃‍♂️ Ejecutar

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

## 📡 Endpoints

### POST /chat
Enviar pregunta al chat:
```json
{
  "question": "¿Qué es la realidad aumentada?"
}
```

Respuesta:
```json
{
  "response": "La realidad aumentada es..."
}
```



## 🔧 Integración con APIs de IA

El backend está preparado para integrar con:

1. **OpenAI GPT** (descomenta el código en `server.js`)
2. **Claude** (descomenta el código en `server.js`)
3. **Cualquier API personalizada**

## 🔄 Cambiar URL en Frontend

En `front/js/ar-chat.js`, cambiar:
```javascript
// ANTES (PHP)
fetch('https://webextendida.es/chatCodemotion.php', {

// DESPUÉS (Node.js)
fetch('http://localhost:3000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'  // Cambiar a JSON
  },
  body: JSON.stringify({                 // Cambiar formato
    question: message
  })
})
```
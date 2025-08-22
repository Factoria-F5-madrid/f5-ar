/**
 * ar-chat.js
 * Lógica de chat asistido para experiencia AR
 * 
 * Este archivo maneja:
 * - Botones de animación del robot
 * - Chat con IA backend
 * - Reconocimiento de voz
 * - Síntesis de voz
 */

document.addEventListener("DOMContentLoaded", () => {
  // El HTML del chat ya está en el index.html, no necesitamos crearlo
  
  // Obtener referencias a los elementos del DOM
  const input = document.getElementById('ar-chat-input');
  const sendBtn = document.getElementById('ar-chat-send');
  const micBtn = document.getElementById('ar-chat-mic');
  const responseDiv = document.getElementById('ar-chat-response');

  // Configurar botones de animación del robot
  setupAnimationButtons();
  
  // Configurar funcionalidad del chat
  setupChatFunctionality();
  
  // Configurar reconocimiento de voz
  setupSpeechRecognition();
  
  // Reproducir animación idle al cargar la página
  if (window.playRobotAnimation) {
    window.playRobotAnimation('RobotArmature|Robot_Idle', 5000);
  }
});

/**
 * Configura los botones de animación del robot
 * Cada botón ejecuta una animación específica cuando se hace clic
 */
function setupAnimationButtons() {
  const animBtns = document.querySelectorAll('#ar-robot-anim-buttons button');
  
  animBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const anim = btn.getAttribute('data-anim');
      if (window.playRobotAnimation) {
        window.playRobotAnimation(anim);
      }
    });
  });
}

/**
 * Configura la funcionalidad principal del chat
 * Incluye envío de mensajes y manejo de respuestas
 */
function setupChatFunctionality() {
  const input = document.getElementById('ar-chat-input');
  const sendBtn = document.getElementById('ar-chat-send');
  const responseDiv = document.getElementById('ar-chat-response');

  // Manejar envío de mensajes
  sendBtn.addEventListener('click', function () {
    const message = input.value.trim();
    if (message) {
      // Reproducir animación de baile mientras procesa
      if (window.playRobotAnimation) {
        window.playRobotAnimation('RobotArmature|Robot_Dance');
      }
      
      // Mostrar estado de procesamiento
      responseDiv.textContent = 'Procesando...';
      
      // Enviar pregunta al backend de IA
      sendMessageToAI(message, responseDiv, input);
    }
  });
}

/**
 * Envía un mensaje al backend de IA y maneja la respuesta
 * @param {string} message - Mensaje del usuario
 * @param {HTMLElement} responseDiv - Elemento donde mostrar la respuesta
 * @param {HTMLElement} input - Input del chat para limpiarlo
 */
function sendMessageToAI(message, responseDiv, input) {
  fetch('https://webextendida.es/chatCodemotion.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'question=' + encodeURIComponent(message)
  })
  .then(response => response.text())
  .then(text => {
    // Limpiar input y mostrar respuesta
    input.value = '';
    
    // Reproducir animación de saludo
    if (window.playRobotAnimation) {
      window.playRobotAnimation('CharacterArmature|Jump');
    }
    
    // Mostrar respuesta y reproducir audio
    responseDiv.textContent = text;
    speak(text);
  })
  .catch((error) => {
    responseDiv.textContent = 'Ocurrió un error: ' + error.message;
  });
}

/**
 * Configura el reconocimiento de voz para el chat
 * Permite al usuario dictar mensajes en lugar de escribirlos
 */
function setupSpeechRecognition() {
  const micBtn = document.getElementById('ar-chat-mic');
  const input = document.getElementById('ar-chat-input');

  // Ocultar botón de micrófono en iOS (no compatible)
  if (isIOS()) {
    micBtn.style.display = 'none';
    micBtn.disabled = true;
    return;
  }

  // Verificar si el navegador soporta reconocimiento de voz
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    
    // Configurar reconocimiento de voz
    recognition.continuous = false;        // Solo una frase a la vez
    recognition.interimResults = false;   // Solo resultados finales
    recognition.lang = 'es-ES';           // Idioma español

    // Manejar resultado del reconocimiento
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
    };

    // Activar reconocimiento al hacer clic en el micrófono
    micBtn.addEventListener('click', function () {
      recognition.start();
    });
  } else {
    // Deshabilitar si no hay soporte
    micBtn.disabled = true;
    micBtn.title = "Tu navegador no soporta reconocimiento de voz";
  }
}

/**
 * Detecta si el dispositivo es iOS
 * iOS no soporta la Web Speech API de manera confiable
 * @returns {boolean} true si es iOS
 */
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Reproduce texto usando síntesis de voz
 * Convierte la respuesta de la IA en audio para mejor experiencia
 * @param {string} text - Texto a reproducir
 */
function speak(text) {
  if (!window.speechSynthesis) return;
  
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'es-ES';      // Idioma español
  utter.rate = 1.1;          // Velocidad ligeramente más rápida
  utter.pitch = 1;           // Tono normal
  
  window.speechSynthesis.speak(utter);
} 
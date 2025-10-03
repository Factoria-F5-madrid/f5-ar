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
      // OPCIÓN 1: Backend Node.js local (recomendado)
      // fetch('http://localhost:3000/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     question: message
      //   })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Limpiar input y mostrar respuesta
      //   input.value = '';
        
      //   // Reproducir animación de saludo
      //   if (window.playRobotAnimation) {
      //     window.playRobotAnimation('RobotArmature|Robot_Wave');
      //   }
        
      //   // Mostrar respuesta y reproducir audio
      //   responseDiv.textContent = data.response;
      //   speak(data.response);
      // })
      // .catch((error) => {
      //   responseDiv.textContent = 'Ocurrió un error: ' + error.message;
      // });

      // OPCIÓN 2: Backend PHP externo
      fetch('https://webextendida.es/chatRobitAR.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'question=' + encodeURIComponent(message)
      })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          // Manejo específico para diferentes códigos de error
          if (response.status === 429) {
            throw new Error('Límite de solicitudes excedido. Por favor, espera un momento y vuelve a intentar.');
          } else if (response.status === 401) {
            throw new Error('Error de autenticación. Verifica la configuración de la API.');
          } else if (response.status === 500) {
            throw new Error('Error interno del servidor. Inténtalo más tarde.');
          } else {
            throw new Error(`Error del servidor (${response.status}). Inténtalo más tarde.`);
          }
        }
        
        return response.text();
      })
      .then(text => {
        console.log('Response text:', text);
        
        // Intentar parsear como JSON por si hay errores
        try {
          const jsonResponse = JSON.parse(text);
          if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
          }
          // Si no hay error, usar el texto tal como viene
        } catch (e) {
          // Si no es JSON válido, continuar con el texto tal como viene
          console.log('Response is not JSON, using as plain text');
        }
        
        // Limpiar input y mostrar respuesta
        input.value = '';
        
        // Reproducir animación de saludo
        if (window.playRobotAnimation) {
          window.playRobotAnimation('RobotArmature|Robot_Wave');
        }
        
        // Mostrar respuesta y reproducir audio
        responseDiv.textContent = text;
        speak(text);
      })
      .catch((error) => {
        console.error('Error en fetch:', error);
        
        // Usar respuesta de fallback para errores de API
        const fallbackResponse = getFallbackResponse(message);
        responseDiv.textContent = fallbackResponse;
        
        // Reproducir animación de error
        if (window.playRobotAnimation) {
          window.playRobotAnimation('RobotArmature|Robot_Idle');
        }
        
        // Reproducir audio de la respuesta de fallback
        speak(fallbackResponse);
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

/**
 * Genera respuestas de fallback cuando la API no está disponible
 * @param {string} message - Mensaje del usuario
 * @returns {string} Respuesta de fallback
 */
function getFallbackResponse(message) {
  const messageLower = message.toLowerCase();
  
  // Respuestas específicas basadas en palabras clave
  if (messageLower.includes('hola') || messageLower.includes('saludar')) {
    return '¡Hola! Soy Robit, tu asistente virtual de Factoria F5. Aunque mi API principal no está disponible ahora, estoy aquí para ayudarte. ¿En qué puedo asistirte?';
  }
  
  if (messageLower.includes('factoria') || messageLower.includes('f5')) {
    return 'Factoria F5 ofrece formación tecnológica intensiva, gratuita y de calidad en las competencias más demandadas del sector tech, junto con acompañamiento hacia la empleabilidad IT. Tenemos presencia en Cataluña, Madrid, Asturias, la zona norte de España y la Comunidad Valenciana.';
  }
  
  if (messageLower.includes('programación') || messageLower.includes('programar') || messageLower.includes('código')) {
    return '¡Excelente! En Factoria F5 ofrecemos formación en programación en diferentes tecnologías como JavaScript, Python, Java, y muchas más. Nuestros cursos son intensivos, gratuitos y te preparan para el mercado laboral tech.';
  }
  
  if (messageLower.includes('trabajo') || messageLower.includes('empleo') || messageLower.includes('laboral')) {
    return 'En Factoria F5 no solo te formamos técnicamente, sino que también te acompañamos hacia la empleabilidad IT. Nuestro programa incluye preparación para entrevistas, creación de portfolio y conexión con empresas del sector.';
  }
  
  if (messageLower.includes('curso') || messageLower.includes('formación') || messageLower.includes('estudiar')) {
    return 'Nuestros cursos en Factoria F5 son intensivos, gratuitos y de alta calidad. Cubrimos las tecnologías más demandadas del sector tech y te acompañamos durante todo el proceso de aprendizaje y búsqueda de empleo.';
  }
  
  if (messageLower.includes('tecnología') || messageLower.includes('tech') || messageLower.includes('digital')) {
    return 'El sector tecnológico está en constante crecimiento y necesita talento. En Factoria F5 te formamos en las competencias más demandadas para que puedas acceder a este mercado laboral lleno de oportunidades.';
  }
  
  if (messageLower.includes('codemotion') || messageLower.includes('evento')) {
    return '¡Estamos en Codemotion! Es un placer estar aquí compartiendo nuestra pasión por la tecnología y la formación. Factoria F5 cree en democratizar el acceso a la educación tech de calidad.';
  }
  
  // Respuesta genérica para cualquier otra consulta
  return '¡Hola! Soy Robit de Factoria F5. Aunque mi sistema principal está temporalmente ocupado, puedo ayudarte con información básica sobre nuestros cursos de programación, formación gratuita y acompañamiento hacia la empleabilidad IT. ¿Hay algo específico que te gustaría saber?';
} 
// ar-chat.js
// Lógica de chat asistido para experiencia AR

document.addEventListener("DOMContentLoaded", () => {
  // Crear el contenedor del chat si no existe
  if (!document.getElementById('ar-chat-container')) {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ar-chat-container';
    chatContainer.style.position = 'absolute';
    chatContainer.style.bottom = '20px';
    chatContainer.style.right = '20px';
    chatContainer.style.width = '320px';
    chatContainer.style.background = 'rgba(255, 71, 0, 0.70)';
    chatContainer.style.borderRadius = '10px';
    chatContainer.style.boxShadow = '0 2px 8px #0003';
    chatContainer.style.padding = '16px';
    chatContainer.style.zIndex = '10';
    chatContainer.innerHTML = `
      <textarea id="ar-chat-input" rows="2" style="width: 100%; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; background: #fff; color: #222;"></textarea>
      <div style="margin-top: 8px; display: flex; gap: 8px;">
        <button id="ar-chat-mic" class="ar-chat-btn">🎙️</button>
        <button id="ar-chat-send" class="ar-chat-btn">Enviar</button>
      </div>
      <div id="ar-chat-response" style="margin-top: 12px; min-height: 24px; max-height: 120px; overflow-y: auto; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; font-size: 1.05em; color: #222;"></div>
    `;
    document.body.appendChild(chatContainer);

    // Agregar estilos para los botones
    const style = document.createElement('style');
    style.textContent = `
      .ar-chat-btn {
        background: #fff;
        color: #ff4700;
        border: none;
        border-radius: 6px;
        padding: 8px 16px;
        font-size: 1em;
        font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        box-shadow: 0 1px 3px #0001;
      }
      .ar-chat-btn:hover {
        background: #ff4700;
        color: #fff;
        box-shadow: 0 2px 8px #0002;
      }
    `;
    document.head.appendChild(style);
  }

  const input = document.getElementById('ar-chat-input');
  const sendBtn = document.getElementById('ar-chat-send');
  const micBtn = document.getElementById('ar-chat-mic');
  const responseDiv = document.getElementById('ar-chat-response');

  // Animación idle al cargar la página
  if (window.playRobotAnimation) window.playRobotAnimation('RobotArmature|Robot_Idle', 5000);

  // Enviar pregunta al backend IA
  sendBtn.addEventListener('click', function () {
    const message = input.value.trim();
    if (message) {
      if (window.playRobotAnimation) window.playRobotAnimation('RobotArmature|Robot_Dance');
      responseDiv.textContent = 'Procesando...';
      fetch('https://webextendida.es/chatCodemotion.php?question=' + encodeURIComponent(message))
        .then(response => response.text())
        .then(text => {
          input.value = '';
          if (window.playRobotAnimation) window.playRobotAnimation('RobotArmature|Robot_Wave');
          responseDiv.textContent = text;
          speak(text);
        })
        .catch((error) => {
          responseDiv.textContent = 'Ocurrió un error: ' + error.message;
        });
    }
  });

  // Reconocimiento de voz
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
    };

    micBtn.addEventListener('click', function () {
      recognition.start();
    });
  } else {
    micBtn.disabled = true;
    micBtn.title = "Tu navegador no soporta reconocimiento de voz";
  }

  // Síntesis de voz
  function speak(text) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'es-ES';
    utter.rate = 1.1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }
}); 
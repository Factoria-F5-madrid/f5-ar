## 🏗️ **Proyecto**

### 🎯 Descripción

La experiencia AR con Factoría F5 es una aplicación web de realidad aumentada que permite a los usuarios:
- Escanear un sticker de F5 para activar contenido 3D
- Interactuar con un robot 3D animado
- Chatear con texto y en modo voz
- Controlar animaciones del robot mediante botones o comandos de voz

### ✨ Características Principales

🎮 Realidad Aumentada
- **Escaneo de imagen objetivo** usando MindAR
- **Modelos 3D interactivos** (robot y logo F5)
- **Botones de animación** para control directo

🤖 Animaciones del Robot
- 👋 **Saludar** - Animación de saludo
- 💃 **Bailar** - Movimiento de baile
- 👍 **Like** - Pulgar hacia arriba
- 🤸 **Saltar** - Movimiento de salto
- 😴 **Idle** - Estado de reposo

💬 Sistema de Chat IA
- **Interfaz de chat**
- **Reconocimiento de voz** (español) (API del navegador)
- **Síntesis de voz** para respuestas (API del navegador)
- **Integración con backend de IA**

### 🏗️ Arquitectura del Proyecto

```
f5-ar/
├── index.html             # Punto de entrada HTML principal
├── css/
│   └── style.css          # Estilos con variables CSS
├── js/                    # Scripts JavaScript
│   ├── main.js           # Lógica principal de AR (MindAR + Three.js)
│   ├── ar-chat.js        # Sistema de chat con IA y animaciones
│   ├── loader.js         # Utilidades de carga de modelos 3D
│   ├── GLTFLoader.js     # Cargador de modelos GLTF/GLB
│   └── mindar-image-three.prod.js  # Librería MindAR compilada
├── assets/               # Modelos 3D y recursos AR
│   ├── robot.glb         # Modelo del robot con animaciones
│   ├── f5.gltf          # Logo de F5
│   ├── targets.mind     # Marcadores AR compilados
│   ├── targets.png      # Imagen de los marcadores AR
│   └── sticker-qrs.pdf  # PDF con códigos QR para marcadores
├── img/                  # Imágenes del proyecto
│   ├── demo.png         # Imagen de demostración
│   └── inmersivetechs.jpg # Logo de Inmersive Techs
├── back/                 # Backend Node.js
│   ├── server.js        # Servidor Express con OpenAI
│   ├── package.json     # Dependencias Node.js
│   ├── package-lock.json # Lock file de dependencias
│   └── README.md        # Documentación del backend
├── Presentation.md       # Documentación de presentación
├── Presentation.pdf      # PDF de presentación
└── README.md            # Este archivo de documentación
```

### 🔄 Flujo de Datos

```
Usuario → Frontend AR → Backend → OpenAI API → Respuesta IA → Chat AR
```

### 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **AR**: MindAR (web-based AR framework)
- **3D**: Three.js (integrado en MindAR)
- **Backend**: Node.js + Express
- **IA**: OpenAI GPT-3.5-turbo
- **Comunicación**: REST API + Web Speech API

## 🚀 **Implementación y Uso**

### 🚀 Instalación

**Prerrequisitos:**
- Navegador web moderno con soporte para WebGL
- Dispositivo con cámara 
- Conexión a internet para el chat IA

**Pasos de Instalación:**

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd f5-ar
   ```

2. **Configurar el servidor web**
   - Usar un servidor HTTP local (Live Server de VS Code, Python http.server, etc.)
   - **Importante**: No abrir directamente el `index.html` en el navegador
   - La aplicación requiere un servidor web para funcionar correctamente

3. **Acceder a la aplicación**
   - Abrir `http://localhost:[puerto]/index.html`
   - Permitir acceso a la cámara cuando se solicite

### 📱 Uso

**1. Activación de AR**
- Abrir la aplicación en el navegador
- Permitir acceso a la cámara cuando se solicite
- Apuntar la cámara al sticker/marcador de F5
- Esperar a que se detecte la imagen objetivo
- El robot 3D aparecerá superpuesto en el marcador

**2. Interacción con el Robot**
- **Botones de animación**: Usar los botones en la interfaz para activar diferentes animaciones del robot
- **Chat de texto**: Escribir preguntas en el campo de texto del chat
- **Reconocimiento de voz**: Tocar el botón 🎙️ para dictar mensajes
- **Respuestas de IA**: Las respuestas se muestran en texto y se reproducen automáticamente en voz
- **Síntesis de voz**: Las respuestas se convierten automáticamente en audio

**3. Funcionalidades del Chat**
- **Respuestas inteligentes**: El robot responde preguntas sobre Factoria F5, programación y tecnología
- **Fallback offline**: Si la API de IA no está disponible, usa respuestas predefinidas
- **Animaciones sincronizadas**: Las animaciones del robot se coordinan con las respuestas

![Ejemplo de uso](img/demo.png)

## 📚 Recursos y Herramientas

### 🛠️ Tecnologías Utilizadas

Frontend
- **HTML5** - Estructura de la aplicación
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Lógica de la aplicación

Realidad Aumentada
- **[MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)** - Framework de AR basado en web. 
- **[Three.js Documentation](https://threejs.org/docs/)** - Librería que facilita el uso de gráficos en 3D
- **[WebGL](https://get.webgl.org/)** - API de JavaScript que permite renderizar gráficos 2D y 3D directamente en el navegador

IA y Voz
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** - Reconocimiento y síntesis de voz
- **Fetch API** - Comunicación con backend de IA
- **IA** - API de ChatGPT

Modelos 3D
- **GLTF/GLB** - Formato estándar para modelos 3D
- **[Poly Pizza](https://poly.pizza/)** - Modelos 3D gratuitos y de calidad
- **[TurboSquid](https://www.turbosquid.com/)** - Biblioteca profesional (algunos gratuitos)
- **[Sketchfab](https://sketchfab.com/)** - Comunidad y modelos gratuitos
- [Luma.ai](https://lumalabs.ai/) - IA generativa, rápido (Calidad variable)
- [3d.csm.ai](https://3d.csm.ai/) - Texto a 3D, gratuito (Limitaciones de resolución)

### 🛠️  Más recursos interesantes

**[Model Viewer](https://modelviewer.dev/): Visualización Web** Una excelente opción para visualizar modelos 3D en la web:

**Frameworks muy potente de JS**: [Babylon.js](https://babylonjs.com/) - Alternativa moderna a Three.js

**[Android XR](https://www.android.com/xr/)** - Plataforma oficial de Google para experiencias inmersivas

## 🎯 Taller

- **Haz tu experiencia AR y disfruta explorando 🤖 ⭐️**

### 1. Crear Marcador AR
- Ve a: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
- Sube una imagen de alta calidad (recomendado: 512x512px o mayor)
- Descarga el archivo `targets.mind` generado
- Colócalo en `assets/targets.mind`

### 2. Estructura del Proyecto
- **JavaScript**: `js/main.js` → `js/loader.js` → `js/GLTFLoader.js`
- **Chat**: `js/ar-chat.js` maneja la interfaz de chat y animaciones
- **MindAR**: `js/mindar-image-three.prod.js` incluye su propia versión optimizada de Three.js
- **CSS**: `css/style.css` con variables CSS para colores y estilos
- **HTML**: `index.html` con estructura semántica y chat AR integrado

### 3. Modelo 3D con Animaciones
- Selecciona un modelo GLB/GLTF con animaciones
- Recomendado: https://poly.pizza/m/1gNo5ezvmr
- Guárdalo en `assets/` como `robot.glb`
- El `js/main.js` ya está configurado para cargarlo automáticamente
- **Importante**: Si cambias el nombre del archivo, actualiza la ruta en `js/main.js`

### 4. Botones de Animación
- **Consola**: El `js/main.js` muestra las animaciones disponibles al cargar
- **HTML**: Los botones ya están configurados en `index.html`
- **Funcionalidad**: `js/ar-chat.js` está conectado para reproducir animaciones
- **Personalización**: Puedes modificar los botones según las animaciones de tu modelo

### 5. Personalización Adicional (Opcional)
- **Colores**: Modifica las variables CSS en `css/style.css` en la sección `:root`
- **Modelos**: Agrega más modelos 3D al proyecto en `assets/`
- **Animaciones**: Personaliza los botones según tu modelo en `js/ar-chat.js`
- **Chat**: Modifica `js/ar-chat.js` para más interacciones y respuestas de fallback

### 6. Conexión con el Backend

#### **Opción A: Backend Node.js Local (Recomendado)**
```bash
# 1. Instalar dependencias
cd back
npm install

# 2. Configurar variables de entorno
# Crear archivo .env con tu API key de OpenAI
echo "OPENAI_API_KEY=tu_api_key_aqui" > .env

# 3. Ejecutar servidor
npm run dev
```

**Configuración del Frontend:**
- En `js/ar-chat.js`, descomenta la opción 1 (backend Node.js local)
- Comenta la opción 2 (backend PHP externo)

**Ventajas**: Control total, debugging fácil, desarrollo local

### 7. Optimización del Agente IA

#### **🚨 Limitaciones del Sistema Actual**
- **Modelo**: GPT-3.5-turbo (chat/completions)
- **Problema**: Solo acepta texto en el prompt
- **Limitación**: Para PDFs, CSVs o archivos, debes "pegar" todo el contenido
- **Consecuencia**: Muy ineficiente y costoso

#### **🚀 Mejoras Recomendadas**

**Opciones de IA:**
- **Grok** (más económico y con prueba gratuita): https://grok.com/
- **OpenAI Assistants API** (GPT-4 + archivos)
- **Vector Store** (para muchos documentos)
- **Function Calling** (APIs externas)

**Y por supuesto... ¡apuntarse a un Bootcamp de F5!** 🚀 



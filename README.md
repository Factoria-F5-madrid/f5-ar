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
- **Reconocimiento de voz** (español) 
- **Síntesis de voz** para respuestas
- **Integración con backend de IA**

### 🏗️ Arquitectura del Proyecto

```
f5-ar/
├── front/                  # Frontend AR (experiencia principal)
│   ├── index.html         # Punto de entrada HTML
│   ├── css/
│   │   └── style.css      # Estilos con variables CSS
│   ├── js/
│   │   ├── main.js        # Lógica principal de AR (MindAR + Three.js)
│   │   ├── ar-chat.js     # Sistema de chat y animaciones
│   │   ├── loader.js      # Utilidades de carga de modelos 3D
│   │   └── GLTFLoader.js  # Cargador de modelos GLTF/GLB
│   └── assets/            # Modelos 3D y recursos
│       ├── robot.glb      # Modelo del robot con animaciones
│       ├── f5.gltf        # Logo de F5
│       └── targets.mind   # Marcadores AR compilados
├── back/                   # Backend Node.js
│   ├── server.js          # Servidor Express con OpenAI
│   ├── package.json       # Dependencias Node.js
│   ├── .env               # Variables de entorno (API keys)
│   └── README.md          # Documentación del backend
└── front2/                 # Versión alternativa del frontend
    ├── index.html         # Variante con diferentes colores
    ├── css/
    │   └── style.css      # Estilos con esquema de colores alternativo
    └── js/                # Mismos archivos JS que front/
```

### 🔄 Flujo de Datos

```
Usuario → Frontend AR → Backend Node.js → OpenAI API → Respuesta IA → Chat AR
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

Prerrequisitos
- Navegador web moderno con soporte para WebGL
- Dispositivo con cámara (móvil recomendado)
- Conexión a internet para el chat IA

Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd f5-ar
   ```

2. **Servir los archivos**: Con el Visual code o similar montar un server y abrir el index

### 📱 Uso

1. Activación de AR
- **Abrir la aplicación** 
- **Permitir acceso a la cámara**
- **Apuntar la cámara** al sticker de F5
- **Esperar a que se detecte** la imagen objetivo

2. Interacción con el Robot
- **Botones de animación**: Usar los botones en el chat para activar animaciones
- **Chat de texto**: Escribir preguntas en el campo de texto
- **Reconocimiento de voz**: Tocar el botón 🎙️ para hablar
- **Respuestas de IA**: Las respuestas se muestran en texto y se reproducen en voz

![Ejemplo](img/demo.png)

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

## 🎯 TODO

- **Haz tu experiencia AR y disfruta explorando 🤖 ⭐️**

### 1. Crear Marcador AR
- Ve a: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
- Sube una imagen de alta calidad (recomendado: 512x512px o mayor)
- Descarga el archivo `targets.mind` generado
- Colócalo en `front/assets/targets.mind`

### 2. Estructura del Proyecto
- **JavaScript**: `main.js` → `loader.js` → `GLTFLoader.js`
- **MindAR**: Incluye su propia versión optimizada de Three.js
- **CSS**: Variables CSS para colores y estilos
- **HTML**: Estructura semántica con chat AR integrado

### 3. Modelo 3D con Animaciones
- Selecciona un modelo GLB/GLTF con animaciones
- Recomendado: https://poly.pizza/m/1gNo5ezvmr
- Guárdalo en `front/assets/` como `robot.glb`
- El `main.js` ya está configurado para cargarlo automáticamente
- **Importante**: Si cambias el nombre del archivo, actualiza la ruta en `main.js`

### 4. Botones de Animación
- **Consola**: El `main.js` muestra las animaciones disponibles al cargar
- **HTML**: Los botones ya están configurados en `index.html`
- **Funcionalidad**: `ar-chat.js` está conectado para reproducir animaciones
- **Personalización**: Puedes modificar los botones según las animaciones de tu modelo

### 5. Personalización Adicional (Opcional)
- **Colores**: Modifica las variables CSS en `:root`
- **Modelos**: Agrega más modelos 3D al proyecto
- **Animaciones**: Personaliza los botones según tu modelo
- **Chat**: Modifica `ar-chat.js` para más interacciones

### 6. Conexión con el Backend

#### **Opción A: Backend Node.js Local (Recomendado)**
```bash
# 1. Instalar dependencias
cd back
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu API key de OpenAI

# 3. Ejecutar servidor
npm run dev
```

**Ventajas**: Control total, debugging fácil, desarrollo local

### 7. Optimización del Agente IA

#### **🚨 Limitaciones del Sistema Actual**
- **Modelo**: GPT-3.5-turbo (chat/completions)
- **Problema**: Solo acepta texto en el prompt
- **Limitación**: Para PDFs, CSVs o archivos, debes "pegar" todo el contenido
- **Consecuencia**: Muy ineficiente y costoso

#### **🚀 Mejoras Recomendadas**

##### **Opción 1: Assistants API (Recomendado)**
- **Nueva API de OpenAI** diseñada específicamente para crear agentes
- **Soporte nativo** para cargar archivos (PDFs, CSVs, textos)
- **Modelo más avanzado**: GPT-4 en lugar de GPT-3.5
- **Contexto persistente** entre conversaciones
- **Herramientas integradas** como búsqueda en archivos

##### **Opción 2: File Upload + Referencia**
- **Subir archivos** al endpoint `/v1/files` de OpenAI
- **Obtener file_id** que identifica el archivo
- **Referenciar el archivo** en cada conversación sin enviarlo completo
- **Reducir costos** significativamente al no repetir contenido

##### **Opción 3: Vector Store (Para Muchos Archivos)**
- **Ideal para proyectos grandes**: 100+ PDFs o documentos muy extensos
- **Búsqueda inteligente**: El motor recupera solo los fragmentos relevantes
- **Vector store ID**: Una vez creado, se reutiliza para todas las consultas
- **Máxima eficiencia**: No adjuntas archivos completos en cada petición
- **Escalabilidad**: Perfecto para bases de conocimiento extensas

##### **Opción 4: Function Calling (Llamadas a APIs)**
- **Conectar con sistemas externos**: CRM, bases de datos, APIs de terceros
- **Datos en tiempo real**: Información actualizada al momento
- **Acciones automatizadas**: Crear tickets, enviar emails, actualizar registros
- **Integración completa**: El chatbot puede realizar tareas reales
- **Ejemplos para F5**: Consultar disponibilidad de cursos, inscribir estudiantes, obtener horarios


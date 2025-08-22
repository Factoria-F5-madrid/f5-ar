// Función para cargar el modelo 3D desde el archivo loader.js
import { loadGLTF } from "./loader.js";

// MindAR incluye su propia versión de THREE.js optimizada para AR
// Esta versión está probada y optimizada para funcionar con detección de imágenes
const THREE = window.MINDAR.IMAGE.THREE;

// Esperar a que el DOM esté completamente cargado antes de inicializar
document.addEventListener("DOMContentLoaded", () => {
  
  // Función principal que inicializa toda la experiencia AR
  const start = async () => {
    // Inicializar MindAR con configuración de imagen objetivo
    // Documentación: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "./assets/targets.mind", // Archivo compilado de targets
    });

    // Extraer componentes principales de MindAR
    const { renderer, scene, camera } = mindarThree;

    // Configurar sistema de iluminación para mejor renderizado 3D
    // Luz ambiental hemisférica (simula iluminación del cielo)
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Luz direccional principal (simula el sol)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 4, 2);
    dirLight.castShadow = true; // Habilitar sombras para esta luz
    scene.add(dirLight);

    // Luz puntual cálida cerca del robot (efecto de acento)
    const pointLight = new THREE.PointLight(0xffaa55, 0.5, 5);
    pointLight.position.set(0, 1, 2);
    scene.add(pointLight);

    // Luz de relleno suave para eliminar sombras duras
    const fillLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(fillLight);

    // Cargar y configurar el modelo 3D del robot
    const robot = await loadGLTF("./assets/robot.glb");
    
    // Configurar propiedades del robot
    robot.scene.scale.set(0.8, 0.8, 0.8); // Escalar el robot
    robot.scene.position.set(0, 0, 0);      // Posicionar en el centro
    robot.scene.rotation.set(.7, 0, 0);     // Rotar ligeramente hacia adelante
    
    // Habilitar sombras en todas las mallas del robot
    robot.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;      // El robot proyecta sombras
        child.receiveShadow = true;   // El robot recibe sombras
      }
    });
    
    // Configurar renderizado de sombras
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sombras suaves

    // Crear ancla AR y agregar ambos modelos
    // El ancla 0 corresponde al primer target definido en targets.mind
    const logosAnchor = mindarThree.addAnchor(0);
    logosAnchor.group.add(robot.scene);

    // Crear reloj para controlar animaciones
    const clock = new THREE.Clock();

    // Preparar sistema de animaciones para el robot
    const mixer = new THREE.AnimationMixer(robot.scene);
    const clips = robot.animations; // Array de AnimationClip disponibles
    
    // Log de animaciones disponibles para debugging
    console.log('Animaciones disponibles:', clips.map(c => c.name));

    // Función para reproducir animaciones del robot
    // Se expone globalmente para que el chat pueda controlarla
    function playAnimation(name, duration = 2000) {
      console.log('Intentando reproducir animación:', name);
      
      // Buscar la animación por nombre
      const clip = THREE.AnimationClip.findByName(clips, name);
      if (clip) {
        const action = mixer.clipAction(clip);
        action.reset().play(); // Reiniciar y reproducir
        
        // Detener animación después del tiempo especificado
        setTimeout(() => action.stop(), duration);
        console.log('Animación reproducida:', name);
      } else {
        console.warn('No se encontró la animación:', name);
      }
    }
    
    // Exponer la función globalmente para el chat
    window.playRobotAnimation = playAnimation;

    // Iniciar MindAR
    await mindarThree.start();
    
    // Bucle de renderizado principal (se ejecuta cada fotograma)
    renderer.setAnimationLoop(() => {
      // Calcular delta time para animaciones suaves
      const delta = clock.getDelta();
      
      // Actualizar animaciones del robot
      mixer.update(delta);
      
      // Renderizar la escena
      renderer.render(scene, camera);
    });
  };

  // Iniciar la experiencia AR
  start();
});

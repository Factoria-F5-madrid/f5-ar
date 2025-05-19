import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  // Crear y mostrar el mensaje en la parte superior con el estilo del input del chat
  const mensaje = document.createElement('div');
  mensaje.textContent = 'Escanea el sticker de F5';
  mensaje.style.position = 'fixed';
  mensaje.style.top = '0';
  mensaje.style.left = '0';
  mensaje.style.width = '100%';
  mensaje.style.background = 'rgba(255, 71, 0, 0.7)';
  mensaje.style.color = '#fff';
  mensaje.style.textAlign = 'center';
  mensaje.style.padding = '6px 0';
  mensaje.style.fontFamily = "'Segoe UI', Arial, Helvetica, sans-serif";
  mensaje.style.fontSize = '1em';
  mensaje.style.zIndex = '9999';
  document.body.appendChild(mensaje);

  const start = async () => {
    //https://hiukim.github.io/mind-ar-js-doc/tools/compile/
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "./targets.mind",
    });

    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Luz direccional (simula el sol)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 4, 2);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Luz puntual cerca del robot
    const pointLight = new THREE.PointLight(0xffaa55, 0.5, 5);
    pointLight.position.set(0, 1, 2);
    scene.add(pointLight);

    // Luz de relleno suave
    const fillLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(fillLight);

    const robot = await loadGLTF("./assets/robot.glb");
    robot.scene.scale.set(0.2, 0.2, 0.2);
    robot.scene.position.set(0, 0, 0);
    robot.scene.rotation.set(.7, 0, 0);
    // Habilitar sombras en el robot
    robot.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const f5 = await loadGLTF("./assets/f5.gltf");
    f5.scene.scale.set(2, 2, 2);
    f5.scene.position.set(0.3, 1, 0);

    // Unes imagen con ancla
    const logosAnchor = mindarThree.addAnchor(0);
    logosAnchor.group.add(robot.scene);
    logosAnchor.group.add(f5.scene);

    const clock = new THREE.Clock();

    // Preparar animaciones para el robot
    const mixer = new THREE.AnimationMixer(robot.scene);
    const clips = robot.animations; // Array de AnimationClip
    console.log('Animaciones disponibles:', clips.map(c => c.name));

    function playAnimation(name, duration = 2000) {
      console.log('Intentando reproducir animación:', name);
      const clip = THREE.AnimationClip.findByName(clips, name);
      if (clip) {
        const action = mixer.clipAction(clip);
        action.reset().play();
        setTimeout(() => action.stop(), duration);
        console.log('Animación reproducida:', name);
      } else {
        console.warn('No se encontró la animación:', name);
      }
    }
    // Exponer la función globalmente para el chat
    window.playRobotAnimation = playAnimation;

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      // En bucle cada fotograma
      const delta = clock.getDelta();
      mixer.update(delta); // Actualizar animaciones
      renderer.render(scene, camera);
    });
  };

  start();
});

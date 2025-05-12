import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    //https://hiukim.github.io/mind-ar-js-doc/tools/compile/
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "./targets2.mind",
    });

    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const robot = await loadGLTF("./assets/robot.glb");
    robot.scene.scale.set(0.01, 0.01, 0.01);
    robot.scene.position.set(0, 0, 0);
    robot.scene.rotation.set(0, -1.3, 0);

    const f5 = await loadGLTF("./assets/f5.gltf");
    f5.scene.scale.set(2, 2, 2);
    f5.scene.position.set(0.3, 0.5, 0.4);

    // Unes imagen con ancla
    const logosAnchor = mindarThree.addAnchor(0);
    logosAnchor.group.add(robot.scene);
    logosAnchor.group.add(f5.scene);

    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      // En bucle cada fotograma
      const delta = clock.getDelta();
      console.log(delta);

      renderer.render(scene, camera);
    });
  };

  start();
});

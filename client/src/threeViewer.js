import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initViewer(container, url){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth/container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xa3a3a3);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(3,5,2);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    //controls.autoRotate = true;

    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    camera.position.set(2,0,7);
    camera.lookAt(0,0,0);

    let variants = [];

    let model;
    const loader = new GLTFLoader();
    loader.load(url,
        (gltf) => {
            model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            scene.add(model);
            variants = [...model.children].sort((x,y) => x.name.localeCompare(y.name));
            showVariant(0);
        },
        undefined,
        (err) => console.error(err)
    );

    function animate(time){
        controls.update(); // orbitcontrol damping켰으니까 필요
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);


    function showVariant(idx) {
        if (!model) return;
        model.children.forEach((child) => {
            child.visible = (child === variants[idx]);
        });
    }

    return {
        cleanup: () => {
            renderer.setAnimationLoop(null);
            controls.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
            console.log("dump");
        },
        showVariant: (idx) => showVariant(idx)
    }
}

/*
model.traverse((child) => {
    if (child.isMesh){
        //child.material = material;
    } 
}); 
*/
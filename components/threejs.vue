<template>
    <div class="canvas_container" ref="canvasContainer">
        <canvas ref="canvas"/>
    </div>
</template>

<style>
.canvas_container{
    width: 100%;
}
</style>
  
<script setup>
import { ref, toRefs, onMounted, onUpdated, onBeforeUnmount } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

const props = defineProps({
    boitier_texture : String,
    boitier_forme : String,
    bracelet_texture : String,
    pierre : String,
    main_color : String,
})

const proprietes = toRefs(props)
  
const canvasContainer = ref(null);
const canvas = ref(null);
let controls, scene, camera, renderer, animationId = null;
let clock = new THREE.Clock();
let aiguilleHeures,
    aiguilleMinutes,
    aiguilleSecondes,
    forme,
    pierre,
    bracelet,
    fermoir,
    bouton;
  
const initScene = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const width = canvasContainer.value.clientWidth;
    const height = canvasContainer.value.clientWidth/2;
  
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
    // renderer.setSize(1300, 700);
    renderer.setSize(width, height);
    renderer.setClearColor(0x222222, 1);
    controls = new OrbitControls(camera, renderer.domElement);

    const textureLoaderScene = new THREE.TextureLoader();
    scene.background = textureLoaderScene.load(`/images/fond.jpg`);
  
    var loader = new ColladaLoader();
    loader.load("/models/montre.dae", onLoaded, onProgress, onError);
};
  
const updateClockHands = () => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    const hoursRotation = (hours + minutes / 60) * (Math.PI / 6);
    const minutesRotation = (minutes + seconds / 60) * (Math.PI / 30);
    const secondsRotation = seconds * (Math.PI / 30);
  
    if (aiguilleHeures) aiguilleHeures.rotation.z = -hoursRotation;
    if (aiguilleMinutes) aiguilleMinutes.rotation.z = -minutesRotation;
    if (aiguilleSecondes) aiguilleSecondes.rotation.z = -secondsRotation;
};
  
const animate = () => {
    let dt = clock.getDelta();
    updateClockHands();
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
  
function onLoaded(collada) {
    let objects = collada.scene;
  
    aiguilleHeures = objects.getObjectByName("aiguille_heures");
    aiguilleHeures.material = new THREE.MeshBasicMaterial({
        color: proprietes.main_color.value,
    });

    aiguilleMinutes = objects.getObjectByName("aiguille_minutes");
    aiguilleMinutes.material = new THREE.MeshBasicMaterial({
        color: proprietes.main_color.value,
    });

    aiguilleSecondes = objects.getObjectByName("aiguille_secondes");
    aiguilleSecondes.material = new THREE.MeshBasicMaterial({
        color: proprietes.main_color.value,
    });
  
    if (proprietes.boitier_forme.value == "boitier_rond"){
        forme = objects.getObjectByName("boitier_rond");
    } else if (proprietes.boitier_forme.value == "boitier_carre"){
        forme= objects.getObjectByName("boitier_carre");
    }
    
    const textureLoaderBoitier = new TextureLoader();
    const textureBoitier = textureLoaderBoitier.load(`/images/background_${proprietes.boitier_texture.value}.png`);
    
    forme.material[0] = new THREE.MeshBasicMaterial({
        color: proprietes.main_color.value,
    });

    forme.material[1] = new THREE.MeshBasicMaterial({
        map: textureBoitier,
    });
  
    bouton = objects.getObjectByName("bouton");
    bouton.material = new THREE.MeshBasicMaterial({
        color: "#000",
    });
  
    pierre = objects.getObjectByName("pierre");
    
    pierre.material = new THREE.MeshBasicMaterial({
        color: proprietes.pierre.value,
    });
    
    //changement de couleur des pierres
    if (proprietes.pierre.value == "Rubis"){
    pierre.material.color.set("#FF0000");
    pierre.material.transparent = false;
    }else if(proprietes.pierre.value == "Diamant"){
        pierre.material.color.set("#0000FF");
        pierre.material.transparent = false;
    }else{
        pierre.material.color.set("#00FF00");
        pierre.material.transparent = false;
    }
 
  
    let pierre2 = pierre.clone();
    pierre2.position.y -= 38;
  

  
    bracelet = objects.getObjectByName("bracelet");
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(`/images/texture-${proprietes.bracelet_texture.value}.jpg`);
    bracelet.material = new THREE.MeshBasicMaterial({ map: texture });
  
    fermoir = objects.getObjectByName("fermoir");
    fermoir.material = new THREE.MeshBasicMaterial({
        color: proprietes.main_color.value,
    });
  
    scene.add(
        aiguilleHeures,
        aiguilleMinutes,
        aiguilleSecondes,
        forme,
        bouton,
        pierre,
        pierre2,
        bracelet,
        fermoir
    );
  
    controls.target.set(0, 0, 0);
    camera.position.set(0, 0, 100);
    controls.update();
}
  
var onProgress = function (data) {
    if (data.lengthComputable) {
        var percentComplete = (data.loaded / data.total) * 100;
        console.log(Math.round(percentComplete, 2) + "% downloaded");
    }
};
  
var onError = function (data) {
    console.error(data);
};
  
onMounted(() => {
    initScene();
    animate();
});

onUpdated(() => {
    initScene();
})
  
onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
});

</script>
import React, { Component } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import axios from 'axios'

let scene, camera, renderer, cube, wall, controls, popup;

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.popupRef = React.createRef();
    this.animate = this.animate.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this); //Referenciar al clickear en la posición determinada en el canvas
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.popupRef.current.style.display = "none"; //Ocultar elemento "popup" del HTML modificando su display con el fin de no tener una posición exacta en la pantalla.
  }

  componentDidMount() {
    this.init();
    this.animate();
    this.canvasRef.current.addEventListener("click", this.onCanvasClick);
  }

  componentWillUnmount() {
    this.canvasRef.current.removeEventListener("click", this.onCanvasClick);
  }

  init() {
    // Creating scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Add camera
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    camera.position.y = 5;

    // Screen renderer
    
    
    renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add Grid
    var grid = new THREE.GridHelper(100, 50);
    scene.add(grid);






    
    // Add Point Light
    var light = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(light);
    light.position.set(1, 5, 8);






    // Add geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      wireframe: false,
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.y = 0.5;
    cube.name = "positionTP";

    //Translate camera to locationb
    var locationTP = new THREE.Vector3();
    cube.getWorldPosition ( locationTP );











    const loader = new GLTFLoader()
    loader.load(
        './models/picture.gltf',
        function (gltf) {


            scene.add(gltf.scene);
        },
    )
    

    // Add wall
    var wallgeometry = new THREE.BoxGeometry(10, 5, 0.1);
    var wallmaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
    wall = new THREE.Mesh(wallgeometry, wallmaterial);
    scene.add(wall);
    wall.position.z = -5;
    wall.position.y = 2.5;

    // OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);

    // Add popup geometry
    var geometrypopup = new THREE.BoxGeometry(1, 1, 1);
    var materialpopup = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true, emissive: 0xffffff, shininess: 100 });
    popup = new THREE.Mesh(geometrypopup, materialpopup);
    popup.castShadow = false;
    scene.add(popup);
    popup.position.y = 0.5;
    popup.position.x = 5;
    
    popup.userData.id = "idpopup";
  }

  animate() {
    requestAnimationFrame(this.animate);
    renderer.render(scene, camera);
    controls.update();
  }

  onCanvasClick(event) {
    const rect = this.canvasRef.current.getBoundingClientRect(); //Calcular coordenadas del mouse en el canvas
    const mouse = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    };

    //Creo un raycaster, librería de three,js para poder interactuar con un objeto 3D en una escena.
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera); //Posiciona el raycaster en la ubicación de la cámara para interactuar de manera correcta desde la vista del usuario

    const intersects = raycaster.intersectObject(popup); //Comprueba si el "rayo" generado por el raycaster, intercepta un objeto 3D en la escena.

    if (intersects.length > 0) { //Verifica si el mouse fue presionado encima de la posición del objeto
      this.showPopup();
      var id = this.userData.id;
      // id = this.getObjectById();
      // axios.post("direccion", {
      //   id: id
      // })
    }
  }

  showPopup() {
    const popup = this.popupRef.current; //Añadir popup a la escena 3D (DOM)
    popup.style.display = "block"; //Cambia la propiedad "display" de "popup" con el fin de mostrarlo en la escena
  }

  

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} className="App" />
        <div id="popup" className="popup" ref={this.popupRef} style={{ display: "none", position: "absolute", top: 0, left: 0 }}>  {/* Hace referencia al elemento "popup" para mostrarlo en el HTML */}
        <i className="fa-solid fa-xmark" id="crossClose" onClick={this.closePopup}></i> {/* Cerrar video mediante la referencia "this.closePopup" */}

        <video controls src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" id="videoDiv"></video>

          <p id="UItext">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus voluptas,
          quisquam nam deleniti voluptatem explicabo exercitationem quas laudantium fuga accusamus officia architecto eligendi optio repellat labore hic inventore.
          Distinctio, labore.
          </p>
          
          <audio controls src="#"></audio>

          <p className="creditosProyecto">Text</p>

        </div>
      </div>
    );
  }
}

export default App;
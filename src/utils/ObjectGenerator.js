import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default class ObjectGenerator {
    static OBJECT_TYPE = {
        MESH: {
            PLANE: 0,
            CUBE: 1,
            CIRCLE: 2,
            UVSPHERE: 3,
            ICOSPHERE: 4,
            CYLINDER: 5,
            CONE: 6,
            TORUS: 7,
            TEXT: 8
        },
        CAMERA: 9,
        OBJ: 10
    };

    constructor(viewport, cursorPoint = new THREE.Vector3(0, 0, 0)) {
        this.viewport = viewport;
        this.cursorPoint = cursorPoint;

        this.loadingManager = new THREE.LoadingManager();
        this.objLoader = new OBJLoader(this.loadingManager);
        this.fontLoader = new FontLoader(this.loadingManager);

    }

    addPlane() {
        let object = this.createPlane();
        this.viewport.add(object);
        return object;
    }

    createPlane() {
        let geometry = new THREE.PlaneGeometry(1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091, side: THREE.DoubleSide });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addCube() {
        let object = this.createCube();
        this.viewport.add(object);
        return object;
    }

    createCube() {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addCircle() {
        let object = this.createCircle();
        this.viewport.add(object);
        return object;
    }

    createCircle() {
        let geometry = new THREE.CircleGeometry(1, 10);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addUVSphere() {
        let object = this.createUVSphere();
        this.viewport.add(object);
        return object;
    }

    createUVSphere() {
        let geometry = new THREE.SphereGeometry(1, 30, 30);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addIcoSphere() {
        let object = this.createIcoSphere();
        this.viewport.add(object);
        return object;
    }

    createIcoSphere() {
        let geometry = new THREE.IcosahedronGeometry(1, 2);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addCylinder() {
        let object = this.createCylinder();
        this.viewport.add(object);
        return object;
    }

    createCylinder() {
        let geometry = new THREE.CylinderGeometry(1, 1, 1, 20, 20);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addCone() {
        let object = this.createCone();
        this.viewport.add(object);
        return object;
    }

    createCone() {
        let geometry = new THREE.ConeGeometry(1, 2, 10, 10);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    addTorus() {
        let object = this.createTorus();
        this.viewport.add(object);
        return object;
    }

    createTorus() {
        let geometry = new THREE.TorusGeometry(0.5, 0.1, 10, 50);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        return mesh;
    }

    createText(text = 'graphicsAI', textGeometryOptions) {
        let geometry = new TextGeometry(text, textGeometryOptions);
        geometry.parameters.text = text;
        geometry.center();
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        return new THREE.Mesh(geometry, material);
    }

    addText(text = 'graphicsAI', onAfterAdd = (t) => { }, textGeometryOptions = {
        size: 0.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
    }, fontPath = './fonts/helvetiker_regular.typeface.json') {
        this.fontLoader.load(
            fontPath,
            (font) => {
                let textObj = this.createText(text, { font, ...textGeometryOptions });
                this.viewport.add(textObj);
                onAfterAdd(textObj);
            }
        );
    }

    addCamera() {
        let object = this.createCamera();
        this.viewport.add(object);
        return object;
    }

    createCamera() {
        let camera = new THREE.PerspectiveCamera(50, 1920 / 1200, 0.1, 50);
        camera.position.copy(this.cursorPoint);
        return camera;
    }

    addAmbientLight() {
        let object = this.createAmbientLight();
        this.viewport.add(object);
        return object;
    }

    addLight(createLight) {
        let object = createLight.call(this,);
        this.viewport.add(object);
        return object;
    }

    parseAndAddObj(objectData) {
        let object = this.objLoader.parse(objectData);
        this.viewport.add(object);
    }

    addObj(objFile, onAfterAdd) {
        this.objLoader.load(
            objFile,
            (object) => {

                this.viewport.add(object);
                onAfterAdd(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log('Enable to load from' + objFile);
                console.log(error);
            }
        );
    }

    importObj() {
        const fileInputElement = document.createElement('input');
        fileInputElement.setAttribute('type', 'file');
        fileInputElement.setAttribute('accept', '.obj');
        fileInputElement.onchange = () => {
            let fileReader = new FileReader();
            let file = fileInputElement.files[0];

            fileReader.onload = () => {
                this.parseAndAddObj(fileReader.result);
            };
            if (file) {
                fileReader.readAsBinaryString(file);
            }
        };
        fileInputElement.click();
    }

    create(objectType,) {
        switch (objectType) {

            case ObjectGenerator.OBJECT_TYPE.MESH.PLANE:
                return this.createPlane();

            case ObjectGenerator.OBJECT_TYPE.MESH.CUBE:
                return this.createCube();

            case ObjectGenerator.OBJECT_TYPE.MESH.CIRCLE:
                return this.createCircle();

            case ObjectGenerator.OBJECT_TYPE.MESH.UVSPHERE:
                return this.createUVSphere();

            case ObjectGenerator.OBJECT_TYPE.MESH.ICOSPHERE:
                return this.createIcoSphere();

            case ObjectGenerator.OBJECT_TYPE.MESH.CYLINDER:
                return this.createCylinder();

            case ObjectGenerator.OBJECT_TYPE.MESH.CONE:
                return this.createCone();

            case ObjectGenerator.OBJECT_TYPE.MESH.TORUS:
                return this.createTorus();

            case ObjectGenerator.OBJECT_TYPE.CAMERA:
                return this.createCamera();

            default:
                break
        }
    }
}
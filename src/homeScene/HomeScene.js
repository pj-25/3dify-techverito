import ObjectGenerator from "../viewport/utils/ObjectGenerator";
import Viewport from "../viewport/Viewport";
import { AmbientLight, DirectionalLight, Vector3, Group } from "three";
import AssetsManager from "../viewport/utils/AssetsManager";
import * as THREE from 'three';

export default class HomeScene extends Viewport {

    static services = ['Web Development',
        'Mobile Application Development',
        'Continuous Delivery',
        'Continuous integration',
        'DevOps',
        'Agile',
        'Ruby On Rails',
        'Golang',
        'Java',
        'Angular',
        'React',
        'Vue',
        'Ionic',
        'CHEF',
        'Docker',
        'Kubernetes'
    ];

    constructor(viewportCanvas, radius = 10) {
        super(viewportCanvas);

        this.objectGenerator = new ObjectGenerator(this);
        this.textObjects = [];

        this.radius = radius;
        this.hideHelpers();

        setInterval(this.animation.bind(this), 100);

        this.objectGenerator.assetsManager.textureLoader.load('images/big-retro-world.jpeg', (texture) => {
            this.background = texture;
        });
    }

    initObjects() {
        this.add(new AmbientLight(0x49e3f6, 0.5));
        let backDirectionalLight = new DirectionalLight(0xf204f5, 1.0);
        backDirectionalLight.position.copy(new Vector3(0, 50, -50));
        this.add(backDirectionalLight);

        let upDirectionalLight = new DirectionalLight(0x0c36ca, 0.5);
        upDirectionalLight.position.copy(new Vector3(0, 50, 100));
        this.add(upDirectionalLight);
        this.addTechVeritoModel();
    }


    addTechVeritoModel() {
        let normalMaterial = this.objectGenerator.assetsManager.createNewMaterial(AssetsManager.MATERIAL_TYPE.MESH_NORMAL_MATERIAL);
        this.atom = new Group();
        this.add(this.atom);
        this.objectGenerator.parent = this.atom;
        this.objectGenerator.addText('TechVerito', (textObject) => {
            this.nucleous = textObject;
            this.objectGenerator.parent = this;
            this.loadElectrons(HomeScene.services);
        }, normalMaterial, {
            size: 2,
            height: 1,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        });
    }

    loadElectrons(services) {
        let particleGeometry = new THREE.SphereGeometry(this.radius, 30, 30);
        let particleMaterial = new THREE.PointsMaterial({ size: 0.1, sizeAttenuation: true });
        this.electrons = new THREE.Points(particleGeometry, particleMaterial);
        this.atom.add(this.electrons);
        this.objectGenerator.parent = this.electrons;
        this.objectGenerator.setSharedMaterial(this.nucleous.material);
        for (let name of services) {
            this.objectGenerator.addText(name, (textObject) => {
                textObject.position.copy(HomeScene.createNewSphereCoordinates(this.radius));
                this.textObjects.push(textObject);
                // textObject.material.wireframe = true;
                if (name == HomeScene.services[-1]) {
                    this.objectGenerator.parent = this;
                    this.objectGenerator.unsetSharedMaterial();
                }
            });
        }
    }

    static createNewSphereCoordinates(radius) {
        let theta = Math.random() * Math.PI * 2;
        let alpha = Math.random() * Math.PI * 2;
        let x = radius * Math.cos(theta) * Math.cos(alpha);
        let y = radius * Math.sin(theta);
        let z = radius * Math.cos(theta) * Math.sin(alpha);
        return new Vector3(x, y, z);
    }

    animation() {
        this.electrons.rotation.y -= 0.05;
        // if (this.atom.position.z == -50)
        //     this.atom.position.z = 10;
        // this.atom.position.z -= 0.5
        // this.atom.lookAt(this.controlledCamera.activeCamera.position)
        for (let electron of this.electrons.children) {
            electron.lookAt(this.controlledCamera.activeCamera.position)
        }
    }
}
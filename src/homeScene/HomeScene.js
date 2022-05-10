import ObjectGenerator from "../utils/ObjectGenerator";
import Viewport from "../viewport/Viewport";
import { AmbientLight, DirectionalLight, Vector3, TextureLoader, Group } from "three";

export default class HomeScene extends Viewport {
    constructor(viewportCanvas, radius = 10) {
        super(viewportCanvas);

        this.objectGenerator = new ObjectGenerator(this);
        this.textObjects = [];

        this.radius = radius;
        this.hideHelpers();

        setInterval(this.animation.bind(this), 100);

        const loader = new TextureLoader();
        loader.load('images/big-retro-world.jpeg', (texture) => {
            this.background = texture;
        });
    }

    initObjects() {
        this.add(new AmbientLight(0x00badb, 0.5));
        let directionalLight = new DirectionalLight(0x00badb, 0.5);
        directionalLight.position.copy(new Vector3(5, 10, 15));
        this.add(directionalLight);
        this.addTechVeritoModel();
    }


    addTechVeritoModel() {
        let services = ['Web Development',
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
        this.objectGenerator.addText('TechVerito', (textObject) => {
            this.loadAtom(services);
        }, {
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

    loadAtom(services) {
        this.atom = new Group();
        this.objectGenerator.parent = this.atom;
        for (let name of services) {
            this.objectGenerator.addText(name, (textObject) => {
                textObject.position.copy(HomeScene.createNewSphereCoordinates(this.radius));
                this.textObjects.push(textObject);
                if (name == services[-1])
                    this.objectGenerator.parent = this;
            });
        }
        this.add(this.atom);
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
        // for (let textObject of this.textObjects) {
        //     textObject.position.copy(HomeScene.createNewSphereCoordinates(this.radius));
        // }
        this.atom.rotation.y -= 0.05;
        for (let service of this.atom.children) {
            service.lookAt(new Vector3(0, 0, 100))
        }
    }
}
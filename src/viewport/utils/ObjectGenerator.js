import * as THREE from "three";
import BoxProperty from "../propertyController/meshPropertyController/BoxProperty";
import CircleProperty from "../propertyController/meshPropertyController/CircleProperty";
import ConeProperty from "../propertyController/meshPropertyController/ConeProperty";
import CylinderProperty from "../propertyController/meshPropertyController/CylinderProperty";
import IcosahedronProperty from "../propertyController/meshPropertyController/IcosphereProperty";
import PlaneProperty from "../propertyController/meshPropertyController/PlaneProperty";
import SphereProperty from "../propertyController/meshPropertyController/SphereProperty";
import TorusProperty from "../propertyController/meshPropertyController/TorusProperty";

import InteractiveMesh from "../interactiveObjects/InteractiveMesh";
import InteractiveCamera from "../interactiveObjects/InteractiveCamera";
import CameraPropertyController from "../propertyController/CameraPropertyController";
import PropertyController from "../propertyController/PropertyController";
import TextProperty from "../propertyController/meshPropertyController/TextProperty";
import InteractiveLight from "../interactiveObjects/InteractiveLight";
import DirectionalLightProperty from "../propertyController/lightPropertyController/DirectionalLightProperty";
import { HemisphereLightHelper, PointLightHelper, SpotLightHelper } from "three";
import HemisphereLightProperty from "../propertyController/lightPropertyController/HemisphereLightProperty";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import RectAreaLightProperty from "../propertyController/lightPropertyController/RectAreaLightProperty";
import SpotLightProperty from "../propertyController/lightPropertyController/SpotLightProperty";
import PointLightProperty from "../propertyController/lightPropertyController/PointLightProperty";
import InteractiveModel from "../interactiveObjects/InteractiveModel";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import AssetManager from "./AssetsManager";

export default class ObjectGenerator {
    static OBJECT_TYPE = {
        MESH: {
            PLANE: "Plane",
            CUBE: "Cube",
            CIRCLE: "Circle",
            UVSPHERE: "UVSphere",
            ICOSPHERE: "IcoSphere",
            CYLINDER: "Cyclinder",
            CONE: "Cone",
            TORUS: "Torus",
            TEXT: "Text"
        },
        CAMERA: "Camera",
        LIGHT: {
            AMBIENT: "AmbientLight",
            DIRECTIONAL: "DirectionalLight",
            HEMISPHERE: "HemisphereLight",
            POINT: "PointLight",
            RECTAREA: "RectAreaLight",
            SPOT: "SpotLight"
        },
        OBJ: "16"
    };

    constructor(parent, propertiesPane, cameraSelector, cursorPoint = new THREE.Vector3(0, 0, 0)) {
        this.parent = parent;
        this.cursorPoint = cursorPoint;
        this.propertiesPane = propertiesPane;
        this.cameraSelector = cameraSelector;

        this.sharedMaterial = null;

        this.assetsManager = new AssetManager(this.loadingManager);
    }

    /**
     * @param material if passed as string, will consider it as material Id
     */
    createInteractiveMesh(geometry, material, attachProperties, PropertyController) {
        if (typeof (material) == "string") {
            material = this.assetsManager.getMaterial(material) || this.assetsManager.createNewMaterial();
        }
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.cursorPoint);
        if (attachProperties && this.propertiesPane) {
            mesh.properties = new PropertyController(mesh, this.propertiesPane);
            mesh.properties.initProperties();
        }
        return mesh;
    }

    getMaterial() {
        if (this.sharedMaterial) {
            return this.sharedMaterial;
        }
        return this.assetsManager.createNewMaterial();
    }

    setSharedMaterial(material) {
        this.sharedMaterial = material;
    }

    unsetSharedMaterial() {
        this.sharedMaterial = null;
    }

    addPlane(material = this.getMaterial(), attachProperties = false) {
        let object = this.createPlane(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createPlane(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.PlaneGeometry(1, 1);
        material.side = THREE.DoubleSide;
        return this.createInteractiveMesh(geometry, material, attachProperties, PlaneProperty);
    }

    addCube(material = this.getMaterial(), attachProperties = false) {
        let object = this.createCube(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createCube(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        return this.createInteractiveMesh(geometry, material, attachProperties, BoxProperty);
    }

    addCircle(material = this.getMaterial(), attachProperties = false) {
        let object = this.createCircle(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createCircle(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.CircleGeometry(1, 10);
        return this.createInteractiveMesh(geometry, material, attachProperties, CircleProperty);
    }

    addUVSphere(material = this.getMaterial(), attachProperties = false) {
        let object = this.createUVSphere(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createUVSphere(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.SphereGeometry(1, 30, 30);
        return this.createInteractiveMesh(geometry, material, attachProperties, SphereProperty);
    }

    addIcoSphere(material = this.getMaterial(), attachProperties = false) {
        let object = this.createIcoSphere(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createIcoSphere(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.IcosahedronGeometry(1, 2);
        return this.createInteractiveMesh(geometry, material, attachProperties, IcosahedronProperty);
    }

    addCylinder(material = this.getMaterial(), attachProperties = false) {
        let object = this.createCylinder(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createCylinder(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.CylinderGeometry(1, 1, 1, 20, 20);
        return this.createInteractiveMesh(geometry, material, attachProperties, CylinderProperty);
    }

    addCone(material = this.getMaterial(), attachProperties = false) {
        let object = this.createCone(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createCone(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.ConeGeometry(1, 2, 10, 10);
        return this.createInteractiveMesh(geometry, material, attachProperties, ConeProperty);
    }

    addTorus(material = this.getMaterial(), attachProperties = false) {
        let object = this.createTorus(material, attachProperties);
        this.parent.add(object);
        return object;
    }

    createTorus(material = this.getMaterial(), attachProperties = false) {
        let geometry = new THREE.TorusGeometry(.5, 0.1, 10, 50);
        return this.createInteractiveMesh(geometry, material, attachProperties, TorusProperty);
    }

    createText(text = 'graphicsAI', textGeometryOptions, material = this.getMaterial(), attachProperties = false) {
        let geometry = new TextGeometry(text, textGeometryOptions);
        geometry.parameters.text = text;
        geometry.center();
        return this.createInteractiveMesh(geometry, material, attachProperties, TextProperty);
    }

    addText(text = 'graphicsAI', onAfterAdd = (t) => { }, material = this.getMaterial(), textGeometryOptions = {
        size: 0.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
    }, fontPath = './fonts/helvetiker_regular.typeface.json', attachProperties = false) {
        this.assetsManager.loadFont(
            fontPath,
            (font) => {
                let textObj = this.createText(text, { font, ...textGeometryOptions }, material, attachProperties);
                this.parent.add(textObj);
                onAfterAdd(textObj);
            }
        );
    }

    addCamera() {
        let object = this.createCamera();
        this.parent.add(object);
        return object;
    }

    addCamera(attachProperties = false) {
        let object = this.createCamera(material, attachProperties);
        this.parent.add(object);
        this.parent.add(object.camera);
        this.cameraSelector.add(object.camera);
        return object;
    }

    createCamera(attachProperties = false) {
        let camera = new THREE.PerspectiveCamera(50, 1920 / 1200, 0.1, 50);
        let interactiveCamera = new InteractiveCamera(this.parent, camera);
        interactiveCamera.position.copy(this.cursorPoint);
        let properties;
        if (attachProperties) {
            properties = new CameraPropertyController(interactiveCamera, this.propertiesPane);
            properties.initProperties();
        }
        interactiveCamera.properties = properties;
        return interactiveCamera;
    }

    createAmbientLight(attachProperties = false) {
        let light = new THREE.AmbientLight(0xffffff, 0.5);
        if (attachProperties) {
            //TODO: add color and intensity property
        }
        return light;
    }

    addAmbientLight(attachProperties = false) {
        let object = this.createAmbientLight(attachProperties);
        this.parent.add(object);
        return object;
    }

    addLight(createLight, attachProperties) {
        let object = createLight.call(this, attachProperties);
        this.parent.add(object);
        this.parent.add(object.light);
        return object;
    }

    createLight(lightHelper, LightPropertyController, attachProperties = false) {
        lightHelper.light.position.copy(this.cursorPoint);
        let interactiveLight = Object.assign(lightHelper, new InteractiveLight(this.parent, lightHelper));
        if (attachProperties) {
            lightHelper.properties = new LightPropertyController(interactiveLight, this.propertiesPane);
            lightHelper.properties.initProperties();
        }
        return lightHelper;
    }

    createDirectionalLight(attachProperties = false) {
        let light = new THREE.DirectionalLight(0xffffff, 0.5);
        return this.createLight(
            new THREE.DirectionalLightHelper(light),
            DirectionalLightProperty,
            attachProperties
        );
    }

    addDirectionalLight(attachProperties = false) {
        return this.addLight(this.createDirectionalLight, attachProperties);
    }

    addHemisphereLight(attachProperties = false) {
        return this.addLight(this.createHemisphereLight, attachProperties);
    }

    createHemisphereLight(attachProperties = false) {
        let light = new THREE.HemisphereLight(0x99ccff, 0x663300, 0.5);
        return this.createLight(
            new HemisphereLightHelper(light),
            HemisphereLightProperty,
            attachProperties
        );
    }

    createPointLight(attachProperties = false) {
        let light = new THREE.PointLight(0xffffff, 0.5);
        return this.createLight(
            new PointLightHelper(light),
            PointLightProperty,
            attachProperties
        );
    }

    addPointLight(attachProperties = false) {
        return this.addLight(this.createPointLight, attachProperties);
    }

    createRectAreaLight(attachProperties = false) {
        let light = new THREE.RectAreaLight(0xffffff, 0.5);
        return this.createLight(
            new RectAreaLightHelper(light),
            RectAreaLightProperty,
            attachProperties
        );
    }

    addRectAreaLight(attachProperties = false) {
        return this.addLight(this.createRectAreaLight, attachProperties);
    }

    createSpotLight(attachProperties = false) {
        let light = new THREE.SpotLight(0xffffff, 0.5);
        return this.createLight(
            new SpotLightHelper(light),
            SpotLightProperty,
            attachProperties
        );
    }

    addSpotLight(attachProperties = false) {
        return this.addLight(this.createSpotLight, attachProperties);
    }

    attachPropertiesToObj(object, name = 'Obj') {
        new InteractiveModel(this.parent, object);
        let properties = new PropertyController(object, this.propertiesPane, name);
        properties.initProperties();
        object.properties = properties;
        return object;
    }

    parseAndAddObj(objectData, attachProperties = false, name = 'Obj') {
        let object = this.assetsManager.objLoader.parse(objectData);
        if (attachProperties) {
            this.attachPropertiesToObj(object, name);
        }
        this.parent.add(object);
    }

    addObj(objFile, attachProperties = false, name = 'Obj', onAfterAdd) {
        this.assetsManager.loadObj(objFile, (object) => {
            if (attachProperties) {
                this.attachPropertiesToObj(object, name);
            }
            this.parent.add(object);
            onAfterAdd(object);
        });
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

    create(objectType, attachProperties = false) {
        return this["create" + objectType](attachProperties);
    }

    add(objectType, attachProperties = false) {
        return this["add" + objectType](attachProperties);
    }
}
// ============================================================
// CIVIC ARCHIVES — THE UNKNOWN
// Babylon.js Monster Scene
// ============================================================


// ------------------------------------------------------------
// CANVAS
// ------------------------------------------------------------

const canvas =
    document.getElementById("renderCanvas") ||
    document.querySelector("canvas");

if (!canvas) {
    console.error("Babylon canvas could not be found.");
    throw new Error("No Babylon canvas found.");
}


// ------------------------------------------------------------
// ENGINE
// ------------------------------------------------------------

const engine = new BABYLON.Engine(
    canvas,
    true,
    {
        preserveDrawingBuffer: true,
        stencil: true
    }
);


// ------------------------------------------------------------
// SCENE
// ------------------------------------------------------------

const scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color4(
    0.002,
    0.003,
    0.004,
    1
);


// ------------------------------------------------------------
// FOG
// ------------------------------------------------------------

scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
scene.fogDensity = 0.035;

scene.fogColor = new BABYLON.Color3(
    0.005,
    0.007,
    0.009
);


// ------------------------------------------------------------
// CAMERA
// ------------------------------------------------------------

const camera = new BABYLON.ArcRotateCamera(
    "MonsterCamera",
    -Math.PI / 2,
    Math.PI / 2.15,
    7,
    new BABYLON.Vector3(0, 1.6, 0),
    scene
);

camera.lowerRadiusLimit = 5;
camera.upperRadiusLimit = 10;

camera.wheelPrecision = 80;

camera.attachControl(canvas, true);


// ------------------------------------------------------------
// LIGHTING
// ------------------------------------------------------------

const mainLight = new BABYLON.HemisphericLight(
    "MainLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
);

mainLight.intensity = 0.18;

const observationLight = new BABYLON.PointLight(
    "ObservationLight",
    new BABYLON.Vector3(0, 4, -2),
    scene
);

observationLight.intensity = 1.1;

observationLight.diffuse = new BABYLON.Color3(
    0.25,
    0.30,
    0.35
);

observationLight.specular = new BABYLON.Color3(
    0.05,
    0.05,
    0.05
);


// ------------------------------------------------------------
// MATERIALS
// ------------------------------------------------------------

const monsterMaterial =
    new BABYLON.StandardMaterial(
        "MonsterMaterial",
        scene
    );

monsterMaterial.diffuseColor =
    new BABYLON.Color3(
        0.008,
        0.012,
        0.016
    );

monsterMaterial.specularColor =
    new BABYLON.Color3(
        0.015,
        0.02,
        0.025
    );

monsterMaterial.roughness = 0.9;


const eyeMaterial =
    new BABYLON.StandardMaterial(
        "EyeMaterial",
        scene
    );

// Bright, cold eye color
eyeMaterial.diffuseColor =
    new BABYLON.Color3(
        0.8,
        0.85,
        0.9
    );

// Strong glow
eyeMaterial.emissiveColor =
    new BABYLON.Color3(
        1.0,
        1.0,
        1.0
    );

// Make the eyes look extremely bright
eyeMaterial.specularColor =
    new BABYLON.Color3(
        1,
        1,
        1
    );
    const eyeGlow =
    new BABYLON.GlowLayer(
        "EyeGlow",
        scene
    );

eyeGlow.intensity = 1.8;


// ------------------------------------------------------------
// MONSTER ROOT
// ------------------------------------------------------------

const monster =
    new BABYLON.TransformNode(
        "UNKNOWN_MONSTER",
        scene
    );


// ------------------------------------------------------------
// BODY
// ------------------------------------------------------------

const body =
    BABYLON.MeshBuilder.CreateCapsule(
        "MonsterBody",
        {
            height: 2.7,
            radius: 0.78,
            tessellation: 12
        },
        scene
    );

body.position.y = 1.75;

body.scaling.x = 0.82;
body.scaling.z = 0.62;

body.material = monsterMaterial;

body.parent = monster;


// ------------------------------------------------------------
// CHEST
// ------------------------------------------------------------

const chest =
    BABYLON.MeshBuilder.CreateSphere(
        "MonsterChest",
        {
            diameter: 1.55,
            segments: 12
        },
        scene
    );

chest.position.y = 2.05;

chest.scaling.x = 0.82;
chest.scaling.y = 0.95;
chest.scaling.z = 0.65;

chest.material = monsterMaterial;

chest.parent = monster;


// ------------------------------------------------------------
// HEAD
// ------------------------------------------------------------

const head =
    BABYLON.MeshBuilder.CreateSphere(
        "MonsterHead",
        {
            diameter: 1.35,
            segments: 12
        },
        scene
    );

head.position.y = 3.25;

head.scaling.x = 0.72;
head.scaling.y = 1.15;
head.scaling.z = 0.65;

head.material = monsterMaterial;

head.parent = monster;


// ------------------------------------------------------------
// NECK
// ------------------------------------------------------------

const neck =
    BABYLON.MeshBuilder.CreateCylinder(
        "MonsterNeck",
        {
            height: 0.65,
            diameter: 0.55,
            tessellation: 12
        },
        scene
    );

neck.position.y = 2.75;

neck.material = monsterMaterial;

neck.parent = monster;


// ------------------------------------------------------------
// ARMS
// ------------------------------------------------------------

function createLimb(
    name,
    position,
    rotation,
    scale
) {

    const limb =
        BABYLON.MeshBuilder.CreateCapsule(
            name,
            {
                height: 1.7,
                radius: 0.25,
                tessellation: 10
            },
            scene
        );

    limb.position = position;

    limb.rotation = rotation;

    limb.scaling = scale;

    limb.material = monsterMaterial;

    limb.parent = monster;

    return limb;
}


const leftArm = createLimb(
    "LeftArm",
    new BABYLON.Vector3(-1.0, 2.05, 0),
    new BABYLON.Vector3(0, 0, -0.18),
    new BABYLON.Vector3(0.75, 1.05, 0.75)
);


const rightArm = createLimb(
    "RightArm",
    new BABYLON.Vector3(1.0, 2.05, 0),
    new BABYLON.Vector3(0, 0, 0.18),
    new BABYLON.Vector3(0.75, 1.05, 0.75)
);


// ------------------------------------------------------------
// LEGS
// ------------------------------------------------------------

const leftLeg = createLimb(
    "LeftLeg",
    new BABYLON.Vector3(-0.42, 0.65, 0),
    new BABYLON.Vector3(0, 0, -0.08),
    new BABYLON.Vector3(0.8, 1.15, 0.8)
);


const rightLeg = createLimb(
    "RightLeg",
    new BABYLON.Vector3(0.42, 0.65, 0),
    new BABYLON.Vector3(0, 0, 0.08),
    new BABYLON.Vector3(0.8, 1.15, 0.8)
);


// ------------------------------------------------------------
// CLAWS
// ------------------------------------------------------------

function createClaw(
    name,
    x,
    y,
    z,
    rotationZ
) {

    const claw =
        BABYLON.MeshBuilder.CreateCylinder(
            name,
            {
                height: 0.45,
                diameterTop: 0.02,
                diameterBottom: 0.13,
                tessellation: 6
            },
            scene
        );

    claw.position =
        new BABYLON.Vector3(
            x,
            y,
            z
        );

    claw.rotation.z = rotationZ;

    claw.material = monsterMaterial;

    claw.parent = monster;

    return claw;
}


// left hand claws

createClaw(
    "LeftClaw1",
    -1.18,
    1.15,
    0,
    -0.4
);

createClaw(
    "LeftClaw2",
    -1.28,
    1.18,
    0.08,
    -0.55
);

createClaw(
    "LeftClaw3",
    -1.22,
    1.12,
    -0.08,
    -0.25
);


// right hand claws

createClaw(
    "RightClaw1",
    1.18,
    1.15,
    0,
    0.4
);

createClaw(
    "RightClaw2",
    1.28,
    1.18,
    0.08,
    0.55
);

createClaw(
    "RightClaw3",
    1.22,
    1.12,
    -0.08,
    0.25
);


// ------------------------------------------------------------
// EYES
// ------------------------------------------------------------

function createEye(
    name,
    x,
    y,
    z
) {

    const eye =
        BABYLON.MeshBuilder.CreateSphere(
            name,
            {
                diameter: 0.18,
                segments: 12
            },
            scene
        );

    eye.position =
        new BABYLON.Vector3(
            x,
            y,
            z
        );

    eye.material = eyeMaterial;

    eye.parent = monster;

    return eye;
}


createEye(
    "LeftEye",
    -0.27,
    3.35,
    -0.59
);


createEye(
    "RightEye",
    0.27,
    3.35,
    -0.59
);


// ------------------------------------------------------------
// MOUTH
// ------------------------------------------------------------

const mouth =
    BABYLON.MeshBuilder.CreateTorus(
        "MonsterMouth",
        {
            diameter: 0.58,
            thickness: 0.035,
            tessellation: 12
        },
        scene
    );

mouth.position =
    new BABYLON.Vector3(
        0,
        2.95,
        -0.58
    );

mouth.scaling.y = 0.45;

mouth.rotation.x = Math.PI / 2;

mouth.material = monsterMaterial;

mouth.parent = monster;


// ------------------------------------------------------------
// BACK TENDRILS
// ------------------------------------------------------------

function createTendril(
    name,
    x,
    y,
    z,
    rotationZ,
    length
) {

    const tendril =
        BABYLON.MeshBuilder.CreateTube(
            name,
            {
                path: [
                    new BABYLON.Vector3(0, 0, 0),
                    new BABYLON.Vector3(
                        0.15,
                        length * 0.35,
                        0
                    ),
                    new BABYLON.Vector3(
                        -0.12,
                        length * 0.7,
                        0
                    ),
                    new BABYLON.Vector3(
                        0.05,
                        length,
                        0
                    )
                ],
                radius: 0.075,
                tessellation: 8
            },
            scene
        );

    tendril.position =
        new BABYLON.Vector3(
            x,
            y,
            z
        );

    tendril.rotation.z = rotationZ;

    tendril.material = monsterMaterial;

    tendril.parent = monster;

    return tendril;
}


createTendril(
    "TendrilLeft",
    -0.65,
    2.6,
    0.35,
    -0.6,
    1.6
);


createTendril(
    "TendrilRight",
    0.65,
    2.6,
    0.35,
    0.6,
    1.6
);


// ------------------------------------------------------------
// GROUND SHADOW
// ------------------------------------------------------------

const shadow =
    BABYLON.MeshBuilder.CreateDisc(
        "MonsterShadow",
        {
            radius: 1.6,
            tessellation: 32
        },
        scene
    );

shadow.rotation.x = Math.PI / 2;

shadow.position.y = 0.02;

shadow.scaling.y = 0.45;

const shadowMaterial =
    new BABYLON.StandardMaterial(
        "ShadowMaterial",
        scene
    );

shadowMaterial.diffuseColor =
    new BABYLON.Color3(
        0,
        0,
        0
    );

shadowMaterial.alpha = 0.65;

shadow.material = shadowMaterial;


// ------------------------------------------------------------
// MONSTER POSITION
// ------------------------------------------------------------

monster.position.y = 0;


// ------------------------------------------------------------
// ANIMATION
// ------------------------------------------------------------

let time = 0;

scene.onBeforeRenderObservable.add(() => {

    const eyePulse =
    1.5 +
    Math.sin(time * 3) * 0.5;

eyeGlow.intensity = eyePulse;

    const delta =
        engine.getDeltaTime() / 1000;

    time += delta;

    // slow breathing

    const breathing =
        1 +
        Math.sin(time * 1.2) * 0.025;

    body.scaling.x =
        0.82 * breathing;

    body.scaling.z =
        0.62 * breathing;


    // subtle floating

    monster.position.y =
        Math.sin(time * 0.8) * 0.08;


    // slight head movement

    head.rotation.y =
        Math.sin(time * 0.65) * 0.08;


    // arms move slightly

    leftArm.rotation.z =
        -0.18 +
        Math.sin(time * 0.9) * 0.025;

    rightArm.rotation.z =
        0.18 -
        Math.sin(time * 0.9) * 0.025;


    // tendrils move independently

    const tendrilLeft =
        scene.getMeshByName("TendrilLeft");

    const tendrilRight =
        scene.getMeshByName("TendrilRight");

    if (tendrilLeft) {
        tendrilLeft.rotation.z =
            -0.6 +
            Math.sin(time * 1.4) * 0.08;
    }

    if (tendrilRight) {
        tendrilRight.rotation.z =
            0.6 -
            Math.sin(time * 1.4) * 0.08;
    }

});


// ------------------------------------------------------------
// RENDER LOOP
// ------------------------------------------------------------

engine.runRenderLoop(() => {
    scene.render();
});


// ------------------------------------------------------------
// RESIZE
// ------------------------------------------------------------

window.addEventListener(
    "resize",
    () => {
        engine.resize();
    }
);
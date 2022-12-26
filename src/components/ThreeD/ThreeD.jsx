import React, { Component, useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControl, withControls } from "react-three-gui";

// import { useHelper } from "@react-three/drei";
// import { SpotLightHelper } from "three";
// import { OrbitControls } from "@react-three/drei";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

function Plane() {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, -5]}
    >
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshPhongMaterial attach="material" color="#D3D3D3" />
    </mesh>
  );
}

const Head = ({ locationString, color }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, locationString);

  return (
    <primitive
      position={[0, 0, -1]}
      ref={ref}
      object={gltf.scene}
      scale={[2, 2, 2]}
      color={color}
    />
  );
};

const Box = ({ color }) => {
  const ref = useRef();

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ color }) => {
  const ref = useRef();

  return (
    <mesh>
      <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
      <meshBasicMaterial color={color} attach="material" />
    </mesh>
  );
};

function Scene() {
  const light = useRef();
  const [renderObj, setRenderObj] = useState("Asaro Head");
  const gl = useThree((state) => state.gl);
  // const [objColor, setObjColor] = useState("blue")

  useControl("Screenshot", {
    type: "button",
    onClick: () => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    },
  });

  // useHelper(light, SpotLightHelper, "cyan");

  const spotLightX = useControl("Spotlight Pos X", {
    type: "number",
    min: -10,
    max: 10,
    value: 0.8,
    distance: 3,
    spring: false,
  });

  const spotLightY = useControl("Spotlight Pos Y", {
    type: "number",
    min: -1.99,
    max: 10,
    value: 1,
    distance: 3,
    spring: false,
  });

  const spotLightZ = useControl("Spotlight Pos Z", {
    type: "number",
    min: -10,
    max: 10,
    value: 4,
    distance: 3,
    spring: false,
  });

  const spotLightIntensity = useControl("Spotlight Intensity", {
    type: "number",
    min: 0,
    max: 1,
    value: 0.5,
  });

  const objectSelect = useControl("Choose Shape", {
    type: "select",
    value: "Asaro Head",
    items: ["Asaro Head", "Cube", "Sphere"],
    onChange: (val) => setRenderObj(val),
  });

  // const color = useControl("Color", {
  //   type: "color",
  // });

  const color = useControl("Color", { type: "color", value: "#fe9966" });
  return (
    <>
      {/* <ambientLight /> */}
      <spotLight
        ref={light}
        castShadow={true}
        intensity={spotLightIntensity}
        position={[spotLightX, spotLightY, spotLightZ]}
      />
      <Suspense fallback={null}>
        {renderObj === "Asaro Head" && (
          <Head locationString={"/lightref/asaro.glb"} color={color} />
        )}
        {renderObj === "Cube" && <Box position={[0, 0, 0]} color={color} />}
        {renderObj === "Sphere" && (
          <Sphere position={[0, 0, 0]} color={color} />
        )}
      </Suspense>
      {/* <Plane /> */}
    </>
  );
}

const MainCanvas = withControls(Canvas);

class ThreeD extends Component {
  state = {};
  render() {
    return (
      <MainCanvas
        gl={{ preserveDrawingBuffer: true }}
        style={{ height: "100vh" }}
      >
        <CameraController />
        <Scene />
      </MainCanvas>
    );
  }
}

export default ThreeD;

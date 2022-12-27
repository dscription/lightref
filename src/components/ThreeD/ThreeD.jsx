import React, { useState, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useControl, withControls } from "react-three-gui";
import CameraController from "../CameraController/CameraController";
import Plane from "../Plane/Plane";
import ObjectRender from "../ObjectRender/ObjectRender";

import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
// import { OrbitControls } from "@react-three/drei";

const MainCanvas = withControls(Canvas);

function Scene() {
  const light = useRef();
  const [renderObj, setRenderObj] = useState("Asaro Head");
  const gl = useThree((state) => state.gl);

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

  useHelper(light, SpotLightHelper, "cyan");

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

  useControl("Choose Shape", {
    type: "select",
    value: "Asaro Head",
    items: ["Asaro Head", "Cube", "Sphere"],
    onChange: (val) => setRenderObj(val),
  });

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
      <ObjectRender color={color} renderObj={renderObj} />
      <Plane />
    </>
  );
}

const ThreeD = () => {
  return (
    <MainCanvas
      gl={{ preserveDrawingBuffer: true }}
      style={{ height: "100vh" }}
    >
      <CameraController />
      <Scene />
    </MainCanvas>
  );
};

export default ThreeD;

import React, { useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useControl } from "react-three-gui";
import Plane from "../Plane/Plane";
import ObjectRender from "../ObjectRender/ObjectRender";

function Scene() {
  const light = useRef();
  const [renderObj, setRenderObj] = useState("Asaro Head");
  const [ambientLightOn, setAmbientLightOn] = useState(false);
  const gl = useThree((state) => state.gl);

  useControl("Choose Shape", {
    type: "select",
    value: "Asaro Head",
    items: ["Asaro Head", "Cube", "Sphere"],
    onChange: (val) => setRenderObj(val),
  });

  const color = useControl("Color", { type: "color", value: "#fe9966" });

  useControl("Ambient Light", {
    type: "select",
    value: "Off",
    items: ["On", "Off"],
    onChange: (val) => {
      val === "Off" ? setAmbientLightOn(false) : setAmbientLightOn(true);
    },
  });

  // Ambient light intensity
  const ambientLightIntensity = useControl("Ambient Light Intensity", {
    type: "number",
    min: 0,
    max: 1,
    value: 0.5,
  });

  // Spotlight intensity
  const spotLightIntensity = useControl("Spotlight Intensity", {
    type: "number",
    min: 0,
    max: 1,
    value: 0.5,
  });

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

  // Screenshot control.
  // ? Is there a way to change the color or styling of the button?
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

  return (
    <>
      {ambientLightOn && <ambientLight intensity={ambientLightIntensity} />}

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

export default Scene;

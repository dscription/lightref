import React, { Component, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
import { Controls, useControl, withControls } from "react-three-gui";

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

const Head = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/asaro.glb");

  
  return <primitive position={[0, 0, 2]} ref={ref} object={gltf.scene} />;
};

function Scene() {
  const light = useRef();
  useHelper(light, SpotLightHelper, "cyan");

  const spotLightX = useControl("Spotlight Pos X", {
    type: "number",
    min: -10,
    max: 10,
    distance: 3,
    spring: false,
  });

  const spotLightY = useControl("Spotlight Pos Y", {
    type: "number",
    min: -10,
    max: 10,
    distance: 3,
    spring: false,
  });

  const spotLightZ = useControl("Spotlight Pos Z", {
    type: "number",
    min: -10,
    max: 10,
    distance: 3,
    spring: false,
  });

  return (
    <>
      {/* <ambientLight /> */}
      <spotLight
        ref={light}
        castShadow={true}
        intensity={0.6}
        position={[spotLightX, spotLightY, spotLightZ]}
      />
      <Suspense fallback={null}>
        <Head />
      </Suspense>
      <Plane />
      <OrbitControls />
    </>
  );
}

const MainCanvas = withControls(Canvas);

class ThreeD extends Component {
  state = {};
  render() {
    return (
      <MainCanvas style={{ height: "100vh" }}>
        <Scene />
      </MainCanvas>
    );
  }
}

export default ThreeD;

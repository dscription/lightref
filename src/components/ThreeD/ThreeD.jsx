import React, { Component, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const ThreeDContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
`;

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

function Scene() {
  const startingXPos = -3;
  const spaceBetween = 3;
  const startingZPos = -2;

  return (
    <>
      <ambientLight />
      <spotLight castShadow={true} intensity={0.6} position={[0, 10, 4]} />
      <Suspense fallback={null}>
        <Sphere
        // key={index}
        // position={[(startingXPos + index) * spaceBetween, 0, startingZPos]}
        >
          <meshBasicMaterial attach="material" color="blue" />
        </Sphere>
      </Suspense>
      <Plane />
      <OrbitControls />
    </>
  );
}

class ThreeD extends Component {
  state = {};
  render() {
    return (
      <ThreeDContainer>
        <Canvas>
          <Scene />
        </Canvas>
      </ThreeDContainer>
    );
  }
}

export default ThreeD;

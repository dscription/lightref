import React, { Component, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

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

const Head = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/asaro.glb");

  useFrame(() => {
    // ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
  });
  // return <primitive position={[0, -1.2, 0]} object={gltf.scene} />;
  return <primitive position={[0, -1.2, 0]} ref={ref} object={gltf.scene} />;
};

function Scene() {
  const light = useRef()
  useHelper(light, SpotLightHelper, 'cyan')

  return (
    <>
      {/* <ambientLight /> */}
      <spotLight ref={light} castShadow={true} intensity={0.6} position={[15, 5, 10]} />
      <Suspense fallback={null}>
        <Head />
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
        <Canvas style={{ height: "100vh" }}>
          <Scene />
        </Canvas>
      </ThreeDContainer>
    );
  }
}

export default ThreeD;

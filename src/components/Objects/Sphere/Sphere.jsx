import React, { useRef } from "react";

const Sphere = ({ color }) => {
  // const ref = useRef();

  return (
    <mesh>
      <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
      <meshBasicMaterial color={color} attach="material" />
    </mesh>
  );
};

export default Sphere;

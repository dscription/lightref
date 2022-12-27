import React, { useRef } from "react";

const Box = ({ color }) => {
  const ref = useRef();

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Box;

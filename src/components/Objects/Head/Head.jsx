import {useRef} from "react";
import { useLoader} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

export default Head
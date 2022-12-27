import { Canvas } from "@react-three/fiber";
import { withControls } from "react-three-gui";
import CameraController from "../CameraController/CameraController";
import Scene from "../Scene/Scene";

const MainCanvas = withControls(Canvas);

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

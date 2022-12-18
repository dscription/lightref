import ThreeD from "../../components/ThreeD/ThreeD";
import { Controls } from "react-three-gui";
import { arraySlice } from "three/src/animation/AnimationUtils";

function App() {
  return (
    <Controls.Provider>
        <ThreeD />
      <Controls title="Controls" width={800}/>
    </Controls.Provider>
  );
}

export default App;


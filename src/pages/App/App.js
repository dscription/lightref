import ThreeD from "../../components/ThreeD/ThreeD";
import { Controls } from "react-three-gui";

function App() {
  return (
    <Controls.Provider>
      <ThreeD />
      <Controls width={300} />
    </Controls.Provider>
  );
}

export default App;

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Factory from "./components/Factory";

function App() {
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>

      <button
        onClick={() =>
          setSpeed((prev) => (prev === 1 ? 2 : 1))
        }
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {speed === 1
          ? "Velocidad x2"
          : "Velocidad Normal"}
      </button>

      <Canvas shadows camera={{ position: [8, 5, 8] }}>
        <ambientLight intensity={0.6} />

        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={2}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1}
        />

        <Factory speed={speed} />
      </Canvas>
    </div>
  );
}

export default App;
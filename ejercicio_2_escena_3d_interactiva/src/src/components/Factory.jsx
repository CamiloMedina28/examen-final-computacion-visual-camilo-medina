import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import Conveyor from "./Conveyor";
import RobotArm from "./RobotArm";

function Factory({ speed }) {
  const [boxState, setBoxState] = useState(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = (t * speed) % 6;

    if (progress < 2) {
      if (boxState !== 0) setBoxState(0);
    } else if (progress < 4) {
      if (boxState !== 1) setBoxState(1);
    } else {
      if (boxState !== 2) setBoxState(2);
    }
  });



  return (
    <group>
      {/* Piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      <Conveyor boxState={boxState} speed={speed} />
      <RobotArm boxState={boxState} speed={speed} />

      <group position={[6, 0, 0]}>
        <group position={[0, 0, 0]}>
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 0.08, 1.6]} />
                <meshStandardMaterial
                color="#dfe6e9"
                metalness={0.9}
                roughness={0.15}
                />
            </mesh>

            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.8, 0.04, 1.4]} />
                <meshStandardMaterial
                color="#b2bec3"
                metalness={0.8}
                roughness={0.2}
                />
            </mesh>

            <group position={[-1.4, 0.6, 0.7]}>
                <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
                <meshStandardMaterial color="#dfe6e9" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.58, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
                <meshStandardMaterial color="#1e272e" roughness={0.7} />
                </mesh>
            </group>

            <group position={[1.4, 0.6, 0.7]}>
                <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
                <meshStandardMaterial color="#dfe6e9" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.58, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
                <meshStandardMaterial color="#1e272e" roughness={0.7} />
                </mesh>
            </group>

            <group position={[-1.4, 0.6, -0.7]}>
                <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
                <meshStandardMaterial color="#dfe6e9" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.58, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
                <meshStandardMaterial color="#1e272e" roughness={0.7} />
                </mesh>
            </group>

            <group position={[1.4, 0.6, -0.7]}>
                <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
                <meshStandardMaterial color="#dfe6e9" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.58, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
                <meshStandardMaterial color="#1e272e" roughness={0.7} />
                </mesh>
            </group>
            </group>
        {boxState === 2 && (
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial
              color="#8D6E63"
              metalness={0.2}
              roughness={0.7}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default Factory;
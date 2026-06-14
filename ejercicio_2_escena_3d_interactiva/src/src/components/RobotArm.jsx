import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function RobotArm({ boxState, speed }) {
  const baseRef = useRef();
  const shoulderRef = useRef();
  const forearmRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = (t * speed) % 6;

    if (
      !baseRef.current ||
      !shoulderRef.current ||
      !forearmRef.current
    ) {
      return;
    }

    // Espera caja
    if (progress < 2) {
      baseRef.current.rotation.y = 0;
      shoulderRef.current.rotation.z = 0.5;
      forearmRef.current.rotation.z = 1.5;
    }
    // Transporta caja
    else if (progress < 4) {
      const p = (progress - 2) / 2;
      baseRef.current.rotation.y = p * 3;
      shoulderRef.current.rotation.z = 0.5 + p * (0.7 - 0.5);
      forearmRef.current.rotation.z = 1.5 + p * (1 - 1.5);
    }
    // Regresa
    else {
      const p = (progress - 4) / 2;
      baseRef.current.rotation.y = 3 + p * (0 - 3);
      shoulderRef.current.rotation.z = 0.7 + p * (0.5 - 0.7);
      forearmRef.current.rotation.z = 1 + p * (1.5 - 1);
    }
  });

  const colors = {
    mainBlue: "#4b759a",      
    accentOrange: "#d98324",  
    jointLightBlue: "#70a1ff",
    gripperBlack: "#222222",  
    gripperCyan: "#82ccdd"    
  };

  return (
    <group position={[3.5, 0, 0]}>
      <group ref={baseRef}>

        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.8, 0.3, 32]} />
          <meshStandardMaterial
            color={colors.mainBlue}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={colors.accentOrange}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        <group position={[0, 0.5, 0]} ref={shoulderRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.5, 32]} />
            <meshStandardMaterial
              color={colors.accentOrange}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.26]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
            <meshStandardMaterial color={colors.jointLightBlue} roughness={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.26]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
            <meshStandardMaterial color={colors.jointLightBlue} roughness={0.4} />
          </mesh>

          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[0.35, 1.6, 0.45]} />
            <meshStandardMaterial
              color={colors.mainBlue}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>

          <group position={[0, 1.6, 0]} ref={forearmRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.52, 32]} />
              <meshStandardMaterial
                color={colors.jointLightBlue}
                roughness={0.3}
                metalness={0.6}
              />
            </mesh>

            <mesh position={[0, 0.6, 0]} castShadow>
              <boxGeometry args={[0.25, 1.2, 0.35]} />
              <meshStandardMaterial
                color={colors.mainBlue}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            <group position={[0, 1.2, 0]}>
              <mesh position={[0, 0.05, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.25, 0.15, 16]} />
                <meshStandardMaterial
                  color={colors.accentOrange}
                  roughness={0.4}
                  metalness={0.6}
                />
              </mesh>

              <mesh position={[0, 0.2, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
                <meshStandardMaterial 
                  color={colors.mainBlue} 
                  roughness={0.3}
                  metalness={0.7}
                />
              </mesh>

              <group position={[-0.2, 0.4, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.08, 0.4, 0.15]} />
                  <meshStandardMaterial color={colors.gripperBlack} roughness={0.5} />
                </mesh>
                <mesh position={[0.05, 0.05, 0]}>
                  <boxGeometry args={[0.03, 0.25, 0.11]} />
                  <meshStandardMaterial color={colors.gripperCyan} roughness={0.4} />
                </mesh>
              </group>

              <group position={[0.2, 0.4, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.08, 0.4, 0.15]} />
                  <meshStandardMaterial color={colors.gripperBlack} roughness={0.5} />
                </mesh>
                <mesh position={[-0.05, 0.05, 0]}>
                  <boxGeometry args={[0.03, 0.25, 0.11]} />
                  <meshStandardMaterial color={colors.gripperCyan} roughness={0.4} />
                </mesh>
              </group>

              {boxState === 1 && (
                <mesh position={[0, 0.4, 0]} castShadow>
                  <boxGeometry args={[0.3, 0.3, 0.3]} />
                  <meshStandardMaterial
                    color="#8D6E63"
                    metalness={0.2}
                    roughness={0.7}
                  />
                </mesh>
              )}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default RobotArm;
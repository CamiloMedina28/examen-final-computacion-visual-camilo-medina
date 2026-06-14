import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Conveyor({ boxState, speed }) {
  const boxRef = useRef();

  useFrame((state) => {
    if (boxState !== 0 || !boxRef.current) return;

    const t = state.clock.getElapsedTime();
    const progress = (t * speed) % 6;

    if (progress < 2) {
      const p = progress / 2;
      const startX = -3.5;
      const endX = 1.0;
      const x = startX + (endX - startX) * p;
      boxRef.current.position.set(x, 0.8, 0);
    }
  });

  const materials = {
    frameBlack: { color: "#1a1a1a", roughness: 0.5, metalness: 0.8 }, // Chasis de metal negro
    beltDark: { color: "#2c2c2c", roughness: 0.9, metalness: 0.1 },   // Banda de goma negra opaca
    rollerSilver: { color: "#b2bec3", roughness: 0.2, metalness: 0.9 }, // Rodillos metálicos brillantes
    motorGray: { color: "#535c68", roughness: 0.4, metalness: 0.6 },    // Carcasa del motor eléctrico
    controlBox: { color: "#dfe6e9", roughness: 0.5, metalness: 0.2 }    // Caja de control gris claro
  };

  const totalRollers = 18;
  const rollers = [];
  for (let i = 0; i < totalRollers; i++) {
    const zOffset = -3.8 + (i * 7.6) / (totalRollers - 1);
    rollers.push(zOffset);
  }

  return (
    <group>
      <mesh position={[0, 0.45, 1.05]} receiveShadow castShadow>
        <boxGeometry args={[8.2, 0.4, 0.08]} />
        <meshStandardMaterial {...materials.frameBlack} />
      </mesh>

      <mesh position={[0, 0.45, -1.05]} receiveShadow castShadow>
        <boxGeometry args={[8.2, 0.4, 0.08]} />
        <meshStandardMaterial {...materials.frameBlack} />
      </mesh>

      <mesh position={[0, 0.48, 0]} receiveShadow castShadow>
        <boxGeometry args={[8.0, 0.32, 1.8]} />
        <meshStandardMaterial {...materials.beltDark} />
      </mesh>

      {rollers.map((xPos, index) => (
        <mesh 
          key={index} 
          position={[xPos, 0.48, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 2.02, 16]} />
          <meshStandardMaterial {...materials.rollerSilver} />
        </mesh>
      ))}

      <group position={[-4.1, 0.5, -1.2]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
          <meshStandardMaterial {...materials.motorGray} />
        </mesh>
        
        <mesh position={[0, -0.3, -0.1]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial {...materials.controlBox} />
        </mesh>
        {/* Panel frontal oscuro de la caja */}
        <mesh position={[0, -0.3, 0.01]}>
          <boxGeometry args={[0.26, 0.36, 0.02]} />
          <meshStandardMaterial color="#2d3436" roughness={0.6} />
        </mesh>
      </group>

      {boxState === 0 && (
        <mesh ref={boxRef} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial
            color="#8D6E63"
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      )}
    </group>
  );
}

export default Conveyor;
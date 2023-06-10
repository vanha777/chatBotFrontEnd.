import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';

const SpinningLoadingIcon = () => {
  const ref = React.useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.1; // Adjust the rotation speed as desired
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <boxBufferGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default SpinningLoadingIcon;

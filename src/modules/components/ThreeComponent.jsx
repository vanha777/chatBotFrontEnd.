
import React, { Suspense, useRef, useState, useEffect } from 'react';
import Model from './IronMan';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SpinningLoadingIcon from './SpinningLoadingIcon.jsx';


const ThreeComponent = (props) => {
    const { chatBotState } = props;






    // useThree to access camera props, and useFrame() to update attribution. From react-three/fiber
    function MyCamera() {
        const { camera } = useThree();
        // useFrame() Hook to update camera position in after render Canvas. From react-three/fiber
        useFrame(() => {
            camera.position.set(1, 15, 5.5);
            camera.lookAt(-0.5, 13, 0);
        });
    }

    return (
        <Canvas flat="sunset" linear="true"  >
            <Suspense fallback={<SpinningLoadingIcon />} >
                <MyCamera />
                {/*<Environment preset="sunset" background blur={0.5} />*/}

                <directionalLight intensity={4} position={[2, 5, 0]} />
                {/* wait when model are being built */}

                <Model userInteract={chatBotState} />
            </ Suspense>
            {/*<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />*/}

        </Canvas>
    )
}
export default ThreeComponent;

{/* Document on React-Three/Fiber  link: https://docs.pmnd.rs/react-three-fiber/api/hooks */ }
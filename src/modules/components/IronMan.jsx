/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 IronMan.glb
*/

import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useInteractionState } from '../../modules/components/userInteractionState';

export default function Model(props) {

    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/IronMan.glb')
    const { actions } = useAnimations(animations, group)
    const { userState, updateUserState } = useInteractionState();


    // set actions and pose when user interact
    useEffect(() => {
        console.log(userState)
        if (userState === 'interract') {
            actions.Dance.reset().fadeIn(0.5).play();
            return () => { actions.Dance.fadeOut(0.5) };
        }
        if (userState === 'hit') {
            actions.HeadHit.reset().fadeIn(0.5).play();
            return () => { actions.HeadHit.fadeOut(0.5) };
        }
        if (userState === 'talk') {
            actions.Talk2.reset().fadeIn(0.5).play();
            return () => { actions.Talk2.fadeOut(0.5) };
        }
        if (userState === 'talkPhone') {
            actions.Talk1.reset().fadeIn(0.5).play();
            return () => { actions.Talk1.fadeOut(0.5) };
        }
        if (userState === 'idle') {
            actions.Stand.reset().fadeIn(0.5).play();
            return () => { actions.Stand.fadeOut(0.5) };
        }
        if (userState === 'look') {
            actions.Looking.reset().fadeIn(0.5).play();
            return () => { actions.Looking.fadeOut(0.5) };
        }
        actions.Greet.fadeIn(0.5).play();
        setTimeout(() => {
            actions.Greet.fadeOut(0.5)
            actions.Stand.reset().fadeIn(0.5).play();
        }, 3500);
        return () => { actions.Stand.fadeOut(0.5) };
    }, [userState]);

    useEffect(() => {
        console.log(actions)
      
    }, [])

    // use gltfjsx@6.1.4 to read local files glb then convert into component that are read by react-three-drei
    return (

        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Stand" rotation={[Math.PI / 2, 0, 0]} scale={0.25}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh name="Arc_Reactor" geometry={nodes.Arc_Reactor.geometry} material={materials['Arc Reactor']} skeleton={nodes.Arc_Reactor.skeleton} />
                    <skinnedMesh name="Glass" geometry={nodes.Glass.geometry} material={materials.Glass} skeleton={nodes.Glass.skeleton} />
                    <skinnedMesh name="Gold" geometry={nodes.Gold.geometry} material={materials['Gold Part']} skeleton={nodes.Gold.skeleton} />
                    <skinnedMesh name="Lights" geometry={nodes.Lights.geometry} material={materials.Lights} skeleton={nodes.Lights.skeleton} />
                    <skinnedMesh name="Red" geometry={nodes.Red.geometry} material={materials['Red Part']} skeleton={nodes.Red.skeleton} />
                    <skinnedMesh name="Silver" geometry={nodes.Silver.geometry} material={materials['Silver Part']} skeleton={nodes.Silver.skeleton} />
                </group>
            </group>
        </group>

    )
}

useGLTF.preload('/IronMan.glb')
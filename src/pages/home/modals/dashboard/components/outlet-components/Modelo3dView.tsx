
import { type ReactElement } from 'react';

import { Canvas, type Vector3 } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';

interface PWheel {
    position: Vector3
    isDouble: boolean
}

function Wheel( {position, isDouble = false}: PWheel): ReactElement
{
    return (
        <group position={position}>

            <mesh rotation={[0,0,Math.PI/2]}>
                <cylinderGeometry args={[
                    0.3, 0.3, 0.25, 32
                ]}/>
                <meshStandardMaterial
                    color='#00bfff'
                    emissive='#00bfff'
                    emissiveIntensity={0.8}
                />
            </mesh>

            {
                isDouble && (
                    <mesh position={[0.32, 0, 0]} rotation={[0,0,Math.PI/2]}>
                <cylinderGeometry args={[
                    0.3, 0.3, 0.25, 32
                ]}/>
                <meshStandardMaterial
                    color='#00bfff'
                    emissive='#00bfff'
                    emissiveIntensity={0.8}
                />
            </mesh>
                )
            }

        </group>
    )
}

interface PAxle{
    yPosition: number
    hasDoubleWheels: boolean
}

function Axle({ yPosition, hasDoubleWheels=false }: PAxle): ReactElement
{
    return (
        <group position={[0, yPosition, 0]}>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
                <meshStandardMaterial color='#444444' metalness={0.8} roughness={0.2} />
            </mesh>
            <Wheel
                position={hasDoubleWheels ? [-1.2, 0, 0] : [-1,0,0]}
                isDouble={hasDoubleWheels}
            />
            <Wheel
                position={hasDoubleWheels ? [1.2 - 0.32, 0, 0] : [1,0,0]}
                isDouble={hasDoubleWheels}
            />
        </group>
    )
}

function TrucAxleLayout(): ReactElement
{
    return (
        <group rotation={[Math.PI /6, Math.PI / 8, 0]}>
            <mesh position={[-0.5, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 4.5, 16]} />
                <meshStandardMaterial color='#333333' />
            </mesh>
            <mesh position={[0.5, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 4.5, 16]} />
                <meshStandardMaterial color='#333333'/>
            </mesh>
            <Axle
                yPosition={1.2}
                hasDoubleWheels={false}
            />
            <Axle
                yPosition={0}
                hasDoubleWheels={true}
            />
            <Axle
                yPosition={-1.2}
                hasDoubleWheels={true}
            />
        </group>
    )
}

function Modelo3dView() {
    return (
        
        <Canvas
            camera={{
                position:[0,0,6],
                fov:50
            }}
        >
            <ambientLight intensity={0.5} />
            <pointLight
                position={[10,10,10]}
                intensity={1}
            />

            <TrucAxleLayout />

            <OrbitControls
                enableRotate={true}
                autoRotate={false}
            />

        </Canvas>

    )
}

export default Modelo3dView;

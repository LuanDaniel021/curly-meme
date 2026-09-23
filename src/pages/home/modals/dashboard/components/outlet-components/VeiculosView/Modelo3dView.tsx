
import { type ReactElement } from 'react';

import { Canvas, type Vector3 } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';

interface PWheel {
    position: Vector3
    isDouble: boolean
    tireIds: string[]
    slot: string
    onSelectTire: (tireId: string | undefined, slot: string) => void
}

function Wheel({ position, isDouble = false, tireIds, slot, onSelectTire }: PWheel): ReactElement
{
    const renderWheel = (tireId: string | undefined, offset: [number, number, number] = [0, 0, 0]) => (
        <mesh position={offset} rotation={[0, 0, Math.PI / 2]} onClick={() => onSelectTire(tireId, slot)} onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'default'; }}>
            <cylinderGeometry args={[0.3, 0.3, 0.25, 32]} />
            <meshStandardMaterial color={tireId ? '#22c55e' : '#4b5563'} emissive={tireId ? '#22c55e' : '#000000'} emissiveIntensity={tireId ? 0.8 : 0.1} />
        </mesh>
    );

    return (
        <group position={position}>
            {renderWheel(tireIds[0])}
            {isDouble && renderWheel(tireIds[1], [0.32, 0, 0])}
        </group>
    )
}

interface PAxle{
    yPosition: number
    hasDoubleWheels: boolean
    axleIndex: number
    tireSlots: Record<string, string[]>
    onSelectTire: (tireId: string | undefined, slot: string) => void
}

function Axle({ yPosition, hasDoubleWheels = false, axleIndex, tireSlots, onSelectTire }: PAxle): ReactElement
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
                tireIds={tireSlots[`E${axleIndex}E`] || []}
                slot={`E${axleIndex}E`}
                onSelectTire={onSelectTire}
            />
            <Wheel
                position={hasDoubleWheels ? [1.2 - 0.32, 0, 0] : [1,0,0]}
                isDouble={hasDoubleWheels}
                tireIds={tireSlots[`E${axleIndex}D`] || []}
                slot={`E${axleIndex}D`}
                onSelectTire={onSelectTire}
            />
        </group>
    )
}

function TrucAxleLayout({ tireSlots, onSelectTire }: { tireSlots: Record<string, string[]>; onSelectTire: (tireId: string | undefined, slot: string) => void }): ReactElement
{
    return (
        <group rotation={[Math.PI / 4, Math.PI / 6, 0]}>
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
                axleIndex={0}
                tireSlots={tireSlots}
                onSelectTire={onSelectTire}
            />
            <Axle
                yPosition={0}
                hasDoubleWheels={true}
                axleIndex={1}
                tireSlots={tireSlots}
                onSelectTire={onSelectTire}
            />
            <Axle
                yPosition={-1.2}
                hasDoubleWheels={true}
                axleIndex={2}
                tireSlots={tireSlots}
                onSelectTire={onSelectTire}
            />
        </group>
    )
}

function Modelo3dView({ tireSlots, onSelectTire }: { tireSlots: Record<string, string[]>; onSelectTire: (tireId: string | undefined, slot: string) => void }) {
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

            <TrucAxleLayout tireSlots={tireSlots} onSelectTire={onSelectTire} />

            <OrbitControls
                enableRotate={true}
                autoRotate={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />

        </Canvas>

    )
}

export default Modelo3dView;

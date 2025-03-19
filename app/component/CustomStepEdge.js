import { getSmoothStepPath } from "reactflow";

const CustomStepEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        borderRadius: 20, // Increase for smoother curves
    });

    return (
        <>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#31c5f0" />
                </marker>
            </defs>
            <path
    id={id}
    className="react-flow__edge-path"
    d={edgePath}
    stroke="#31c5f0"
    strokeWidth={4}
    fill="none"
    strokeOpacity="0.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    markerEnd="url(#arrow)"
    pointerEvents="none" // Ensure the stroke remains on top
/>

        </>
    );  
};

export default CustomStepEdge;

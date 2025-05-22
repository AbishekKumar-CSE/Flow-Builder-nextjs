import dynamic from "next/dynamic";

// Adjust the import path based on your project structure
const FlowBuilder = dynamic(() => import("./app/FlowBuilderUI"), {
  ssr: false,
});

export { FlowBuilder };
export default FlowBuilder;

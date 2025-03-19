/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import Swal from "sweetalert2";
import "reactflow/dist/base.css";
import "../tailwind.config.js";
import CustomStraightEdge from "./component/CustomStepEdge.js";
import Sidebar from "./component/mediaNode/sidebar.js";
import AdvanceSideBar from "./component/advanceNode/advanceSideBar.js";
import TextSideBar from "./component/simpleNode/Message Node/textSidebar.js";
import QuestionNode from "./component/simpleNode/Message Node/QuestionNode.js";
import TextMediaNode from "./component/simpleNode/Simple Media/simpleMediaNode.js";
import TextMediaSidebar from "./component/simpleNode/Simple Media/textMediaSidebar.js";
import TextNode from "./component/mediaNode/TextNode.js";
import NodeSideBar from "./component/nodeSideBar.js";
import AdvanceNode from "./component/advanceNode/advanceNode.js";

import NameQuestionNode from "./component/QuestionNodes/Name/NameQuestionNode.js";
import NameSidebar from "./component/QuestionNodes/Name/NameSidebar.js";

import PhoneQuestionNode from "./component/QuestionNodes/PhoneNumber/PhoneQuestionNode.js";
import PhoneSidebar from "./component/QuestionNodes/PhoneNumber/PhoneSidebar.js";

import EmailQuestionNode from "./component/QuestionNodes/Email/EmailQuestionNode.js";
import EmailSidebar from "./component/QuestionNodes/Email/EmailSidebar.js";

import AskQuestionNode from "./component/QuestionNodes/Question/AskQuestionNode.js";
import AskSidebar from "./component/QuestionNodes/Question/AskSidebar.js";

import ListButtonNode from "./component/advanceNode/listButtons/ListButtonNode.js";
import ListButtonSidebar from "./component/advanceNode/listButtons/ListButtonSidebar.js";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import Data from "./data/data.js";

// Key for local storage
const flowKey = "flow-key";

const dataUserId = Data.data.map((user) => user.id);

// Initial node setup
const initialNodes = [
  {
    id: "1",
    type: "questionnamenode",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];



let id = 0;

// Function for generating unique IDs for nodes
const getId = () => `node_${id++}`;

const App = () => {
  // Define custom node types
  const nodeTypes = useMemo(
    () => ({
      textnode: TextNode,
      questionnode: QuestionNode,
      textmedianode: TextMediaNode,
      advancenode: AdvanceNode,
      questionnamenode: NameQuestionNode,
      phonequestionnode: PhoneQuestionNode,
      emailquestionnode: EmailQuestionNode,
      askquestionnode: AskQuestionNode,
      listbuttonnodde: ListButtonNode,
    }),
    []
  );

  // States and hooks setup
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeName, setNodeName] = useState("");
  const [nodeImage, setNodeImage] = useState("");
  const [nodeLink, setNodeLink] = useState("");
  const [nodeOption, setNodeOption] = useState("");
  const [nodeVideo, setNodeVideo] = useState("");
  const [nodeAudio, setNodeAudio] = useState("");
  const [nodeFile, setNodeFile] = useState("");
  const [nodeCta, setNodeCta] = useState("");
  const [nodeCtaButton, setNodeCtaButton] = useState("");
  const [nodeButton1, setNodeButton1] = useState("");
  const [nodeButton2, setNodeButton2] = useState("");
  const [nodeButton3, setNodeButton3] = useState("");
  const [nodeFooter1, setNodeFooter1] = useState("");
  const [nodeFooter2, setNodeFooter2] = useState("");
  const [nodeFooter3, setNodeFooter3] = useState("");
  const [nodeButtons, setNodeButtons] = useState([]);
  const [nodeList, setNodeList] = useState([]);


  // Update nodes data when nodeName or selectedElements changes
  // useEffect(() => {
  //   setShowSidebar(false);

  //   if (selectedElements.length > 0) {
  //     setNodes((nds) =>
  //       nds.map((node) => {
  //         if (node.id === selectedElements[0]?.id) {
  //           node.data = {
  //             ...node.data,
  //             label: nodeName,
  //           };
  //         }
  //         return node;
  //       })
  //     );
  //   } else {
  //     setNodeName("");
  //   }
  // }, [nodeName, selectedElements, setNodes]);


  // useEffect(() => {
  //   if (selectedElements.length > 0) {
  //     setNodes((nds) =>
  //       nds.map((node) => {
  //         if (node.id === selectedElements[0]?.id) {
  //           node.data = {
  //             ...node.data,
  //             label: nodeName,
  //             image: nodeImage,
  //             link: nodeLink,
  //             video: nodeVideo,
  //             audio: nodeAudio,
  //             file: nodeFile,
  //             cta: nodeCta,
  //             ctabutton: nodeCtaButton,
  //             buttons: nodeButtons,
  //             list: nodeList,
  //             button1: nodeButton1,
  //             button2: nodeButton2,
  //             button3: nodeButton3,
  //             footer1: nodeFooter1,
  //             footer2: nodeFooter2,
  //             footer3: nodeFooter3,
  //           };
  //         }
  //         return node;
  //       })
  //     );
  //   } else {
  //     setNodeName("");
  //     setNodeImage("");
  //     setNodeLink("");
  //     setNodeOption("");
  //     setNodeVideo("");
  //     setNodeFile("");
  //     setNodeAudio("");
  //     setNodeCta("");
  //     setNodeCtaButton("");
  //     setNodeButtons([]);
  //     setNodeList([]);
  //     setNodeButton1("");
  //     setNodeButton2("");
  //     setNodeButton3("");
  //     setNodeFooter1("");
  //     setNodeFooter2("");
  //     setNodeFooter3("");
  //   }
  // }, [
  //   // selectedElements
  //   nodeName,
  //   nodeImage,
  //   nodeLink,
  //   nodeVideo,
  //   selectedElements,
  //   nodeCta,
  //   nodeCtaButton,
  //   nodeButtons,
  //   nodeList,
  //   nodeButton1,
  //   nodeButton2,
  //   nodeButton3,
  //   nodeFooter1,
  //   nodeFooter2,
  //   nodeFooter3,
  //   setNodes,
  // ]);

  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedElements[0]?.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: nodeName,
                  image: nodeImage,
                  link: nodeLink,
                  video: nodeVideo,
                  audio: nodeAudio,
                  file: nodeFile,
                  cta: nodeCta,
                  ctabutton: nodeCtaButton,
                  buttons: nodeButtons,
                  list: nodeList,
                  button1: nodeButton1,
                  button2: nodeButton2,
                  button3: nodeButton3,
                  footer1: nodeFooter1,
                  footer2: nodeFooter2,
                  footer3: nodeFooter3,
                },
              }
            : node
        )
      );
    }
  }, [
    nodeName,
    nodeImage,
    nodeLink,
    nodeVideo,
    nodeAudio,
    nodeFile,
    nodeCta,
    nodeCtaButton,
    nodeButtons,
    nodeList,
    nodeButton1,
    nodeButton2,
    nodeButton3,
    nodeFooter1,
    nodeFooter2,
    nodeFooter3,
    selectedElements,
  ]);
  
  useEffect(() => {
    if (selectedElements.length === 0) {
      setNodeName("");
      setNodeImage("");
      setNodeLink("");
      setNodeOption("");
      setNodeVideo("");
      setNodeFile("");
      setNodeAudio("");
      setNodeCta("");
      setNodeCtaButton("");
      setNodeButtons([]);
      setNodeList([]);
      setNodeButton1("");
      setNodeButton2("");
      setNodeButton3("");
      setNodeFooter1("");
      setNodeFooter2("");
      setNodeFooter3("");
    }
  }, [selectedElements]);
  

  const onNodeClick = useCallback((_event, node) => {
    setSelectedElements([node]);
    setNodeName(node.data.label || "");
    setNodeImage(node.data.image || "");
    setNodeVideo(node.data.video || "");
    setNodeAudio(node.data.audio || "");
    setNodeFile(node.data.file || "");
    setNodeCta(node.data.cta || "");
    setNodeCtaButton(node.data.ctabutton || "");
    setNodeButtons(node.data.buttons || []);
    setNodeList(node.data.list || []);
    setNodeButton1(node.data.nodebutton1 || "");
    setNodeButton2(node.data.nodebutton2 || "");
    setNodeButton3(node.data.nodebutton3 || "");
    setNodeFooter1(node.data.nodefooter1 || "");
    setNodeFooter2(node.data.nodefooter2 || "");
    setNodeFooter3(node.data.nodefooter3 || "");
    node.data.link || "";

    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, []);

  // Setup viewport
  const { setViewport } = useReactFlow();

  // Check for empty target handles
  const checkEmptyTargetHandles = () => {
    let emptyTargetHandles = 0;
    edges.forEach((edge) => {
      if (!edge.targetHandle) {
        emptyTargetHandles++;
      }
    });
    return emptyTargetHandles;
  };

  // Check if any node is unconnected
  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

  // Save flow to local storage

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();
  
      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "More than one node has an empty target handle or there are unconnected nodes.",
        });
      } else {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Save successful!",
        });
      }
    }
  }, [reactFlowInstance, nodes, isNodeUnconnected]);
  

  // Restore flow from local storage
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setViewport({ x: 10, y: 90, zoom: 0.89 }); // Adjust zoom level
    }, 0); // Increased delay for React Flow readiness
  
    return () => clearTimeout(timeout);
  }, [setViewport]); // Ensure it runs after mounting
  

  // Handle edge connection
  // const onConnect = useCallback(
  //   (params) => {
  //     console.log("Edge created: ", params);
  //     setEdges((eds) => addEdge(params, eds));
  //   },
  //   [setEdges]
  // );

  const onConnect = useCallback(
    (params) => {
      console.log("Edge created: ", params);
      setEdges((eds) =>
        addEdge({ ...params, type: "step" }, eds) // Force straight edges
      );
    },
    [setEdges]
  );
  

  // Enable drop effect on drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop event to add a new node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      console.log("Node created: ", newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const rfStyle = {
    backgroundColor: "#111827",
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const onMenuShow = () => {
    setShowSidebar(!showSidebar);
  };

  const [userData, setUserData] = useState(Data.data);

  // Function to update the user name
  const updateUserName = (newName) => {
    setUserData([...Data.data]); // Re-render by setting updated data
  };

  const edgeTypes = {
    step: CustomStraightEdge, // Register the edge
  };

  const { fitView } = useReactFlow();

  useEffect(() => {
    fitView({ padding: 0.5 }); // Adjust padding as needed
  }, []);

  
  return (
    <div className="flex flex-row min-h-screen lg:flex-row">
      {showSidebar && (
        <NodeSideBar
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeImage={nodeImage}
          setNodeImage={setNodeImage}
          nodeVideo={nodeVideo}
          setNodeVideo={setNodeVideo}
          nodeAudio={nodeAudio}
          setNodeAudio={setNodeAudio}
          nodeFile={nodeFile}
          setNodeFile={setNodeFile}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeCta={nodeCta}
          setNodeCta={setNodeCta}
          nodeCtaButton={nodeCtaButton}
          setNodeCtaButton={setNodeCtaButton}
          nodeOption={nodeOption}
          setNodeOption={setNodeOption}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) } 

      <div className="flex-grow h-screen" ref={reactFlowWrapper}>
        <ReactFlow
        //  defaultZoom={0.80}
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          edgeTypes={edgeTypes} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          style={rfStyle}
          onNodeClick={onNodeClick}
          onPaneClick={() => {
            setSelectedElements([]); // Reset selected elements when clicking on pane
            setNodes((nodes) =>
              nodes.map((n) => ({
                ...n,
                selected: false, // Reset selected state of nodes when clicking on pane
              }))
            );
          }}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          {/* <MiniMap zoomable pannable /> */}
          <Panel>
            <motion.button
              className=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={onMenuShow}
            >
              {showSidebar ? 
                <X size={16} />
                :
                <Plus size={16} />
            }
              
            </motion.button>
            <button
              className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onSave}
            >
              save flow
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onRestore}
            >
              restore flow
            </button>
          </Panel>
        </ReactFlow>
      </div>

      {selectedElements[0]?.type === "textnode" ? (
        <Sidebar
          dataUserId={dataUserId}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeImage={nodeImage}
          setNodeImage={setNodeImage}
          nodeVideo={nodeVideo}
          setNodeVideo={setNodeVideo}
          nodeAudio={nodeAudio}
          setNodeAudio={setNodeAudio}
          nodeFile={nodeFile}
          setNodeFile={setNodeFile}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) : selectedElements[0]?.type === "questionnode" ? (
        <TextSideBar
          dataUserId={dataUserId}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      )  : selectedElements[0]?.type === "questionnamenode" ? (
        <NameSidebar
        dataUserId={userData.map((user) => user.id)}
        updateUserName={updateUserName}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) 

      : selectedElements[0]?.type === "phonequestionnode" ? (
        <PhoneSidebar
        dataUserId={userData.map((user) => user.id)}
        updateUserName={updateUserName}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) 
      : selectedElements[0]?.type === "emailquestionnode" ? (
        <EmailSidebar
        dataUserId={userData.map((user) => user.id)}
        updateUserName={updateUserName}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) 
      : selectedElements[0]?.type === "askquestionnode" ? (
        <AskSidebar
        dataUserId={userData.map((user) => user.id)}
        updateUserName={updateUserName}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) 
      : selectedElements[0]?.type === "listbuttonnodde" ? (
        <ListButtonSidebar
        dataUserId={dataUserId}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeImage={nodeImage}
          setNodeImage={setNodeImage}
          nodeVideo={nodeVideo}
          setNodeVideo={setNodeVideo}
          nodeAudio={nodeAudio}
          setNodeAudio={setNodeAudio}
          nodeFile={nodeFile}
          setNodeFile={setNodeFile}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeCta={nodeCta}
          setNodeCta={setNodeCta}
          nodeCtaButton={nodeCtaButton}
          setNodeCtaButton={setNodeCtaButton}
          nodeButtons={nodeButtons}
          setNodeButtons={setNodeButtons}
          nodeList={nodeList}
          setNodeList={setNodeList}
          nodeButton1={nodeButton1}
          setNodeButton1={setNodeButton1}
          nodeButton2={nodeButton2}
          setNodeButton2={setNodeButton2}
          nodeButton3={nodeButton3}
          setNodeButton3={setNodeButton3}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      ) 
      : selectedElements[0]?.type === "textmedianode" ? (
        <TextMediaSidebar
        dataUserId={dataUserId}
        nodeName={nodeName}
        setNodeName={setNodeName}
        nodeImage={nodeImage}
        setNodeImage={setNodeImage}
        nodeVideo={nodeVideo}
        setNodeVideo={setNodeVideo}
        nodeAudio={nodeAudio}
        setNodeAudio={setNodeAudio}
        nodeFile={nodeFile}
        setNodeFile={setNodeFile}
        nodeLink={nodeLink}
        setNodeLink={setNodeLink}
        nodeFooter1={nodeFooter1}
        setNodeFooter1={setNodeFooter1}
        nodeFooter2={nodeFooter2}
        setNodeFooter2={setNodeFooter2}
        nodeFooter3={nodeFooter3}
        setNodeFooter3={setNodeFooter3}
        selectedNode={selectedElements[0]}
        setSelectedElements={setSelectedElements}
        />
      ) 
      : (
        <AdvanceSideBar
          dataUserId={dataUserId}
          nodeName={nodeName}
          setNodeName={setNodeName}
          nodeImage={nodeImage}
          setNodeImage={setNodeImage}
          nodeVideo={nodeVideo}
          setNodeVideo={setNodeVideo}
          nodeAudio={nodeAudio}
          setNodeAudio={setNodeAudio}
          nodeFile={nodeFile}
          setNodeFile={setNodeFile}
          nodeLink={nodeLink}
          setNodeLink={setNodeLink}
          nodeCta={nodeCta}
          setNodeCta={setNodeCta}
          nodeCtaButton={nodeCtaButton}
          setNodeCtaButton={setNodeCtaButton}
          nodeButtons={nodeButtons}
          setNodeButtons={setNodeButtons}
          nodeButton1={nodeButton1}
          setNodeButton1={setNodeButton1}
          nodeButton2={nodeButton2}
          setNodeButton2={setNodeButton2}
          nodeButton3={nodeButton3}
          setNodeButton3={setNodeButton3}
          nodeFooter1={nodeFooter1}
          setNodeFooter1={setNodeFooter1}
          nodeFooter2={nodeFooter2}
          setNodeFooter2={setNodeFooter2}
          nodeFooter3={nodeFooter3}
          setNodeFooter3={setNodeFooter3}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      )}
    </div>
  );
};

// Wrap App with ReactFlowProvider
function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;

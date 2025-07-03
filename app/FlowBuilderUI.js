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
import withReactContent from "sweetalert2-react-content";
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

import TimeNode from "./component/timeNode/TimeNode.js";
import TimeSidebar from "./component/timeNode/Timesidebar.js";

import TriggerNode from "./component/triggerNode/TriggerNode.js";
import TriggerSidebar from "./component/triggerNode/TriggerSidebar.js";

import ListButtonNode from "./component/advanceNode/listButtons/ListButtonNode.js";
import ListButtonSidebar from "./component/advanceNode/listButtons/ListButtonSidebar.js";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import Data from "./data/data.js";

import CryptoJS from "crypto-js";

const SECRET_KEY = "48962874218962874213689687";

// Key for local storage
const flowKey = "flow-key";

const dataUserId = Data.data.map((user) => user.id);

// Initial node setup
const initialNodes = [
  {
    id: "1",
    type: "triggernode",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;

// Function for generating unique IDs for nodes
// const getId = () => `node_${id++}`;

const App = () => {
  console.log("version 0.2");
  const token = process.env.NEXT_PUBLIC_JWT_TOKEN;
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
      timenode: TimeNode,
      triggernode: TriggerNode,
    }),
    []
  );

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const vendorId = process.env.NEXT_PUBLIC_VENDOR_ID;
  // States and hooks setup
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [decryptedData, setDecryptedData] = useState(null);
  // const [flowTitle, setFlowTitle] = useState();

  const [title, setTitle] = useState("");
  const [flowTitle, setFlowTitle] = useState("");

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

  // **Added missing scheduling-related states**
  const [waitTime, setWaitTime] = useState(2);
  const [waitUnit, setWaitUnit] = useState("Hours");
  const [resumeOption, setResumeOption] = useState("immediately");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [days, setDays] = useState({
    SUN: false,
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
  });

  const [templateData, setTemplateData] = useState();
  const [templateParams, setTemplateParams] = useState({});
  const [templateId, setTemplateId] = useState();
  const [templateName, setTemplateName] = useState("");
  const [triggerName, setTriggerName] = useState("Trigger Node");
  const [message, setMessage] = useState(null);
  // const [receivedVendorId, setRecievedVendorId] = useState();
  const [receivedVendorId1, setRecievedVendorId1] = useState();
  const idCounter = useRef(0);
  const getId = () => {
    if (nodes.length > 0) {
      // Get all numeric IDs (both "node_X" and plain numbers)
      const numericIds = nodes.map((node) => {
        if (node.id.startsWith("node_")) {
          return parseInt(node.id.replace("node_", ""), 10);
        }
        return parseInt(node.id, 10) || 0;
      });

      const maxId = Math.max(...numericIds);
      idCounter.current = maxId + 1;
    }
    return `node_${idCounter.current++}`;
  };

  useEffect(() => {
    if (nodes.length > 0) {
      const numericIds = nodes.map((node) => {
        if (node.id.startsWith("node_")) {
          return parseInt(node.id.replace("node_", ""), 10);
        }
        return parseInt(node.id, 10) || 0;
      });

      idCounter.current = Math.max(...numericIds) + 1;
    }
  }, [nodes]);

  useEffect(() => {
    if (message != null) {
      const parsedVendorId = message;
      setRecievedVendorId1(parsedVendorId);
      localStorage.setItem("vendorIdLocal", parsedVendorId);
      // setRecievedVendorId(parsedVendorId);
    }
  }, [message]);

  //console.log(message, "Recieved Message")
  const receivedVendorId = localStorage.getItem("vendorIdLocal");

  useEffect(() => {
    async function fetchMessage() {
      try {
        // const res = await fetch("http://localhost:3001/api/message");
        const res = await fetch(
          "https://flow-builder-nextjs.vercel.app/api/message"
        );
        const data = await res.json();
        setMessage(data.message || null);
      } catch (error) {
        console.error("Failed to fetch message:", error);
      }
    }
    fetchMessage();
  }, []);

  //console.log(message, "Message of the front end finally received");

  // Update node data when any of the input states change
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedElements[0]?.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  title: title,
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
                  templateParams: templateParams,
                  templateId: templateId,
                  templateName: templateName,
                  // templateData: templateData,
                  waitTime,
                  waitUnit,
                  resumeOption,
                  startTime,
                  endTime,
                  days,
                  triggerName,
                },
              }
            : node
        )
      );
    }
  }, [
    title,
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
    templateParams,
    templateId,
    templateName,
    // templateData,
    waitTime,
    waitUnit,
    resumeOption,
    startTime,
    endTime,
    days,
    selectedElements,
    triggerName,
  ]);

  // Reset states on node deselection
  useEffect(() => {
    if (selectedElements.length === 0) {
      setTitle("");
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
      setTemplateParams({});
      setTemplateId();
      setTemplateName("");
      setNodeFooter3("");
      setTriggerName("");
      // Reset scheduling data
      setWaitTime("2");
      setWaitUnit("Hours");
      setResumeOption("immediately");
      setStartTime("09:00");
      setEndTime("17:00");
      // setTemplateData([])
      setDays({
        SUN: false,
        MON: false,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
      });
    }
  }, [selectedElements]);

  // When a node is clicked
  const onNodeClick = useCallback((_event, node) => {
    setSelectedElements([node]);
    setTitle(node.data.title || "Flow Builder");
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
    setTemplateParams(node.data.templateParams || []);
    setTemplateId(node.data.templateId || null);
    setTemplateName(node.data.templateName || null);
    setNodeFooter3(node.data.nodefooter3 || "");
    setNodeLink(node.data.link || "");
    setTriggerName(node.data.triggerName || "");
    // Set scheduling data from node.data
    setWaitTime(node.data.waitTime || "2");
    // setTemplateData(node.data.templateData || [])
    setWaitUnit(node.data.waitUnit || "Hours");
    setResumeOption(node.data.resumeOption || "immediately");
    setStartTime(node.data.startTime || "09:00");
    setEndTime(node.data.endTime || "17:00");
    setDays(
      node.data.days || {
        SUN: false,
        MON: false,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
      }
    );

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
  const [dataFlowName, setDataFlowName] = useState();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (decryptedData === undefined) {
      // Show loader
      MySwal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const timer = setTimeout(() => {
        window.location.reload(); // fallback in App Router
      }, 5000);

      return () => clearTimeout(timer); // cleanup timeout on unmount or dependency change
    } else {
      Swal.close(); // hide loader

      try {
        const dataFlowName = JSON.parse(decryptedData);
        setDataFlowName(dataFlowName);
      } catch (error) {
        console.error("Error parsing decryptedData:", error);
      }
    }
  }, [decryptedData]);

  const reFetchFlow = useCallback(() => {
    // fetch(`${base_url}campaigns/1`) // Get the flow
    fetch(`${base_url}campaigns/${receivedVendorId}`) // Get the flow
      .then((response) => response.text())
      .then((responseText) => {
        try {
          const bytes = CryptoJS.AES.decrypt(responseText, SECRET_KEY);
          const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
          const parsedData = JSON.parse(decryptedText);
          //console.log("Decrypted response:", parsedData);
          setDecryptedData(parsedData?.data);
          const data = JSON.parse(parsedData?.data);
          console.log("Decrypted data:", data);
          const title = data.title;
          setFlowTitle(title);
          localStorage.setItem("flowTitle", title);
        } catch (error) {
          console.error("Decryption error:", error);
          console.error("Raw response:", responseText);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [receivedVendorId]);

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

        const payload = {
          vendors__id: receivedVendorId,
          // flow_name: "abandoned_cart",
          flow_name: `${dataFlowName?.title}`,
          flow_json: flow,
        };

        console.log(payload, "Payload Of create flow");

        fetch(`${base_url}campaigns/${receivedVendorId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: JSON.stringify(payload),
          }),
        })
          .then((res) => res.text())
          .then((encryptedResponse) => {
            updateFlow(flow);
            try {
              const bytes = CryptoJS.AES.decrypt(encryptedResponse, SECRET_KEY);
              const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
              //console.log("PUT response decrypted:", decryptedText);
            } catch (error) {
              console.error("Error decrypting PUT response:", error);
            }

            localStorage.setItem(flowKey, JSON.stringify(flow));
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Save successful!",
              confirmButtonColor: "#3085d6",
              showCancelButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            // .then((result) => {
            //   if (result.isConfirmed) {
            //     onRestore();
            //   }
            // });

            // reFetchFlow();
          })
          .catch((error) => {
            console.error("PUT error:", error);
          });
      }
    }
  }, [reactFlowInstance, nodes, edges, isNodeUnconnected, reFetchFlow]);

  //console.log(dataFlowName, "Flow Data Home UI");

  const updateFlow = async (flow) => {
    const temData = localStorage.getItem("templateData");
    const jsonTempData = JSON.parse(temData);
    const payload = {
      vendors__id: parseInt(receivedVendorId),
      // flow_name: "cod_confirm",
      flow_name: `${dataFlowName?.title}`,
      flow_json: flow,
      template_data: jsonTempData,
    };

    //console.log(payload, "Payload");

    fetch(`${base_url}automation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  };

  useEffect(() => {
    reFetchFlow();
  }, []);

  // console.log(flowTitle, "Decrypted data from the Home UI");

  useEffect(() => {
    if (decryptedData) {
      try {
        const jsonData =
          typeof decryptedData === "string"
            ? JSON.parse(decryptedData)
            : decryptedData;

        const { x = 0, y = 0, zoom = 1 } = jsonData?.json?.viewport || {};
        setNodes(jsonData?.json?.nodes || []);
        setEdges(jsonData?.json?.edges || []);
        setViewport({ x, y, zoom });
      } catch (error) {
        console.error("Invalid JSON data:", error);
      }
    }
  }, [decryptedData]);

  //console.log(decryptedData, "Decrypted data");

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
  }, [setNodes, setViewport, onSave]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setViewport({ x: 10, y: 90, zoom: 0.89 }); // Adjust zoom level
    }, 0); // Increased delay for React Flow readiness

    return () => clearTimeout(timeout);
  }, [setViewport]); // Ensure it runs after mounting

  const onConnect = useCallback(
    (params) => {
      //console.log("Edge created: ", params);
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds));
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
        id: getId(), // This will now generate proper unique IDs
        type,
        position,
        data: { label: `${type}` },
      };

      //console.log("Adding new node:", newNode); // Debug log
      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, getId]
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

  //console.log(templateData, "Template data from the Home");
  //console.log(edges, "Edges data from the Home");

  return (
    <div className="flex flex-row min-h-screen lg:flex-row">
      {showSidebar && (
        <NodeSideBar
          title={title}
          setTitle={setTitle}
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
      )}

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
              {showSidebar ? <X size={16} /> : <Plus size={16} />}
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
          setTemplateData={setTemplateData}
          templateData={templateData}
          setTemplateParams={setTemplateParams}
          templateParams={templateParams}
          setTemplateId={setTemplateId}
          templateId={templateId}
          setTemplateName={setTemplateName}
          templateName={templateName}
        />
      ) : selectedElements[0]?.type === "questionnamenode" ? (
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
      ) : selectedElements[0]?.type === "phonequestionnode" ? (
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
      ) : selectedElements[0]?.type === "emailquestionnode" ? (
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
      ) : selectedElements[0]?.type === "askquestionnode" ? (
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
      ) : selectedElements[0]?.type === "listbuttonnodde" ? (
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
      ) : selectedElements[0]?.type === "textmedianode" ? (
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
      ) : selectedElements[0]?.type === "timenode" ? (
        <TimeSidebar
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
          setNodes={setNodes}
          // NEW scheduling props
          waitTime={waitTime} // <-- Add this
          setWaitTime={setWaitTime}
          waitUnit={waitUnit}
          setWaitUnit={setWaitUnit}
          resumeOption={resumeOption}
          setResumeOption={setResumeOption}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          days={days}
          setDays={setDays}
        />
      ) : // : selectedElements[0]?.type === "triggernode" ? (
      //   <TriggerSidebar
      //     dataUserId={dataUserId}
      //     nodeName={nodeName}
      //     setNodeName={setNodeName}
      //     nodeImage={nodeImage}
      //     setNodeImage={setNodeImage}
      //     nodeVideo={nodeVideo}
      //     setNodeVideo={setNodeVideo}
      //     nodeAudio={nodeAudio}
      //     setNodeAudio={setNodeAudio}
      //     nodeFile={nodeFile}
      //     setNodeFile={setNodeFile}
      //     nodeLink={nodeLink}
      //     setNodeLink={setNodeLink}
      //     nodeFooter1={nodeFooter1}
      //     setNodeFooter1={setNodeFooter1}
      //     nodeFooter2={nodeFooter2}
      //     setNodeFooter2={setNodeFooter2}
      //     nodeFooter3={nodeFooter3}
      //     setNodeFooter3={setNodeFooter3}
      //     selectedNode={selectedElements[0]}
      //     setSelectedElements={setSelectedElements}
      //     setNodes={setNodes}
      //     // NEW scheduling props
      //     waitTime={waitTime} // <-- Add this
      //     setWaitTime={setWaitTime}
      //     waitUnit={waitUnit}
      //     setWaitUnit={setWaitUnit}
      //     resumeOption={resumeOption}
      //     setResumeOption={setResumeOption}
      //     startTime={startTime}
      //     setStartTime={setStartTime}
      //     endTime={endTime}
      //     setEndTime={setEndTime}
      //     days={days}
      //     setDays={setDays}
      //     onTriggerSelect={(label) => setTriggerName(label)}
      //   />
      // )
      selectedElements[0]?.type === "advancenode" ? (
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
      ) : null}
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

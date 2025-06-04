"use client";

import { useState, useEffect } from "react";
import { X, Edit } from "lucide-react";
import CryptoJS from "crypto-js";
import whatsappImage from "../../../../public/wa.jpg";
import placeholderImage from "../../../../public/placeholder.png";
const SECRET_KEY = "48962874218962874213689687";

export default function TextSidebar({
  nodeName,
  setNodeName,
  nodeImage,
  nodeVideo,
  setNodeImage,
  setNodeVideo,
  nodeLink,
  setNodeLink,
  selectedNode,
  setNodeOption,
  setSelectedElements,
  setTemplateData,
  templateData,
  templateParams,
  setTemplateParams,
  setTemplateId,
  templateId,
  templateName,
  setTemplateName,
}) {
  const [templateData1, setTemplateData1] = useState(null);
  const [decryptedData, setDecryptedData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [columnData, setColumnData] = useState([]);
  const [parseTemplateData, setParseTemplateData] = useState();
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const vendorId = process.env.NEXT_PUBLIC_VENDOR_ID;

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
    fetchTemplateData();
    fetchColumnData();
  }, []);

  useEffect(() => {
    if (parseTemplateData && Array.isArray(templateParams)) {
      const payload = {
        data: parseTemplateData,
        params: templateParams,
      };
      setTemplateData(payload);
      localStorage.setItem("templateData", JSON.stringify(payload));
    }
  }, [parseTemplateData, templateParams]);

  const fetchTemplateData = () => {
    const token = process.env.NEXT_PUBLIC_JWT_TOKEN;
    fetch(
      `${base_url}template/template?page=1&limit=1000&vendorId=${vendorId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.text())
      .then((encryptedResponse) => {
        const bytes = CryptoJS.AES.decrypt(encryptedResponse, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        const parsedData = JSON.parse(decryptedText);
        setDecryptedData(parsedData.data);
      })
      .catch(console.error);
  };

  const fetchColumnData = () => {
    const token = process.env.NEXT_PUBLIC_JWT_TOKEN;
    fetch(`${base_url}Template/columns`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((encryptedResponse) => {
        const bytes = CryptoJS.AES.decrypt(encryptedResponse, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        const parsedData = JSON.parse(decryptedText);
        setColumnData(parsedData.columns);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (decryptedData.length > 0 && templateId) {
      const selectedTemplate = decryptedData.find((t) => t.id === templateId);
      if (selectedTemplate) {
        setTemplateName(selectedTemplate.templateName);

        try {
          const parsedData = JSON.parse(selectedTemplate.data);
          setParseTemplateData(parsedData);

          let components = [];
          if (parsedData.template?.components) {
            components = parsedData.template.components;
          } else if (parsedData.components) {
            components = parsedData.components;
          } else if (Array.isArray(parsedData)) {
            components = parsedData;
          }

          setTemplateData1(components);

          const params = extractTemplateParameters(components);
          const formattedParams = params.map((param) => ({
            value: param,
            name: "",
            isStatic: 1, // Default to static
          }));
          setTemplateParams(formattedParams);
        } catch (err) {
          console.error("Parse error:", err);
        }
      }
    }
  }, [decryptedData, templateId]);

  const extractTemplateParameters = (components) => {
    const parameters = new Set();
    components.forEach((component) => {
      const allText = [
        component.text,
        ...(component.buttons || []).map((btn) => btn.text),
      ];
      allText.forEach((text) => {
        if (text) {
          const matches = text.match(/\{\{\s*(\d+)\s*\}\}/g);
          matches?.forEach((match) => {
            parameters.add(match.replace(/\D/g, ""));
          });
        }
      });
    });
    return Array.from(parameters).sort((a, b) => a - b);
  };

  const handleParamChange = (paramValue, newName, isStatic) => {
    setTemplateParams((prevParams) =>
      prevParams.map((item) =>
        item.value === paramValue ? { ...item, name: newName, isStatic } : item
      )
    );
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedTemplate = decryptedData.find((t) => t.id === selectedId);

    if (!selectedTemplate) return;

    setTemplateId(selectedTemplate.id);
    setTemplateName(selectedTemplate.templateName);

    try {
      const parsedData = JSON.parse(selectedTemplate.data);
      setParseTemplateData(parsedData);

      let components = [];
      if (parsedData.template?.components) {
        components = parsedData.template.components;
      } else if (parsedData.components) {
        components = parsedData.components;
      } else if (Array.isArray(parsedData)) {
        components = parsedData;
      }

      setTemplateData1(components);

      const params = extractTemplateParameters(components);
      const formattedParams = params.map((param) => ({
        value: param,
        name: "",
      }));
      setTemplateParams(formattedParams);
    } catch (err) {
      console.error("Template parsing error:", err);
      setTemplateName("");
      setTemplateParams([]);
      setParseTemplateData(null);
    }
  };

  // ---------------- Template Preview -----------------------

  // const templatePreviewData = parsedData

  const components =
    parseTemplateData?.template?.components ||
    parseTemplateData?.components ||
    [];

  const getBodyContent = (text, example) => {
    if (!example?.body_text?.[0]) return text;
    let updated = text;
    example.body_text[0].forEach((val, i) => {
      updated = updated.replace(`{{${i + 1}}}`, val);
    });
    return updated;
  };

  const getDynamicUrl = (url, example) => {
    if (!url.includes("{{")) return url;
    return url.replace(/{{(\d+)}}/g, (_, idx) => example?.[idx - 1] || "");
  };

  // In your useEffect that sets templateData
  useEffect(() => {
    if (parseTemplateData) {
      const formattedParams = Object.entries(templateParams).map(
        ([key, value]) => ({
          value: key,
          name: value,
          isStatic: 1,
        })
      );

      const payload = {
        data: parseTemplateData,
        params: templateParams,
      };

      localStorage.setItem("templateData", JSON.stringify(payload));
    }
  }, [parseTemplateData, templateParams]);

  console.log(components, "Bla Bla Bla");
  console.log(JSON.stringify(templateParams), "template Params");
  // {getBodyContent(comp.text, comp.example)}

  return (
    <>
      {selectedNode && (
        <aside
          className={`border-r p-5 text-sm w-[30%] h-screen shadow-md transition-all duration-300 flex flex-col ${
            isDarkMode
              ? "bg-white border-gray-700 text-gray-900"
              : "bg-white border-gray-700 text-gray-900"
          }`}
        >
          <div className="relative flex items-center justify-between mb-4">
            <h3
              className={`text-xl font-bold flex items-center gap-2 pr-8 ${
                isDarkMode ? "text-black" : "text-blue-900"
              }`}
            >
              <Edit className="w-5 h-5" />
              Template Node
            </h3>

            <button
              className="absolute right-0 top-1 p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
              onClick={() => setSelectedElements([])}
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <label className="block text-sm font-medium mb-1">
            Select a Template:
          </label>
          {decryptedData && decryptedData.length > 0 && (
            <select
              className="block w-full border border-gray-300 rounded-md p-2 mb-4"
              onChange={handleSelectChange}
              value={templateId || ""}
            >
              <option value="" disabled>
                Select a template
              </option>

              {decryptedData
                .filter((template) => template.templateName)
                .map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.templateName}
                  </option>
                ))}
            </select>
          )}

          {/* Display template parameters */}
          {templateData1 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Template Parameters:</h4>
              {templateParams.length > 0 &&
                templateParams
                  .sort((a, b) => a.value - b.value)
                  .map((param) => {
                    // Extract body params from BODY section
                    const bodySection = components.find(
                      (item) => item.type === "BODY"
                    );
                    const paramLabel =
                      bodySection?.example?.body_text?.[0]?.[param.value - 1] ||
                      "";

                    return (
                      <div key={param.value} className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                          Value for {`{{${param.value}}}`}{" "}
                          {paramLabel && (
                            <span className="text-gray-600">{`(${paramLabel}):`}</span>
                          )}
                          
                        </label>

                        {/* Dropdown */}
                        <select
                          className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                          value={
                            param.name &&
                            Object.keys(columnData).includes(param.name)
                              ? param.name
                              : param.isStatic === 0
                                ? "custom"
                                : ""
                          }
                          onChange={(e) => {
                            const selected = e.target.value;
                            if (selected === "custom") {
                              handleParamChange(param.value, "", 0); // custom input mode
                            } else {
                              handleParamChange(param.value, selected, 1); // static dropdown selection
                            }
                          }}
                        >
                          <option value="">Select an option</option>
                          {Object.entries(columnData).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          ))}
                          <option value="custom">Custom Input</option>
                        </select>

                        {/* Custom Input */}
                        {param.isStatic === 0 && (
                          <input
                            type="text"
                            className="block w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter custom value"
                            value={param.name}
                            onChange={(e) =>
                              handleParamChange(param.value, e.target.value, 0)
                            }
                          />
                        )}
                      </div>
                    );
                  })}

              <div
                className="p-5 rounded m-10 mx-20"
                style={{
                  backgroundImage: `url(${whatsappImage.src})`,
                  backgroundColor: "#e5ddd5",
                  backgroundRepeat: "repeat",
                  backgroundSize: "contain", // or 'auto' if your image is small
                  backgroundBlendMode: "overlay", // subtle blend with background color
                }}
              >
                <div className="bg-[#f4f4f4] p-4 rounded-lg max-w-[90%] mx-2 my-2 relative shadow border border-[#e5ddd5]">
                  {components.map((comp, index) => {
                    switch (comp.type) {
                      case "HEADER":
                        const format = comp.format;
                        const handle = comp.example?.header_handle?.[0] || null;

                        const getMediaUrlFromHandle = (handle) => {
                          if (!handle) return null;
                          const parts = handle.split(":");
                          return `https://your-media-domain.com/${parts[2]}`;
                        };

                        const mediaUrl = getMediaUrlFromHandle(handle);

                        const isValidImage = mediaUrl && mediaUrl !== "";

                        switch (format) {
                          case "TEXT":
                            return (
                              <div key={index} className="mb-2">
                                <h6 className="font-bold text-[#3b4a54] text-sm">
                                  {comp.text}
                                </h6>
                              </div>
                            );

                          case "IMAGE":
                            return (
                              <div
                                key={index}
                                className="mb-2 rounded-lg overflow-hidden"
                              >
                                <img
                                  src={placeholderImage.src}
                                  alt="Header"
                                  className="max-w-full h-auto"
                                />
                              </div>
                            );

                          case "VIDEO":
                            return (
                              <div
                                key={index}
                                className="mb-2 rounded-lg overflow-hidden"
                              >
                                <video controls className="max-w-full">
                                  <source src={mediaUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            );

                          case "DOCUMENT":
                            return (
                              <a
                                key={index}
                                href={mediaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mb-2 block font-semibold text-sm text-[#075e54]"
                              >
                                📄 {comp.text || "Download File"}
                              </a>
                            );

                          default:
                            return null;
                        }

                      case "BODY":
                        return (
                          <div key={index}>
                            <p className="text-[#3b4a54] text-sm whitespace-pre-line leading-snug">
                              {comp.text}
                            </p>
                          </div>
                        );

                      case "BUTTONS":
                        return (
                          <div key={index} className="mt-3 w-full">
                            {comp.buttons.map((btn, i) => {
                              const isLink =
                                btn.type === "URL" ||
                                btn.type === "PHONE_NUMBER" ||
                                btn.type === "COPY_CODE";

                              if (isLink) {
                                let href = "#";
                                if (btn.type === "URL")
                                  href = getDynamicUrl(btn.url, btn.example);
                                else if (btn.type === "PHONE_NUMBER")
                                  href = `tel:${btn.phone_number}`;

                                return (
                                  <a
                                    key={i}
                                    target=""
                                    rel="noopener noreferrer"
                                    className="block text-center bg-[#f4f4f4] py-2 px-3 text-sm font-medium text-sky-600 transition-colors"
                                  >
                                    {btn.text}
                                  </a>
                                );
                              }

                              return (
                                <button
                                  key={i}
                                  className="block text-center w-full py-1 bg-[#f4f4f4] px-3 text-sm font-medium text-sky-600 transition-colors"
                                >
                                  {btn.text}
                                </button>
                              );
                            })}
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}

                  {/* Message timestamp */}
                  <div className="text-right text-[0.6875rem] text-[#667781] mt-2">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}

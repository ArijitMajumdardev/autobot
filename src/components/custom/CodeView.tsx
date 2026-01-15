"use client";
import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { useMessage } from "@/context/MessageContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { Loader2Icon } from "lucide-react";
import { useUserDetail } from "@/context/UserDetailContext";
import { countToken } from "./ChatView";
import { SandPackPreviewClient } from "./SandPackPreviewClient";

const CodeView = () => {
  const { id }: { id: Id<"workspace"> } = useParams();

  const [activeTab, setActiveTab] = useState("code");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { message } = useMessage();
  const { userDetail, setUserDetail } = useUserDetail();

  const convex = useConvex();
  const updateFiles = useMutation(api.workspace.UpdateFiles);
  const UpdateTokens = useMutation(api.users.UpdateToken);

  // useEffect(() => {
  //   setActiveTab('preview')
  // },[action])

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });

    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);

    setLoading(false);
  };

  useEffect(() => {
    if (!loading && message?.length > 0) {
      const role = message[message.length - 1].role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [message, loading]);

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(message) + " " + Prompt.CODE_GEN_PROMPT;

    try {
      const res = await fetch("/api/gen-ai-code", {
        method: "POST",
        body: JSON.stringify({ prompt: PROMPT }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Final decode to flush any remaining bytes
      fullText += decoder.decode();

      console.log("Full AI Response:", fullText);

      // Clean up the response - remove markdown code fences if present
      let cleanedText = fullText.trim();
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.slice(7);
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.slice(3);
      }
      if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.slice(0, -3);
      }
      // Also handle case where response starts with just "json\n"
      if (cleanedText.startsWith("json\n")) {
        cleanedText = cleanedText.slice(5);
      }
      cleanedText = cleanedText.trim();

      const aiResp = JSON.parse(cleanedText);

      // Check if response is an error
      if (aiResp.error) {
        console.error("AI Error:", aiResp.message);
        setLoading(false);
        return;
      }

      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp.files };

      setFiles(mergedFiles);
      await updateFiles({
        workspaceId: id,
        files: mergedFiles,
      });
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-full bg-[#181818] borfer p-2">
        <div className="flex flex-wrap items-center justify-center shrink-0 bg-black p-1 w-[140px] gap-3  rounded-full">
          <h2
            className={`text-sm cursor-pointer 
            ${activeTab == "code" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`text-sm cursor-pointer 
            ${activeTab == "preview" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        files={files}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "75vh" }} />
              <SandpackCodeEditor style={{ height: "75vh" }} />
            </>
          ) : (
            <>
              <SandPackPreviewClient />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 h-full w-full rounded-lg flex justify-center items-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white ">Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;

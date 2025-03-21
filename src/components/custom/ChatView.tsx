"use client";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useMessage } from "@/context/MessageContext";
import Colors from "@/data/Colors";
import { useUserDetail } from "@/context/UserDetailContext";
import Image from "next/image";
import Lookup from "@/data/Lookup";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Prompt from "@/data/Prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";

interface AIResponse {
  result: string;
}

export const countToken = (inputText: string) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id }: { id: Id<"workspace"> } = useParams();
  const convex = useConvex();
  const { message, setMessage } = useMessage();
  const { userDetail, setUserDetail } = useUserDetail();
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const UpdateMessage = useMutation(api.workspace.UpdateMessage);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ensure `id` is a string and cast it to the expected type
    if (typeof id === "string") {
      GetWorkspaceData(); // Casting `id` to match `Id<"workspace">`
    }
  }, []);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessage((prev) => (prev.length > 0 ? prev : result?.messages));
    console.log(result);
  };

  useEffect(() => {
    console.log("runnung g");
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark as rendered
      return; // Skip the first execution
    }
    if (!loading && message?.length > 0) {
      const role = message[message.length - 1].role;
      if (role === "user") {
        GetAIResponse();
      }
    }
  }, [message, loading]);

  const GetAIResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;
    const result = await axios.post<AIResponse>("/api/ai-chat", {
      prompt: PROMPT,
    });

    const aiResp = {
      role: "ai",
      content: result.data.result,
    };

    console.log(aiResp);

    setMessage((prev) => [...prev, aiResp]);

    await UpdateMessage({
      messages: [...message, aiResp],
      workspaceId: id,
    });

    // update the tokens in the user table

    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));

    await UpdateTokens({
      token: token,
      userId: userDetail?._id as Id<"users">,
    });

    setUserDetail((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        token: token,
      };
    });

    setLoading(false);
  };

  const onGenerate = (input: string) => {
    if (Number(userDetail?.token) < 10) {
      toast("You Don't Have Enough Tokens !");
      return;
    }
    setMessage((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };
  return (
    <div className="relative h-[80vh] flex flex-col ml-3 ">
      <div className="flex-1 overflow-y-scroll scrollbar-hide  ">
        {message?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-center justify-start leading-7  "
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            {msg?.role === "user" && userDetail?.image && (
              <Image
                src={userDetail.image}
                alt="User Image"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}

            <ReactMarkdown className="flex flex-col">
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>
      {/* input section */}
      <div className="flex gap-2 items-end">
        {/* {userDetail && (
          <Image
            className="rounded-full cursor-pointer"
            onClick={toggleSidebar}
            src={userDetail.image as string}
            width={30}
            height={30}
            alt="logo"
          />
        )} */}

        <div className="p-5 w-full border max-w-xl rounded-xl mt-3 bg-zinc-800 group focus-within:bg-zinc-700 transition-colors duration-150 ">
          <div className="flex gap-2 ">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="w-full h-32 resize-none max-h-52 bg-transparent outline-none"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="h-10 w-10 p-2 hover:bg-rose-500 rounded-md cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

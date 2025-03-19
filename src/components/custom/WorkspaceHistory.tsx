"use client";
import { useUserDetail } from "@/context/UserDetailContext";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

export const WorkspaceHistory = () => {
  const [workspaceList, setWorkspaceList] = useState<any>();
  const { userDetail } = useUserDetail();
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id as Id<"users">,
    });

    setWorkspaceList(result);
    console.log(result);
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div>
        {workspaceList &&
          workspaceList?.map((workspace: any, index: number) => (
            <Link key={index} href={"/workspace/" + workspace._id}>
              <h2
                onClick={toggleSidebar}
                className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer"
              >
                {workspace?.messages[0].content}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

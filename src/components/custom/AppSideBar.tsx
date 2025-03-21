import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode, PanelLeftClose } from "lucide-react";
import { WorkspaceHistory } from "./WorkspaceHistory";
import SideFooter from "./SideFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMessage } from "@/context/MessageContext";

const AppSideBar = ({ className }: { className: string }) => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const { setMessage } = useMessage();

  const handleNewChat = () => {
    router.push("/");
    setMessage([]);
    toggleSidebar();
  };
  return (
    <Sidebar className={`${className}`}>
      <SidebarHeader className="p-5">
        <div className="flex justify-end">
          <PanelLeftClose onClick={toggleSidebar} />
        </div>

        <Button className="mt-5 w-full" onClick={handleNewChat}>
          <MessageCircleCode /> Start New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5 scrollbar-hide">
        <SidebarGroup />
        <WorkspaceHistory />
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;

"use client";

import { getUserInfo } from "@/services/auth.service";
import useLogOut from "@/utils/logOut";
import { message } from "antd";
import { useEffect } from "react";

interface SAdminLayout {
  children: React.ReactNode;
}

const { role } = getUserInfo() as any;

const SAdminDashBoardLayout = ({ children }: SAdminLayout) => {
  const logout = useLogOut();

  useEffect(() => {
    if (role !== "super_admin") {
      logout();
      message.error("You are not authorized to access this page");
    }
  }, [logout]);

  return children;
};

export default SAdminDashBoardLayout;

"use client";

import { getUserInfo } from "@/services/auth.service";
import useLogOut from "@/utils/logOut";
import { message } from "antd";
import { useEffect } from "react";

interface CustomerDashBoardLayoutProps {
  children: React.ReactNode;
}

const { role } = getUserInfo() as any;

const CustomerDashBoardLayout = ({
  children,
}: CustomerDashBoardLayoutProps) => {
  const logout = useLogOut();

  useEffect(() => {
    if (role !== "customer") {
      logout();
      message.error("You are not authorized to access this page");
    }
  }, [logout]);

  return children;
};

export default CustomerDashBoardLayout;

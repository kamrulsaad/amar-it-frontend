"use client";

import { menuItems } from "@/constants/menuItems";
import { getUserInfo } from "@/services/auth.service";
import { Menu } from "antd";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicMenu = () => {
  const { role } = getUserInfo() as any;

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="mobile-hidden w-full">
      <Menu
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottom: "none",
          width: "100%",
        }}
        defaultSelectedKeys={["Home"]}
        mode="horizontal"
        items={menuItems(role as string)}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(DynamicMenu), { ssr: false });

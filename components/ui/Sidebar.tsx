"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";

const { Sider } = Layout;

const { role } = getUserInfo() as any;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          margin: "1rem 0",
        }}
      >
        {collapsed ? "UMS" : "UMS - PHero"}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;

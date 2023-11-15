"use client";

import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebarItems";
import Image from "next/legacy/image";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { role } = getUserInfo() as any;

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
    getUserInfo();
  }, []);

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
        <Link href={`/`}>
          <Image
            src={collapsed ? "/favicon.png" : "/dark_logo.png"}
            alt="logo"
            width={collapsed ? 40 : 100}
            height={40}
          />
        </Link>
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

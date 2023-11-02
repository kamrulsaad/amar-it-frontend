"use client";

import items from "@/constants/menuItems";
import { Menu } from "antd";
import dynamic from "next/dynamic";

const DynamicMenu = () => {

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
        items={items}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(DynamicMenu), { ssr: false });

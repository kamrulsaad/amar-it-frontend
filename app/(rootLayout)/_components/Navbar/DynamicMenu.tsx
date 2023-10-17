"use client";

import items from "@/constants/menuItems";
import { Menu } from "antd";
import dynamic from "next/dynamic";

const DynamicMenu = () => {
  return (
    <div>
      <Menu
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(DynamicMenu), { ssr: false });

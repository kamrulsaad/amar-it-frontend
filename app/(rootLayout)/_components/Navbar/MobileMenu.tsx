"use client";

import items from "@/constants/menuItems";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";

const MobileMenu = () => {
  const [isSlideIn, setIsSlideIn] = useState<boolean>(false);

  return (
    <div>
      <MenuFoldOutlined
        onClick={() => setIsSlideIn(true)}
        className="cursor-pointer text-2xl"
      />
      <div
        className={`bg-white absolute top-0 w-screen right-0 min-h-screen transition-transform transform ${
          isSlideIn
            ? "translate-x-0 ease-in duration-300"
            : "translate-x-full ease-out duration-300"
        }`}
      >
        <div className="p-4">
          <Button onClick={() => setIsSlideIn(false)}>X</Button>
          <Menu mode="inline" items={items} />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MobileMenu), { ssr: false });

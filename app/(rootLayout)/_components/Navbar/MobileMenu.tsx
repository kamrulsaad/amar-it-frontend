"use client";

import items from "@/constants/menuItems";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="mobileVisible">
      <Button type="primary" onClick={showDrawer}>
        <MenuFoldOutlined />
      </Button>
      <Drawer placement="right" onClose={onClose} open={visible}>
        <nav>
          <Menu
            style={{
              borderBottom: "none",
              width: "100%",
            }}
            defaultSelectedKeys={["Home"]}
            mode="inline"
            items={items}
          />
        </nav>
      </Drawer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MobileMenu), { ssr: false });

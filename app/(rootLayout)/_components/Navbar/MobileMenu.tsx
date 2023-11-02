"use client";
import { menuItems } from "@/constants/menuItems";
import { useAppSelector } from "@/redux/hooks";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";

const MobileMenu = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const { role } = useAppSelector((state) => state.auth)

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
            items={menuItems(role as string)}
          />
        </nav>
      </Drawer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MobileMenu), { ssr: false });

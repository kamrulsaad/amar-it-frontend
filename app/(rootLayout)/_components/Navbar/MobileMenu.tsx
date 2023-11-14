"use client";

import { menuItems } from "@/constants/menuItems";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const { role: userRole } = getUserInfo() as any;

    setRole(userRole);
  }, []);

  return (
    <div className="mobileVisible">
      <Button type="primary" onClick={showDrawer}>
        <MenuFoldOutlined />
      </Button>
      <Drawer placement="right" onClose={onClose} open={visible}>
        <nav>
          <Menu
            style={{
              width: "100%",
              borderRight: "none",
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

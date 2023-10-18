"use client";

import items from "@/constants/menuItems";
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

  return (
    <div className="mobileVisible">
      <Button type="primary" onClick={showDrawer}>
        <MenuFoldOutlined />
      </Button>
      <Drawer placement="right" onClose={onClose} visible={visible}>
        <nav>
          {/* <ul>
                
                <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/">Home</NavLink></li>
                <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/about">About</NavLink></li>
                <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/shop">Shop</NavLink></li>
                <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/faq">FAQ</NavLink></li>
                <li><NavLink onClick={onClose} to="/demo/react/antdesign/grocery/contact">Contact</NavLink></li>
              </ul> */}
        </nav>
      </Drawer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MobileMenu), { ssr: false });

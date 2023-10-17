"use client";

import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Menu, MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dynamic from "next/dynamic";

const user = getUserInfo() as any;

const items: MenuProps["items"] = [
  {
    label: "User",
    key: "SubMenu",
    icon: <UserOutlined />,
    children: [
      {
        label: (
          <Link href="/dashboard" target="_blank">
            Dashboard
          </Link>
        ),
        icon: <PicLeftOutlined />,
        key: "setting:2",
      },
      {
        label: <Link href="/logout">Log out</Link>,
        icon: <LogoutOutlined />,
        key: "setting:1",
      },
      {
        label: <Link href={`/${user.role}/profile`}>Dashboard</Link>,
        key: "setting:3",
      },
    ],
  },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: 'alipay',
  // },
];

const DynamicMenu = () => {
  const userLoggedIn = isLoggedIn();

  return (
    <div>
      {userLoggedIn ? (
        <Menu mode="horizontal" items={items} />
      ) : (
        <>
          <Button type="primary" size="large">
            <Link href="/login">Login</Link>
          </Button>
          <Button type="primary" size="large">
            <Link href="/register">Register</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(DynamicMenu), { ssr: false });

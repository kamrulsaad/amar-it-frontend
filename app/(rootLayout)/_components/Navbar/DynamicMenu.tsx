"use client";

import { isLoggedIn } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const DynamicMenu = () => {
  const userLoggedIn = isLoggedIn();

  return (
    <div>
      {userLoggedIn ? (
        <>
        <Button type="primary" size="large">
            <Link href="/dashboard">Dashboard</Link>
        </Button>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default DynamicMenu;

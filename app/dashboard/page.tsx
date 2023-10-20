"use client";

import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { role } = getUserInfo() as any;

  useEffect(() => {
    router.push("/dashboard/" + role);
  }, [role, router]);

  return;
};

export default Dashboard;

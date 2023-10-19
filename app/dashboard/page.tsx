"use client";

import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { role } = getUserInfo() as any;
  return router.push("/dashboard/" + role);
};

export default Dashboard;

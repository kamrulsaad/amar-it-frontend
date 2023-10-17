import Login from "@/components/Login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - University Management System",
  description: "University Management System - Programming Hero",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

import Login from "@/components/Login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Amar IT",
  description: "Login to Amar IT",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

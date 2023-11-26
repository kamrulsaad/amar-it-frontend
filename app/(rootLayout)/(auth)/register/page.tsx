import CustomerRegistration from "@/components/Registration/CustomerRegistration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Amar IT",
  description: "Register to Amar IT",
};

const RegisterPage = () => {
  return <CustomerRegistration />;
};

export default RegisterPage;

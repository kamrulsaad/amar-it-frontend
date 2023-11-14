import { Metadata } from "next";

interface CartLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Cart | Amar IT",
  description: "Cart page",
};

const CartLayout = ({ children }: CartLayoutProps) => {
  return children;
};

export default CartLayout;

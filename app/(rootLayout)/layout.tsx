import Container from "@/components/Container";
import Navbar from "./_components/Navbar/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};

export default RootLayout;

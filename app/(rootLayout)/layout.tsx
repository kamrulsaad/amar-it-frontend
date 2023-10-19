import Container from "@/components/Container";
import Navbar from "./_components/Navbar/Navbar";
import HomeFooter from "./_components/Footer/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
      <HomeFooter />
    </div>
  );
};

export default RootLayout;

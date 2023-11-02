import Container from "@/components/Container";
import Image from "next/image";
import DynamicMenu from "./DynamicMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <header
      style={{
        minHeight: "80px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #eaeaea",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#fff",
        padding: "0 1rem",
      }}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Image
            src={"/logo.png"}
            width={160}
            height={60}
            alt="Amar IT Logo"
            priority
          />
          <DynamicMenu />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;

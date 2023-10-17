import Container from "@/components/Container";
import Image from "next/image";
import DynamicMenu from "./DynamicMenu";

const Navbar = () => {
  return (
    <header className="py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Image
              src={"/logo.png"}
              width={160}
              height={60}
              alt="Amar IT Logo"
              priority
            />
          </div>
          {/* Menus */}
          <div></div>
          <DynamicMenu />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;

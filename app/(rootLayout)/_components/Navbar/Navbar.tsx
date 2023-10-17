import Container from "@/components/Container";
import Image from "next/image";
import DynamicMenu from "./DynamicMenu";
import MobileMenu from "./MobileMenu";

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
          <div className="hidden md:block">
            <DynamicMenu />
          </div>
          <div className="md:hidden">
              <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;

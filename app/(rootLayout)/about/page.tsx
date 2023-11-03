import { Metadata } from "next";
import About from "../_components/about/About";

export const metadata: Metadata = {
  title: "About Us | Amar IT",
  description: "The best internet service provider",
};

const AboutPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <About />
    </div>
  );
};

export default AboutPage;

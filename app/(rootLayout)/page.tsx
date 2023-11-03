import Header from "./_components/Header/Header";
import Service from "./_components/Services/Service";
import UpcomingService from "./_components/Upcoming/Upcoming";
import About from "./_components/about/About";
import HowItWorks from "./_components/How-It-Works/how-it-works";
import FAQ from "./_components/FAQ/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Amar IT",
  description: "The best internet service provider",
};

const HomePage = () => {
  return (
    <main>
      <Header />
      <About />
      <Service />
      <HowItWorks />
      <UpcomingService />
      <FAQ />
    </main>
  );
};

export default HomePage;

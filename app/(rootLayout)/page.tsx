import Header from "./_components/Header/Header";
import Service from "./_components/Services/Service";
import UpcomingService from "./_components/Upcoming/Upcoming";
import StatisticSection from "./_components/Statistics/Statistics";
import { Divider } from "antd";
import About from "./_components/about/About";
import HowItWorks from "./_components/How-It-Works/how-it-works";
import FAQ from "./_components/FAQ/faq";

const HomePage = () => {
  return (
    <main>
      <Header />
      <About />
      <Service />
      <HowItWorks />
      <UpcomingService />
      <FAQ />
      {/* <Divider /> */}
      {/* <StatisticSection /> */}
      {/* <Divider /> */}
    </main>
  );
};

export default HomePage;

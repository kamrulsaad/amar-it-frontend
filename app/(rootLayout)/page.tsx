import Header from "./_components/Header/Header";
import Service from "./_components/Services/Service";
import UpcomingService from "./_components/Upcoming/Upcoming";
import StatisticSection from "./_components/Statistics/Statistics";
import { Divider } from "antd";
import About from "./_components/about/About";

const HomePage = () => {
  return (
    <main>
      <Header />
      <About />
      <Service />
      {/* <Divider />
      <UpcomingService />
      <Divider />
      <StatisticSection />
      <Divider /> */}
    </main>
  );
};

export default HomePage;

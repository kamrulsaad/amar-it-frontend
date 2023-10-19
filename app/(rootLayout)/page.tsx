import Header from "./_components/Header/Header";
import Service from "./_components/Services/Service";
import UpcomingService from "./_components/Upcoming/Upcoming";
import StatisticSection from "./_components/Statistics/Statistics";
import { Divider } from "antd";

const HomePage = () => {
  return (
    <main>
      <Header />
      <Divider />
      <Service />
      <Divider />
      <UpcomingService />
      <Divider />
      <StatisticSection />
      <Divider />
    </main>
  );
};

export default HomePage;

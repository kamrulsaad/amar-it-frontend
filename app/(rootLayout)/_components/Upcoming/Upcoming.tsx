import { Button, Col, Row } from "antd";
import { IService } from "@/types";
import ServiceCard from "../Services/ServiceCard";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services?status=upcoming&limit=3&sortBy=charge&sortOrder=asc`,
    {
      cache: "no-cache",
    }
  );

  const response = await res.json();
  if (response && response.success) {
    return response.data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

const UpcomingService = async () => {
  const data = await getData();

  return (
    <div className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Upcoming Services</h2>
        </div>
        <Row gutter={[16, 16]}>
          {data.map((service: IService, index: number) => (
            <Col
              key={service.id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
            >
              <ServiceCard index={index} service={service} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UpcomingService;

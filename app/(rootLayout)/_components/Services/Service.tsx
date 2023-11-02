import { Button, Card, Col, Row } from "antd";
import ServiceCard from "./ServiceCard";
import { IService } from "@/types";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services?status=active&limit=6`,
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

const Service = async () => {
  const data = await getData();

  return (
    <div className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Popular Services</h2>
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

export default Service;


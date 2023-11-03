import { Button, Col, Row } from "antd";
import { IService } from "@/types";
import ServiceCard from "../_components/Services/ServiceCard";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services?page=1&limit=100`,
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

const ServicePage = async () => {
  const data = await getData();

  return (
    <main
      style={{
        minHeight: "100vh",
        marginBottom: "20px",
      }}
    >
      <div className="block featureBlock bgGray">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Our Services</h2>
          </div>
          <Row gutter={[16, 16]}>
            {data.map((service: IService, index: number) => (
              <Col
                key={service.id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <ServiceCard servicePage index={index} service={service} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </main>
  );
};

export default ServicePage;

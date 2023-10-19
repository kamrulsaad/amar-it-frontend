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
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Our Services
      </h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {data.map((service: IService) => (
          <Col key={service.id} className="gutter-row" span={8}>
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default ServicePage;

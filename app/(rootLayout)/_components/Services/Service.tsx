import { Button, Col, Row } from "antd";
import ServiceCard from "./ServiceCard";
import { IService } from "@/types";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services?status=active`,
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

  const slicedData = data.slice(0, 4);

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Our Services
      </h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          {slicedData.map((service: IService) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Col>
      </Row>
      <Button
        style={{
          display: "block",
          margin: "auto",
          marginTop: "10px",
        }}
        type="primary"
        size="large"
      >
        See More
      </Button>
    </div>
  );
};

export default Service;

import { Button, Col, Row } from "antd";
import { IService } from "@/types";
import ServiceCard from "../Services/ServiceCard";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services?status=upcoming`,
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

  const slicedData = data.slice(0, 4);

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Upcoming Services
      </h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {slicedData.map((service: IService) => (
          <Col key={service.id} className="gutter-row" span={6}>
            <ServiceCard service={service} />
          </Col>
        ))}
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

export default UpcomingService;

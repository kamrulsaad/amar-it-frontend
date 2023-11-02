import { Button, Card, Col, Row } from "antd";
import ServiceCard from "./ServiceCard";
import { IService } from "@/types";
import Meta from "antd/es/card/Meta";

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
    <div id="feature" className="block featureBlock bgGray">
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

// cover={<img alt="Modern Design" src={image1} />}

{
  /* <div className="bgGray">
    //   <div className="titleHolder">
    //       <h2>Our Services</h2>
    //     </div>
    //   <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    //     {slicedData.map((service: IService) => (
    //       <Col key={service.id} className="gutter-row" span={6}>
    //         <ServiceCard service={service} />
    //       </Col>
    //     ))}
    //   </Row>
    //   <Button
    //     style={{
    //       display: "block",
    //       margin: "auto",
    //       marginTop: "10px",
    //     }}
    //     type="primary"
    //     size="large"
    //   >
    //     See More
    //   </Button>
    // </div> */
}

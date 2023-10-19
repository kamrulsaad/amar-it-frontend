import { Col, Row, Statistic } from "antd";

const StatisticSection = () => (
  <div style={{
    marginTop: "20px",
    marginBottom: "20px",
  }}>
    <h2 style={{
        textAlign: "center",
        margin: "20px 0",
        textDecoration: "underline",
    }}>
        Statistics
    </h2>
    <Row justify={"center"} style={{
        margin: "20px 0",
    }}>
      <Col span={6}>
        <Statistic
          style={{
            textAlign: "center",
          }}
          title="Active Users"
          value={112893}
        />
      </Col>
      <Col span={6}>
        <Statistic
          style={{
            textAlign: "center",
          }}
          title="Account Balance (CNY)"
          value={112893}
          precision={2}
        />
      </Col>
      <Col span={6}>
        <Statistic
          style={{
            textAlign: "center",
          }}
          title="Account Balance (CNY)"
          value={112893}
          precision={2}
        />
      </Col>
      <Col span={6}>
        <Statistic
          style={{
            textAlign: "center",
          }}
          title="Account Balance (CNY)"
          value={112893}
          precision={2}
        />
      </Col>
    </Row>
  </div>
);

export default StatisticSection;

import React from "react";
import { Alert, Row, Space, Spin } from "antd";

const Loading: React.FC = () => (
  <Row
    align={"middle"}
    justify={"center"}
    style={{ width: "100%", minHeight: "100vh" }}
  >
    <Space>
      <Spin size="large" />
    </Space>
  </Row>
);

export default Loading;

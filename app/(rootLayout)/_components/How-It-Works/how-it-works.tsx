"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";

const HowItWorks = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="block worksBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>How it works</h2>
          <p>Check our latest video to know how it works</p>
        </div>
        <div className="contentHolder">
          <Button size="large" onClick={showModal}>
            <PlayCircleOutlined />
          </Button>
        </div>
        <Modal
          title="Watch this video to understand how this works"
          onCancel={handleCancel}
          open={visible}
          footer={null}
          destroyOnClose={true}
        >
          <iframe
            title="Project Demo"
            width="100%"
            height="350"
            src="https://www.youtube-nocookie.com/embed/Tn6-PIqc4UM?si=7_DkHmgVTxge9nyC"
          ></iframe>
        </Modal>
      </div>
    </div>
  );
};

export default HowItWorks;

"use client";

import { IService } from "@/types";
import { Badge, Button, Card, Divider, Space } from "antd";

const ServiceCard = ({ service }: { service: IService }) => {
  return (
    <Space direction="vertical" size={'middle'} style={{
        width: '100%',
    }}>
      <Badge.Ribbon
        text={service.status}
        color={service.status === "active" ? "green" : "red"}
        style={{
            zIndex: 1,
        }}
      />
      <Card
        style={{
          textAlign: "center",
        }}
        title={service.title}
        hoverable
        cover
      >
        <h3>Features</h3>
        {service?.features.map((feature: string) => (
          <p key={feature}>{feature}</p>
        ))}
        <Divider />
        <p>
          Only @ <b>{service.charge}</b> ৳{" "}
        </p>
        {
            service.status === 'active' ? (
                <Button type="primary" size="large">
                Book Now
                </Button>
            ) : (
               <></>
            )
        }
      </Card>
    </Space>
  );
};

export default ServiceCard;

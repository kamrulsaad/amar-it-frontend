"use client";

import { useAppDispatch } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { Badge, Button, Card, Divider, Space, message } from "antd";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/features/cartSlice";

const ServiceCard = ({ service }: { service: IService }) => {
  const user = getUserInfo() as any;
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (!user.username) return router.push("/login");
    if (user.role !== "customer")
      return message.error("Only customers can add to cart");

    dispatch(addToCart(service));
    message.success("Added to cart");
    router.push("/cart");
  };

  return (
    <Space
      direction="vertical"
      size={"middle"}
      style={{
        width: "100%",
      }}
    >
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
        {service.status === "active" ? (
          <Button onClick={handleAddToCart} type="primary" size="large">
            Add to Cart
          </Button>
        ) : (
          <></>
        )}
      </Card>
    </Space>
  );
};

export default ServiceCard;

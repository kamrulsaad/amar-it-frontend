"use client";

import { useAppDispatch } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { Badge, Button, Card, Divider, Space, message } from "antd";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/features/cartSlice";
import getRandomImage from "@/utils/randomImage";
import Image from "next/image";
import Meta from "antd/es/card/Meta";

const ServiceCard = ({
  service,
  index,
}: {
  service: IService;
  index: number;
}) => {
  const user = getUserInfo() as any;
  const router = useRouter();

  const randomImage = getRandomImage(index);

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
      {service.status === "upcoming" && (
        <Badge.Ribbon
          text={service.status}
          color={"#5800ff"}
          style={{
            zIndex: 1,
          }}
        />
      )}
      <Card
        style={{
          textAlign: "center",
        }}
        hoverable
        cover={
          <Image
            src={randomImage}
            alt={service.title}
            width="260"
            height={250}
          />
        }
      >
        <h3
          style={{
            fontSize: "1.4rem",
          }}
        >
          {service.title}{" "}
        </h3>
        {service?.features.map((feature: string) => (
          <p
            style={{
              fontSize: "1.1rem",
            }}
            key={feature}
          >
            {feature}
          </p>
        ))}
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            <b>${service.charge}</b>{" "}
          </p>
          {service.status === "active" ? (
            <Button onClick={handleAddToCart} type="primary" size="large">
              Add to Cart
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Card>
    </Space>
  );
};

export default ServiceCard;

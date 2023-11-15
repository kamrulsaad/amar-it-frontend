import { IService } from "@/types";
import { Divider } from "antd";

interface CartServiceCardProps {
  service: IService;
}

const CartServiceCard = ({ service }: CartServiceCardProps) => {
  return (
    <div
      className="md:w-[70%] w-full"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "5px solid #ddd",
        padding: "20px 40px",
      }}
    >
      <h3
        style={{
          margin: "20px 0",
        }}
      >
        {service?.title}
      </h3>
      <p
        style={{
          margin: "20px 0",
        }}
      >
        {service?.description} <br />
      </p>
      {service?.features?.map((feature: string) => (
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
      <p
        style={{
          margin: "20px 0",
        }}
      >
        Only @ <b> {service?.charge} </b> <br />
      </p>
    </div>
  );
};

export default CartServiceCard;

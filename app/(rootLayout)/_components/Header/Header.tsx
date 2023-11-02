import { Carousel } from "antd";
import CarouselItems from "./CarouselItems";
import Container from "@/components/Container";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/home-banner`,
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

const Header = async () => {
  const data = await getData();

  return (
    <div className="heroBlock">
      <Container>
        <Carousel effect="fade" dots={false} autoplay>
          {data.map((item: any) => (
            <CarouselItems key={item.id} item={item} />
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Header;

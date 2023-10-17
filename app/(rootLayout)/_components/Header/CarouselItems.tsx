import { IHomeBannerContent } from "@/types";
import { Button, FloatButton } from "antd";
import Image from "next/image";
import Link from "next/link";

interface CarouselItemsProps {
  item: IHomeBannerContent;
}

const CarouselItems = ({ item }: CarouselItemsProps) => {
  return (
    <div className="md:flex md:min-h-[calc(100vh-95px)] justify-between mx-auto w-full items-center">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold">{item.title}</h2>
        <p className="text-xl font-light">{item.content}</p>
        <Button type="primary" size="large">
          <Link href={"/services"}>Our Services</Link>
        </Button>
      </div>
      <div>
        <Image
          src={item.image}
          width={600}
          height={600}
          alt={item.title}
          priority
        />
      </div>
    </div>
  );
};

export default CarouselItems;

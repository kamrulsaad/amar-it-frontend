
import { IHomeBannerContent } from "@/types";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

interface CarouselItemsProps {
  item: IHomeBannerContent;
}

const CarouselItems = ({ item }: CarouselItemsProps) => {
  return (
    <div className="flex px-4 xl:px-0 flex-col md:flex-row gap-4 md:min-h-[calc(100vh-95px)] mt-10 md:mt-0 md:justify-between mx-auto w-full items-center">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold">{item.title}</h2>
        <p className="text-xl max-w-2xl font-light">{item.content}</p>
        <Button type="primary" size="large">
          <Link href={"/services"}>Learn More</Link>
        </Button>
      </div>
      <div className="relative">
        <Image
          src={item.image}
          alt={item.title}
          fetchPriority="high"
          width={500}
          height={500}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
    </div>
  );
};

export default CarouselItems;

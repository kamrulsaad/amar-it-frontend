import { IBlog } from "@/types";
import { Card } from "antd";
import Image from "next/legacy/image";
import Link from "next/link";
import Meta from "antd/es/card/Meta";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <Image
          src={blog.image}
          alt={blog.title}
          objectFit="cover"
          width={320}
          height={180}
        />
      }
      actions={[
        <Link href={`/blogs/${blog.id}`} key={"1"}>
          Read More
        </Link>,
      ]}
    >
      <Meta
        title={blog.title}
        description={blog.content.slice(0, 100) + "..."}
      />
    </Card>
  );
};

export default BlogCard;

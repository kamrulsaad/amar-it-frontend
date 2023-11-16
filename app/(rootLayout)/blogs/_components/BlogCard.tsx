import { IBlog } from "@/types";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import Meta from "antd/es/card/Meta";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <Card
      style={{ width: "100%", marginBottom: "20px" }}
      cover={
        <Image
          src={blog.image}
          alt={blog.title}
          width={320}
          height={180}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
          }}
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
        description={blog.content.slice(0, 80) + "..."}
      />
    </Card>
  );
};

export default BlogCard;

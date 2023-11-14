import { IBlog } from "@/types";
import { Col, Row } from "antd";
import BlogCard from "./_components/BlogCard";
import { Metadata } from "next";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?page=1&limit=100`,
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

export const metadata: Metadata = {
  title: "Blog | Amar IT",
  description: "The best internet service provider",
};

const BlogPage = async () => {
  const data = await getData();

  return (
    <main
      style={{
        minHeight: "100vh",
        marginBottom: "20px",
      }}
    >
      <div className="block featureBlock bgGray">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Our Services</h2>
          </div>
          <Row gutter={24}>
            {data.map((service: IBlog) => (
              <Col
                key={service.id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <BlogCard blog={service} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;

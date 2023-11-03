import Container from "@/components/Container";
import dayjs from "dayjs";
import Image from "next/image";

interface BlogDetailsProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${id}`,
    {
      cache: "default",
    }
  );

  const response = await res.json();
  if (response && response.success) {
    return response.data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

const BlogDetails = async ({ params: { id } }: BlogDetailsProps) => {
  const data = await getData(id);

  return (
    <main className="bgGray pt-4 min-h-screen">
      <Container>
        <div className="md:flex gap-x-4 px-2 md:px-0">
          <div>
            <Image
              className="rounded-lg"
              src={data.image}
              alt={data.title}
              width={500}
              height={300}
              layout="intrinsic"
              fetchPriority="high"
            />
            <div>
              <p>Category: {data.blogCategory.title}</p>
              <p>
                Date: {dayjs(data.createdAt).format("DD MMMM YYYY, h:mm:ss a")}
              </p>
            </div>
          </div>
          <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default BlogDetails;

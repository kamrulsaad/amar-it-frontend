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
        <Image
          className="rounded-lg relative max-w-7xl px-4 xl:px-0 mx-auto w-full xs:max-h-[50vh] md:max-h-[70vh] max-h-[30vh]"
          src={data.image}
          alt={data.title}
          fill={true}
          objectFit="cover"
          fetchPriority="high"
        />
        <h1>{data.title}</h1>
        <p className="text-xs mb-4">
          {" "}
          <b>Category:</b> {data.blogCategory.title} |{" "}
          <b>Date:</b> {dayjs(data.createdAt).format("DD MMMM YYYY, h:mm:ss a")}
        </p>
        <p>{data.content}</p>
      </Container>
    </main>
  );
};

export default BlogDetails;

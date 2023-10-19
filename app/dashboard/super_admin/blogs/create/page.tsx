"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { Button, Col, Row, message } from "antd";
import {
  useCreateBlogCategoryMutation,
  useGetBlogCategoriesQuery,
} from "@/redux/api/blog-category/blogCategory";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormSelectField from "@/components/Forms/FormSelectField";
import UploadImage from "@/components/ui/UploadImage";

const CreateBlogCategory = () => {

  const { data: blogCategories } = useGetBlogCategoriesQuery(undefined);

  console.log(blogCategories?.data);

  const options = blogCategories?.data?.map((item: any) => ({
    label: item.title,
    value: item.id,
  }));

  const [createBlogCategory, { isLoading }] = useCreateBlogCategoryMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    try {
      const response = await createBlogCategory({ ...data }).unwrap();
      if (!!response) {
        router.push("/dashboard/super_admin/blog-category");
        message.success("Blogcategory Created Successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const base = "super_admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: "Blog-category", link: `/dashboard/${base}/blog-category` },
        ]}
      />
      <h1>Create Blog Category</h1>
      <Form onSubmit={onSubmit}>
        <div
          style={{
            width: "50%",
          }}
        >
          <FormInput name="title" label="Title" />
          <div
            style={{
              margin: "20px 0px",
            }}
          >
            <FormTextArea name="content" label="Content" />
          </div>
          <FormSelectField
            name="blogCategoryId"
            label="Category"
            options={options}
          />
        </div>

        <div
          style={{
            margin: "20px 0px",
          }}
        >
          <UploadImage name="file" />
        </div>

        <Button loading={isLoading} type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlogCategory;

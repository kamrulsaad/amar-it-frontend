"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { Button, Col, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useGetFaqQuery, useUpdateFaqMutation } from "@/redux/api/faq/faqApi";
import { UpdateFaqFormType, updateFaqResolver } from "@/schemas/faq";
const EditFaq = ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = useGetFaqQuery(id);
  const faq = data;
  const [updateFaq, { isLoading }] = useUpdateFaqMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<UpdateFaqFormType> = async (data) => {
    try {
      const response = await updateFaq({ id, ...data }).unwrap();

      if (!!response) {
        router.push("/dashboard/super_admin/faq");
        message.success("Faq Updated Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const defaultValues = {
    question: faq?.question || "",
    answer: faq?.answer || "",
  };
  const base = "super_admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: "faq", link: `/dashboard/${base}/faq` },
        ]}
      />
      <h1>Update Faq</h1>
      <Form
        onSubmit={onSubmit}
        resolver={updateFaqResolver}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="question" label="Question" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="answer" label="Answer" />
          </Col>
        </Row>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          update
        </Button>
      </Form>
    </div>
  );
};

export default EditFaq;

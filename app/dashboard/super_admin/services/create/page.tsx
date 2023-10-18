"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { Button, Col, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useCreateServiceMutation } from "@/redux/api/servicesApi";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormMultiSelect from "@/components/Forms/FormMultiSelect";
import {
  CreateServiceFormType,
  createServiceResolver,
} from "@/schemas/services";

const CreateServicePage = () => {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateServiceFormType> = async (data) => {
    try {
      // @ts-ignore
      data.charge = Number(data.charge);

      const response = await createService({ ...data }).unwrap();
      if (!!response) {
        router.push("/dashboard/super_admin/services");
        message.success("Service Created Successfully");
      }
    } catch (error: any) {
      for (const err of error.data.errorMessages) {
        message.error(err.message);
      }
    }
  };

  const base = "super_admin";

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: "faq", link: `/dashboard/${base}/services` },
        ]}
      />
      <h1>Create Service</h1>
      <Form onSubmit={onSubmit} resolver={createServiceResolver}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="charge" label="Charge" type="number" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormTextArea rows={4} name="description" label="Description" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormMultiSelect name="features" label="Features" options={[]} />
          </Col>
        </Row>
        <Button loading={isLoading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateServicePage;

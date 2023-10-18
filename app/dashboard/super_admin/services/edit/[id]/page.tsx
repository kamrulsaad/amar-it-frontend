"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { Button, Col, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import {
  useGetServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/servicesApi";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormMultiSelect from "@/components/Forms/FormMultiSelect";
import {
  UpdateServiceFormType,
  updateServiceResolver,
} from "@/schemas/services";
import FormSelectField from "@/components/Forms/FormSelectField";

interface EditServicePageProps {
  params: {
    id: string;
  };
}

const EditServicePage = ({ params }: EditServicePageProps) => {
  const { id } = params;
  const [updateService, { isLoading }] = useUpdateServiceMutation();
  const { data } = useGetServiceQuery(id);
  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateServiceFormType> = async (data) => {
    try {
      // @ts-ignore
      data.charge = Number(data.charge);
      const response = await updateService({ id, ...data }).unwrap();
      if (!!response) {
        router.push("/dashboard/super_admin/services");
        message.success("Service Updated Successfully");
      }
    } catch (error: any) {
      for (const err of error.data.errorMessages) {
        message.error(err.message);
      }
    }
  };

  const base = "super_admin";

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Upcoming", value: "upcoming" },
  ];

  const defaultValues = {
    title: data?.title,
    charge: String(data?.charge),
    description: data?.description,
    features: data?.features,
    status: data?.status,
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: "services", link: `/dashboard/${base}/services` },
        ]}
      />
      <h1>Update Service</h1>
      <Form
        onSubmit={onSubmit}
        resolver={updateServiceResolver}
        defaultValues={defaultValues}
      >
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
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="status"
              label="Status"
              options={statusOptions}
            />
          </Col>
        </Row>
        <Button loading={isLoading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditServicePage;

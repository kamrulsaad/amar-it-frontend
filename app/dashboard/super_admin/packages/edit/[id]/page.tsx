"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { Button, Col, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useGetServicesQuery } from "@/redux/api/servicesApi";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormMultiSelect from "@/components/Forms/FormMultiSelect";
import {
  CreateServiceFormType,
  createServiceResolver,
} from "@/schemas/services";
import {
  useCreatePackageMutation,
  useGetPackageQuery,
  useUpdatePackageMutation,
} from "@/redux/api/packageApi";
import FormSelectField from "@/components/Forms/FormSelectField";
import { IService } from "@/types";
import {
  CreatePackageFormType,
  createPackageResolver,
} from "@/schemas/package";

interface EditPackagePageProps {
  params: {
    id: string;
  };
}

const EditPackagePage = ({ params: { id } }: EditPackagePageProps) => {
  const { data } = useGetServicesQuery({ limit: 1000, page: 1 });
  const { data: servicePack } = useGetPackageQuery(id);

  const [createService, { isLoading }] = useUpdatePackageMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreatePackageFormType> = async (data) => {
    try {
      // @ts-ignore
      data.charge = Number(data.charge);

      const response = await createService({id, ...data }).unwrap();
      if (!!response) {
        router.push("/dashboard/super_admin/packages");
        message.success("Package Updated Successfully");
      }
    } catch (error: any) {
      for (const err of error.data.errorMessages) {
        message.error(err.message);
      }
    }
  };

  const options = data?.map((el: IService) => ({
    label: el.title,
    value: el.id,
  }));

  const base = "super_admin";

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: "packages", link: `/dashboard/${base}/packages` },
        ]}
      />
      <h1>Update Package</h1>
      <Form
        onSubmit={onSubmit}
        defaultValues={{
            title: servicePack?.title,
            charge: String(servicePack?.charge),
            bandwidth: servicePack?.bandwidth,
            features: servicePack?.features,
            serviceId: servicePack?.serviceId,
        }}
        resolver={createPackageResolver}
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
            <FormInput size="large" name="bandwidth" label="Bandwidth" />
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
              name="serviceId"
              label="Service"
              placeholder="select"
              options={options}
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

export default EditPackagePage;

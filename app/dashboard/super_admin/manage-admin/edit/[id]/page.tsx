"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useGetPermissionsQuery } from "@/redux/api/permissionApi";
import { IPermission } from "@/types";
import { useRouter } from "next/navigation";
import { Button, Col, Row, message } from "antd";

interface EditAdminProps {
  params: {
    id: string;
  };
}

const EditAdmin = ({ params }: EditAdminProps) => {
  const { id } = params;

  const { data: admin } = useAdminQuery(id);
  const router = useRouter();
  const defaultValues = {
    firstName: admin?.firstName,
    middleName: admin?.middleName,
    lastName: admin?.lastName,
    email: admin?.email,
    contactNo: admin?.contactNo,
    address: admin?.address,
  };

  const { data } = useGetPermissionsQuery({ limit: 100, page: 1 });
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateAdmin({ id, body: values }).unwrap();
      if (!!res) {
        message.success("Admin updated successfully!");
        router.push("/dashboard/super_admin/manage-admin");
      }
    } catch (err: any) {
      for (const error of err.data.errorMessages) {
        message.error(error.message);
      }
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "manage-admin",
            link: "/super_admin/manage-admin",
          },
        ]}
      />
      <h1>Update Admin</h1>

      <div>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Admin Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="firstName"
                  size="large"
                  label="First Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="middleName"
                  size="large"
                  label="Middle Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="lastName"
                  size="large"
                  label="Last Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="email"
                  size="large"
                  label="Email address"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="contactNo"
                  size="large"
                  label="Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="address" rows={2} label="Address" />
              </Col>
            </Row>
          </div>
          <Button loading={isLoading} htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditAdmin;

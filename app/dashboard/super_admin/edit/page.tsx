"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useAdminsQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EditSuperAdmin = () => {
  const router = useRouter();

  const { username } = getUserInfo() as any;

  useEffect(() => {
    getUserInfo();
  }, []);

  const { data } = useAdminsQuery({
    page: 1,
    limit: 1,
    username,
  });

  const customer = data?.admins[0];

  const defaultValues = {
    firstName: customer?.firstName,
    middleName: customer?.middleName,
    lastName: customer?.lastName,
    email: customer?.email,
    contactNo: customer?.contactNo,
    address: customer?.address,
  };

  const [updateCustomer, { isLoading }] = useUpdateAdminMutation();

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    try {
      const response = await updateCustomer({
        id: customer?.id,
        body: formData,
      }).unwrap();
      if (!!response) {
        router.push("/dashboard/super_admin/");
        message.success("Profile updated successfully!");
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
            label: "profile",
            link: "/super_admin",
          },
        ]}
      />
      <h1>Update Your Profile</h1>

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
              Customer Information
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
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
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

export default EditSuperAdmin;

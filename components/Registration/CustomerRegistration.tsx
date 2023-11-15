"use client";

import { Col, Row, Button, App, message } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "../Forms/FormInput";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { CustomerSignUpFormType, customerSignUpResolver } from "@/schemas/user";
import { useCustomerSignUpMutation } from "@/redux/api/authApi";
import Image from "next/image";
import LoginImage from "@/assets/register-image.svg";
import Link from "next/link";

const CustomerRegistration = () => {
  const [customerSignUp, { isLoading }] = useCustomerSignUpMutation();

  const router = useRouter();
  const onSubmit: SubmitHandler<CustomerSignUpFormType> = async (
    values: any
  ) => {
    if (values.password !== values.confirmPassword) {
      message.error("Password and Confirm Password must be same");
      return;
    }
    const { confirmPassword, ...user } = values;
    try {
      const response = await customerSignUp(user).unwrap();

      if (!!response) {
        router.push("/login");
        message.success("Customer Register Successful");
      }
    } catch (error: any) {
      for (const err of error?.data?.errorMessages) {
        message.error(err.message);
      }
    }
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
      gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image
          priority
          src={LoginImage}
          alt="login image"
          width={500}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Col>
      <Col sm={24} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0",
          }}
        >
          Register now to get started
        </h1>
        <div>
          <Form onSubmit={onSubmit} resolver={customerSignUpResolver}>
            <div>
              <FormInput
                type="text"
                size="large"
                name="username"
                label="Username"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                type="password"
                size="large"
                name="password"
                label="User Password"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                type="password"
                size="large"
                name="confirmPassword"
                label="Confirm Password"
                required
              />
            </div>
            <small>
              Already have an account?
              <Link href="/login"> Login Now</Link>
            </small>
            <Button
              style={{
                display: "block",
                marginTop: "5px",
              }}
              loading={isLoading}
              htmlType="submit"
              type="primary"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default CustomerRegistration;

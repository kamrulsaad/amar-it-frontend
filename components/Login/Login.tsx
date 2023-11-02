"use client";

import { Col, Row, Button, message } from "antd";
import LoginImage from "@/assets/login-image.svg";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { LoginFormType, loginResolver } from "@/schemas/user";
import Link from "next/link";

const Login = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await userLogin({ ...data }).unwrap();
      if (response?.accessToken) {
        router.push(`/dashboard`);
        message.success("Login Successful");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image priority src={LoginImage} alt="login image" width={500} />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0",
          }}
        >
          Login to your account
        </h1>
        <div>
          <Form onSubmit={onSubmit} resolver={loginResolver}>
            <div>
              <FormInput
                type="text"
                size="large"
                name="username"
                label="Username"
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
              />
            </div>
            <small>
              Dont have an account?
              <Link href="/register"> Register</Link>
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
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;

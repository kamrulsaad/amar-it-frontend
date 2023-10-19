"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IBooking, IGenericErrorResponse } from "@/types";
import { Button, Col, Row, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartPage = () => {
  const router = useRouter();

  const user = getUserInfo() as any;

  const { service } = useAppSelector((state) => state.cart);

  const [createBooking, { isLoading, error }] = useCreateBookingMutation();

  useEffect(() => {
    if (!service?.id) {
      router.push("/services");
      message.error("Please add a service to cart first");
    }
  }, [router, service]);

  useEffect(() => {
    if (user.role !== "customer") {
      message.error("You are not authorized to view this page");
      router.push("/dashboard/" + user.role);
    }
  }, [user, router]);

  useEffect(() => {
    if (error) {
      const { message: errorMessage } = error as IGenericErrorResponse;
      message.error(errorMessage);
    }
  }, [error]);

  const handleSubmit = async (data: any) => {
    try {
      const body = {
        ...data,
        serviceId: service.id,
      };

      const response = await createBooking(body).unwrap();

      const booking = response as IBooking | undefined;

      if (booking?.id) {
        message.success("Booking successful");
        router.push("/dashboard/customer/booking");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Cart
      </h1>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        Please fill in the form below to place your order.
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Row gutter={24}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormTimePicker name="startTime" label="Start Time" />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormTimePicker name="endTime" label="End Time" />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormDatePicker size="large" name="date" label="Date" />
            </Col>
          </Row>
          <Button
            style={{
              display: "block",
              margin: "0 auto",
            }}
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            Confirm Booking
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CartPage;

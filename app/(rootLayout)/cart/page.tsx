"use client";

import Container from "@/components/Container";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IBooking } from "@/types";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import CartServiceCard from "./_components/cartServiceCard";
import { useMakePaymentMutation } from "@/redux/api/paymentApi";

const CartPage = () => {
  const router = useRouter();

  const [bookingCompleted, setBookingCompleted] = useState<boolean>(false);

  const user = getUserInfo() as any;

  const { service } = useAppSelector((state) => state.cart);

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [makePayment] = useMakePaymentMutation();

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

  const handleSubmit = async (data: any) => {
    try {
      if (bookingCompleted) return;

      const body = {
        ...data,
        serviceId: service.id,
      };

      const response = await createBooking(body).unwrap();

      const booking = response as IBooking | undefined;

      if (booking?.id) {
        message.success("Booking successful");
        setBookingCompleted(() => true);
        // router.push("/dashboard/customer/booking");
      }
    } catch (error: any) {
      for (const err of error.data.errorMessages) {
        message.error(err.message);
      }
    }
  };

  const successPaymentHandlerStripe = async (token: any) => {
    try {
      const body = {
        stripeToken: token,
        totalPrice: service.charge,
      };

      const result = await makePayment(body).unwrap();

      if (!!result) {
        message.success("Payment successful");
        router.push("/dashboard/customer/booking");
      }
    } catch (error: any) {
      for (const err of error.data.errorMessages) {
        message.error(err.message);
      }
    }
  };

  return (
    <div className="bgGray ">
      <Container>
        <h1 className="pl-4 md:pl-0 pt-5">Cart</h1>
        <h3
          className="pl-4 md:pl-0"
          style={{
            fontWeight: "normal",
          }}
        >
          Please fill in the form below to place your order.
        </h3>
        <div className="flex justify-between items-stretch flex-col md:flex-row md:py-12 py-8 mx-4 md:mx-0 gap-4">
          <CartServiceCard service={service} />
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "5px solid #ddd",
              padding: "20px 40px",
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Row gutter={24}>
                <Col span={24} style={{ margin: "2px 0" }}>
                  <h1>Booking Information</h1>
                </Col>
              </Row>
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
                  <FormDatePicker
                    size="large"
                    name="date"
                    label="Date of Booking"
                  />
                </Col>
              </Row>
              {bookingCompleted ? (
                <StripeCheckout
                  stripeKey={
                    "pk_test_51OCpX2EoZ8jVom2APwgYRYV4A56vBZO5AcHbKYf2vlfalZpxDk4L4HW7DXu3BbmALQCHCBepiDwmBA9EZZcIOwhb00VGaaSOOY"
                  }
                  amount={service.charge * 100}
                  shippingAddress
                  token={successPaymentHandlerStripe}
                  currency="USD"
                />
              ) : (
                <Button
                  style={{ margin: "10px 0" }}
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Confirm Booking
                </Button>
              )}
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

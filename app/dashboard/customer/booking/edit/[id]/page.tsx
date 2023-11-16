"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUpdateBookingMutation } from "@/redux/api/bookingApi";

import { Button, Col, message } from "antd";
import { useRouter } from "next/navigation";

interface EditBookingProps {
  params: {
    id: string;
  };
}

const EditBooking = ({ params: { id } }: EditBookingProps) => {
  const router = useRouter();

  const [updateCustomer, { isLoading }] = useUpdateBookingMutation();

  const onSubmit = async (values: any) => {
    try {
      const response = await updateCustomer({
        id,
        body: values,
      }).unwrap();
      if (!!response) {
        router.push("/dashboard/customer/booking");
        message.success("Booking Rescheduled successfully!");
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
            label: "booking",
            link: "/customer/booking",
          },
        ]}
      />
      <h1>Update Booking Information</h1>
      <div>
        <Form onSubmit={onSubmit}>
          <Col
            className="gutter-row"
            span={8}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormTimePicker name="startTime" label="Start Time" />
          </Col>
          <Col
            className="gutter-row"
            span={8}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormTimePicker name="endTime" label="End Time" />
          </Col>
          <Col
            className="gutter-row"
            span={8}
            style={{
              marginBottom: "10px",
            }}
          >
            <FormDatePicker size="large" name="date" label="Date of Booking" />
          </Col>
          <Button loading={isLoading} htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditBooking;

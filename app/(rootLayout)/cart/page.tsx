// "use client";

// import Form from "@/components/Forms/Form";
// import FormTimePicker from "@/components/Forms/FormTimePicker";
// import { useAppSelector } from "@/redux/hooks";
// import { Button, Col, Row, message } from "antd";
// import { useRouter } from "next/navigation";

// const CartPage = () => {
//   const router = useRouter();

//   const { service } = useAppSelector((state) => state.cart);

//   if (!service?.id) {
//     router.push("/services");
//     message.error("Please add a service to cart first");
//   }

//   const handleSubmit = (data: any) => {

//     // TODO: Add booking to database
//     router.push("/dashboard/customer/booking");
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//       }}
//     >
//       <h1
//         style={{
//           textAlign: "center",
//         }}
//       >
//         Cart
//       </h1>
//       <h3
//         style={{
//           textAlign: "center",
//           fontWeight: "normal",
//         }}
//       >
//         Please fill in the form below to place your order.
//       </h3>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "50px",
//         }}
//       >
//         <Form onSubmit={handleSubmit}>
//           <Row gutter={24}>
//             <Col span={24} style={{ margin: "10px 0" }}>
//               <FormTimePicker name="startTime" label="Start Time" />
//             </Col>
//           </Row>
//           <Row gutter={24}>
//             <Col span={24} style={{ margin: "10px 0" }}>
//             <FormTimePicker name="startTime" label="Start Time" />
//             </Col>
//           </Row>
//           <Button
//             style={{
//               display: "block",
//               margin: "0 auto",
//             }}
//             loading={false}
//             type="primary"
//             htmlType="submit"
//           >
//             Confirm Booking
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import React from 'react'

const CartPage = () => {
  return (
    <div>page</div>
  )
}

export default CartPage
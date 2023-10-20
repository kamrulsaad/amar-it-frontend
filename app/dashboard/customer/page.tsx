"use client";

import { useCustomersQuery } from "@/redux/api/customerApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";

const CustomerPage = () => {
  const { username } = getUserInfo() as any;

  const { data } = useCustomersQuery({
    page: 1,
    limit: 1,
    username: username,
  });

  const customer = data?.customers[0];

  return (
    <div>
      <h1 className="mb-2">Customer Profile</h1>
      <div className="space-y-2 my-2">
        <p>
          Name:
          {customer?.firstName}{" "}
          {customer?.middleName && customer?.middleName + " "}{" "}
          {customer?.lastName}
        </p>
        <p>Username: {customer?.username}</p>
        <p>Phone: {customer?.contactNo}</p>
        <p>Email: {customer?.email}</p>
        <p>Address: {customer?.address}</p>
      </div>
      <Button type="primary" size="large">
        <EditOutlined /> Edit Profile
      </Button>
    </div>
  );
};

export default CustomerPage;

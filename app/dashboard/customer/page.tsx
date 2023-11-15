"use client";

import { useCustomersQuery } from "@/redux/api/customerApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";

const CustomerPage = () => {
  const { username } = getUserInfo() as any;

  const { data } = useCustomersQuery({
    page: 1,
    limit: 1,
    username,
  });

  const customer = data?.customers[0];

  return (
    <div>
      <UMBreadCrumb items={[]} />
      <h1 className="mb-2">Customer Profile</h1>
      {customer?.firstName ? (
        <div className="flex justify-between items-center">
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
          {customer?.profileImage ? (
            <Image
              className="rounded-full mr-4"
              src={customer?.profileImage}
              alt="customer image"
              width={200}
              height={200}
            />
          ) : (
            <Avatar size={200} className="mr-4" icon={<UserOutlined />} />
          )}
        </div>
      ) : (
        <p>Update your profile</p>
      )}
      <Link href={"/dashboard/customer/edit"}>
        <Button type="primary" size="middle">
          <EditOutlined /> Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default CustomerPage;

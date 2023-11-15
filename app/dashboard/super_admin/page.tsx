"use client";

import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAdminsQuery } from "@/redux/api/adminApi";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";

const SAdminProfilePage = () => {
  const { username } = getUserInfo() as any;

  const { data } = useAdminsQuery({
    page: 1,
    limit: 1,
    username: username,
  });

  const customer = data?.admins[0];

  return (
    <div>
      <UMBreadCrumb items={[]} />
      <h1 className="mb-2">Super Admin Profile</h1>
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
      <Link href={"/dashboard/super_admin/edit"}>
        <Button type="primary" size="middle">
          <EditOutlined /> Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default SAdminProfilePage;

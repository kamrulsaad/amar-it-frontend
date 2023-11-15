"use client";

import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAdminsQuery } from "@/redux/api/adminApi";

const SAdminProfilePage = () => {
  const { username } = getUserInfo() as any;

  const { data } = useAdminsQuery({
    page: 1,
    limit: 1,
    username: username,
  });

  const admin = data?.admins[0];

  return (
    <div>
      <h1 className="mb-2">Super Admin Profile</h1>
      <div className="space-y-2 my-2">
        <p>
          Name:
          {admin?.firstName}{" "}
          {admin?.middleName && admin?.middleName + " "}{" "}
          {admin?.lastName}
        </p>
        <p>Username: {admin?.username}</p>
        <p>Phone: {admin?.contactNo}</p>
        <p>Email: {admin?.email}</p>
        <p>Address: {admin?.address}</p>
      </div>
      <Button type="primary" size="large">
        <EditOutlined /> Edit Profile
      </Button>
    </div>
  );
};

export default SAdminProfilePage;

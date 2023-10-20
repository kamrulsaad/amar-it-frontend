"use client";

import { useAdminQuery } from "@/redux/api/adminApi";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface AdminDetailsPageProps {
  params: {
    id: string;
  };
}

const AdminDetailsPage = ({ params: { id } }: AdminDetailsPageProps) => {
  const { data: admin } = useAdminQuery(id);

  return (
    <div>
      <h1 className="mb-2">Super Admin Profile</h1>
      <div className="space-y-2 my-2">
        <p>
          Name:
          {admin?.firstName} {admin?.middleName && admin?.middleName + " "}{" "}
          {admin?.lastName}
        </p>
        <p>Username: {admin?.username}</p>
        <p>Phone: {admin?.contactNo}</p>
        <p>Email: {admin?.email}</p>
        <p>Address: {admin?.address}</p>
      </div>
      <Button type="primary" size="large">
        <EditOutlined /> Edit
      </Button>
    </div>
  );
};

export default AdminDetailsPage;

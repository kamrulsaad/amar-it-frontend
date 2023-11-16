"use client";

import { useAdminQuery } from "@/redux/api/adminApi";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Image from "next/image";
import Link from "next/link";

interface AdminDetailsPageProps {
  params: {
    id: string;
  };
}

const AdminDetailsPage = ({ params: { id } }: AdminDetailsPageProps) => {
  const { data: customer } = useAdminQuery(id);

  return (
    <div>
      <UMBreadCrumb items={[]} />
      <h1 className="mb-2">Admin Profile</h1>

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
          <p>Department: {customer?.permission?.title} </p>
        </div>
        {customer?.profileImage && (
          <Image
            className="rounded-full mr-4"
            src={customer?.profileImage}
            alt="customer image"
            width={200}
            height={200}
          />
        )}
      </div>
      <Link href={"/dashboard/super_admin/manage-admin/edit/" + customer?.id}>
        <Button type="primary" size="middle">
          <EditOutlined /> Edit Admin Info
        </Button>
      </Link>
    </div>
  );
};

export default AdminDetailsPage;

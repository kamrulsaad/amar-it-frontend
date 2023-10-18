"use client";

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { Button, message } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";
import dayjs from "dayjs";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/redux/api/servicesApi";

const ServicesPage = () => {
  const [deleteFaq] = useDeleteServiceMutation();
  const { data, isLoading } = useGetServicesQuery(undefined);
  const faqData = data;

  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteFaq(id);
      if (!!res) {
        message.success("Service Deleted Successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Charge",
      dataIndex: "charge",
      render: function (data: number) {
        return `${data} ৳`;
      },
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data: string) {
        return `${data.toUpperCase()}`;
      },
      sorter: true,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/dashboard/super_admin/services/${data}`}>
              <Button type="dashed">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/dashboard/super_admin/services/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => deleteHandler(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />

      <ActionBar title="Services List">
        <div>
          <Link href="/dashboard/super_admin/services/create">
            <Button type="primary">Create</Button>
          </Link>
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={faqData}
        showSizeChanger={true}
        showPagination={true}
      />
    </div>
  );
};

export default ServicesPage;

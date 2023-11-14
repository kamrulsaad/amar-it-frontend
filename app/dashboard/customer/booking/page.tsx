"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { Button, message } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";

import dayjs from "dayjs";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect } from "react";

const BookingPage = () => {
  useEffect(() => {
    getUserInfo();
  }, []);

  const { username } = getUserInfo() as any;

  const [deleteFaq] = useDeleteBookingMutation();
  const { data, isLoading } = useGetBookingsQuery({
    username,
  });
  const faqData = data?.bookings;
  // const meta = data?.meta

  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteFaq(id);
      if (!!res) {
        message.success("Booking Deleted Successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service",
      render: function (data: any) {
        return data?.title;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data: string) {
        switch (data) {
          case "pending":
            return (
              <span className="text-yellow-500 font-semibold">Pending</span>
            );
          case "completed":
            return <span className="text-green-500">Completed</span>;
          case "rejected":
            return <span className="text-red-500">Rejected</span>;
          default:
            return <span className="text-yellow-500">Pending</span>;
        }
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      sorter: true,
    },
    {
      title: "Date of booking",
      dataIndex: "date",
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
            <Link href={`/dashboard/customer/booking/edit/${data}`}>
              <Button
                style={{
                  marginRight: "5px",
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
            label: "customer",
            link: "/customer",
          },
        ]}
      />

      <ActionBar title="My Bookings">
        <div>
          <Link href="/dashboard/super_admin/faq/create">
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

export default BookingPage;

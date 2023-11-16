"use client";

import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { Button, Popconfirm, message } from "antd";
import ActionBar from "@/components/ui/ActionBar";
import dayjs from "dayjs";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";

const BookingPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const [deleteFaq] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const { data, isLoading } = useGetBookingsQuery({
    ...query,
  });
  const faqData = data?.bookings;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteFaq({ id, body: { status: "completed" } });

      if (!!res) {
        message.success("Booking marked as completed successfully");
      }
    } catch (err: any) {
      message.error(err.data.message);
    }
  };

  const deleteBookingHandler = async (id: string) => {
    try {
      const res = await deleteBooking(id);

      if (!!res) {
        message.success("Booking deleted successfully");
      }
    } catch (err: any) {
      message.error(err.data.message);
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "customer",
      render: function (data: any) {
        return data?.username;
      },
    },
    {
      title: "Contact No",
      dataIndex: "customer",
      render: function (data: any) {
        return data?.contactNo;
      },
    },
    {
      title: "Email",
      dataIndex: "customer",
      render: function (data: any) {
        return data?.email;
      },
    },
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
            return (
              <span className="text-green-500 font-semibold">Completed</span>
            );
          case "cancelled":
            return (
              <span className="text-red-500 font-semibold">Cancelled</span>
            );
          default:
            return (
              <span className="text-yellow-500 font-semibold">Pending</span>
            );
        }
      },
      sorter: true,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      sorter: true,
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
        return data && dayjs(data).format("MMM D, YYYY");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Popconfirm
              title="Are you sure you want to mark as completed?"
              onConfirm={() => deleteHandler(data?.id)}
            >
              <Button
                style={{
                  marginRight: "5px",
                }}
                disabled={
                  data?.status === "cancelled" || data?.status === "completed"
                }
              >
                <CheckCircleOutlined />
              </Button>
            </Popconfirm>
            <Popconfirm
              onConfirm={() => deleteBookingHandler(data?.id)}
              title="Are you sure you want to delete the booking?"
            >
              <Button
                disabled={data?.status === "pending"}
                type="primary"
                danger
              >
                <DeleteOutlined />
              </Button>
            </Popconfirm>
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

      <ActionBar title="Bookings" />

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={faqData}
        showSizeChanger={true}
        showPagination={true}
        pageSize={size}
        totalPages={meta?.total}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
      />
    </div>
  );
};

export default BookingPage;

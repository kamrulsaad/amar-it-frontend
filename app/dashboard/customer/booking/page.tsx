"use client";

import { CloseOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { Button, Input, Popconfirm, Popover, message } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";

import dayjs from "dayjs";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";

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

  const { username } = getUserInfo() as any;

  const [deleteFaq] = useUpdateBookingMutation();
  const { data, isLoading } = useGetBookingsQuery({
    username,
    ...query,
  });
  const faqData = data?.bookings;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteFaq({ id, body: { status: "cancelled" } });

      if (!!res) {
        message.success("Booking cancelled successfully");
      }
    } catch (err: any) {
      message.error(err.data.message);
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
            <Popover title="Reschedule your booking">
              <Link href={`/dashboard/customer/booking/edit/${data?.id}`}>
                <Button
                  style={{
                    marginRight: "5px",
                  }}
                  disabled={data?.status === "cancelled" || data?.status === "completed"}
                  type="primary"
                >
                  <EditOutlined />
                </Button>
              </Link>
            </Popover>
            <Popconfirm
              title="Are you sure you want to cancel the booking?"
              onConfirm={() => deleteHandler(data?.id)}
            >
              <Button
                disabled={data?.status === "cancelled" || data?.status === "completed"}
                type="primary"
                danger
              >
                <CloseOutlined />
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
            label: "customer",
            link: "/customer",
          },
        ]}
      />

      <ActionBar title="My Bookings" />

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

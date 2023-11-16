"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { Button, Popconfirm, message } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";
import dayjs from "dayjs";
import {
  useDeleteHomeBannerMutation,
  useGetHomeBannersQuery,
} from "@/redux/api/bannerApi";

const HomeBannerPage = () => {
  const [deleteHomeBanner] = useDeleteHomeBannerMutation();
  const { data, isLoading } = useGetHomeBannersQuery(undefined);
  const homeBanner = data;

  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteHomeBanner(id);
      if (!!res) {
        message.success("Home Banner Deleted Successfully");
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
      title: "Content",
      dataIndex: "content",
      sorter: true,
      render: function (data: any) {
        return data && data.slice(0, 50) + "...";
      }
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
            <Link href={`/dashboard/admin/banner-content/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Popconfirm
              title="Are you sure?"
              description={`This action can not be undone.`}
              onConfirm={() => deleteHandler(data)}
            >
              <Button type="primary" danger>
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
            label: "admin",
            link: "/dashboard/admin",
          },
        ]}
      />

      <ActionBar title="Home Banner List">
        <div>
          <Link href="/dashboard/admin/banner-content/create">
            <Button type="primary">Create</Button>
          </Link>
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={homeBanner}
        showSizeChanger={true}
        showPagination={true}
      />
    </div>
  );
};

export default HomeBannerPage;

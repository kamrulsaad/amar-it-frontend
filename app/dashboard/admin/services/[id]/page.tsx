"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetServiceQuery } from "@/redux/api/servicesApi";
import dayjs from "dayjs";
import { Key } from "react";

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

const ServiceDetailsPage = ({ params }: ServiceDetailsPageProps) => {
  const { id } = params;
  const { data } = useGetServiceQuery(id);

  return (
    <div className="space-y-2">
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "services",
            link: "/super_admin/services",
          },
        ]}
      />

      <ActionBar title={data?.title} />
      <p>
        <b>Description:</b> {data?.description}
      </p>
      <p>
        {" "}
        <b>Charge:</b> {data?.charge} ৳
      </p>
      <p>
        <b>Status:</b> <span className="uppercase">{data?.status}</span>
      </p>
      <p>
        <b>Created At:</b>{" "}
        {dayjs(data?.createdAt).format("MMM D, YYYY hh:mm A")}
      </p>
      <p className="font-bold">Features: </p>
      <ul className="ml-8">
        {data?.features.map(
          (feature: string, index: Key | null | undefined) => (
            <li key={index}>
              <p>{feature}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ServiceDetailsPage;

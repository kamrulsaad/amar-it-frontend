"use client";

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
      <h2>{data?.title}</h2>
      <p>Description: {data?.description}</p>
      <p>Charge: {data?.charge} ৳</p>
      <p>
        Status: <span className="uppercase">{data?.status}</span>
      </p>
      <p>Created At: {dayjs(data?.createdAt).format("MMM D, YYYY hh:mm A")}</p>
      <p>Features: </p>
      <ul className="ml-8">
        {data?.features.map(
          (feature: string, index: Key | null | undefined) => (
            <li key={index}>{feature}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default ServiceDetailsPage;

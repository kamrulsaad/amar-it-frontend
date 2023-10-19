"use client";

import { useGetPackageQuery } from "@/redux/api/packageApi";
import dayjs from "dayjs";
import { Key } from "react";

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

const PackageDetailsPage = ({ params }: ServiceDetailsPageProps) => {
  const { id } = params;
  const { data } = useGetPackageQuery(id);

  return (
    <div className="space-y-2">
      <h2>{data?.title}</h2>
      <p>Bandwidth: {data?.bandwidth}</p>
      <p>Charge: {data?.charge} ৳</p>
      <p>Service Charge: {data?.service?.charge} ৳ ({data?.service?.title})</p>
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

export default PackageDetailsPage;

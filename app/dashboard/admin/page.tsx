"use client";

import { getUserInfo } from "@/services/auth.service";
import { useAdminsQuery } from "@/redux/api/adminApi";

const AdminProfilePage = () => {
  const { username } = getUserInfo() as any;

  const { data } = useAdminsQuery({
    page: 1,
    limit: 1,
    username: username,
  });

  console.log(data)

  const admin = data?.admins[0];

  return (
    <div>
      <h1 className="mb-2">Admin Profile</h1>
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
    </div>
  );
};

export default AdminProfilePage;

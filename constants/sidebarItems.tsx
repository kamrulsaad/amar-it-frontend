import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/change-password`}>
              Change Password
            </Link>
          ),
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/${role}/booking`}>Manage Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/booking`,
    },
    {
      label: (
        <Link href={`/dashboard/${role}/manage-customer`}>Manage Customer</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/manage-customer`,
    },
    {
      label: <Link href={`/dashboard/${role}/feedback`}>Feedbacks</Link>,
      key: "feedback",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href={`/dashboard/${role}/services`}>Services</Link>,
      key: "services",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href={`/dashboard/${role}/packages`}>Packages</Link>,
      key: "packages",
      icon: <AppstoreOutlined />,
    },
    {
      label: "CMS",
      key: "cms",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/${role}/blog-category`}>Blog Category</Link>
          ),
          key: `/${role}/blog-category`,
        },
        {
          label: <Link href={`/dashboard/${role}/blogs`}>Blog Post</Link>,
          key: `/${role}/blog-post`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/banner-content`}>
              Home Banner Content
            </Link>
          ),
          key: `/${role}/banner-content`,
        },
        {
          label: <Link href={`/dashboard/${role}/faq`}>FAQ</Link>,
          key: `/${role}/faq`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/${role}/permission`}>
              Admin Permissions
            </Link>
          ),
          key: `/${role}/department`,
        },
      ],
    },
  ];

  const customerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/booking`}>Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/booking`,
    },
    {
      label: (
        <Link href={`/dashboard/${role}/notifications`}>Notifications</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/notifications`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.CUSTOMER) return customerSidebarItems;
  else {
    return defaultSidebarItems;
  }
};

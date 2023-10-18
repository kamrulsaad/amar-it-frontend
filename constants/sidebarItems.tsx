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
          label: <Link href={`/dashboard/${role}/blog-post`}>Blog Post</Link>,
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
    {
      label: "Manage academic",
      key: "manage-academic",
      icon: <TableOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/${role}/academic/faculty`}>Faculties</Link>
          ),
          key: `/${role}/academic/faculty`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/academic/department`}>
              Departments
            </Link>
          ),
          key: `/${role}/academic/department`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/academic/semester`}>Semesters</Link>
          ),
          key: `/${role}/academic/semester`,
        },
      ],
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
        {
          label: <Link href={`/dashboard/${role}/building`}>Building</Link>,
          key: `/${role}/building`,
        },
        {
          label: <Link href={`/dashboard/${role}/room`}>Rooms</Link>,
          key: `/${role}/room`,
        },
        {
          label: <Link href={`/dashboard/${role}/course`}>Course</Link>,
          key: `/${role}/course`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/semester-registration`}>
              Semester registration
            </Link>
          ),
          key: `/${role}/semester-registration`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/offered-course`}>
              Offered courses
            </Link>
          ),
          key: `/${role}/offered-course`,
        },
        {
          label: (
            <Link href={`/dashboard/${role}/offered-course-section`}>
              Course sections
            </Link>
          ),
          key: `/${role}/offered-course-section`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/dashboard/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
      ],
    },
  ];

  const facultySidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
  ];

  const studentSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
    {
      label: (
        <Link href={`/dashboard/${role}/courses/schedule`}>
          Course schedules
        </Link>
      ),
      icon: <ScheduleOutlined />,
      key: `/${role}/courses/schedule`,
    },
    {
      label: <Link href={`/dashboard/${role}/registration`}>Registration</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/registration`,
    },
    {
      label: <Link href={`/dashboard/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
    {
      label: (
        <Link href={`/dashboard/${role}/academic-report`}>Academic report</Link>
      ),
      icon: <FileTextOutlined />,
      key: `/${role}/academic-report`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.CUSTOMER) return facultySidebarItems;
  else {
    return defaultSidebarItems;
  }
};

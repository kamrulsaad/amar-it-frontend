import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.service";
import useLogOut from "@/utils/logOut";

const { Header: AntHeader } = Layout;

const Header = () => {
  const logOut = useLogOut();

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  const { username } = getUserInfo() as any;

  return (
    <AntHeader
      style={{
        background: "white",
      }}
    >
      <Row
        justify={"end"}
        align={"middle"}
        style={{
          height: "100%",
        }}
      >
        <p
          style={{
            margin: "0px 5px",
          }}
        >
          {username}
        </p>
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;

import { removeUserInfo } from '@/services/auth.service'
import { Avatar, MenuProps } from 'antd'
import Link from 'next/link'
import {
  UserOutlined,
  LogoutOutlined,
  PicLeftOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { authKey } from './storageKey'

const handleLogout = () => {
  removeUserInfo(authKey)
  window.location.reload()
}

export const menuItems = (role: string) => {
  const items: MenuProps['items'] = [
    {
      label: <Link href='/'>Home</Link>,
      key: 'Home',
    },
    {
      label: <Link href='/services'>Services</Link>,
      key: 'About',
    },
    {
      label: <Link href='/blogs'>Blogs</Link>,
      key: 'Blogs',
    },
    {
      label: <Link href='/about'>About Us</Link>,
      key: 'About Us',
    },
    {
      label: <Link href='/contact'>Contact Us</Link>,
      key: 'Contact Us',
    },
  ]
  const loggedInItems: MenuProps['items'] = [
    ...items,
    {
      label: (
        <Avatar
          style={{
            backgroundColor: '#5800ff',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          icon={<UserOutlined />}
        />
      ),
      key: 'Dashboard',
      children: [
        {
          label: <Link href='/cart'>View Cart</Link>,
          icon: <ShoppingCartOutlined />,
          key: 'setting:1',
        },
        {
          label: <Link href='/dashboard'>Dashboard</Link>,
          icon: <PicLeftOutlined />,
          key: 'setting:2',
        },
        {
          label: <Link href={`/${role}/profile`}>Profile</Link>,
          key: 'setting:3',
          icon: <UserOutlined />,
        },
        {
          label: (
            <Link href={'#'} onClick={handleLogout}>
              Log out
            </Link>
          ),
          icon: <LogoutOutlined />,
          key: 'setting:4',
        },
      ],
    },
  ]
  const loggedOutItems: MenuProps['items'] = [
    ...items,
    {
      label: <Link href='/login'>Login</Link>,
      icon: <PicLeftOutlined />,
      key: 'setting:2',
    },
    {
      label: <Link href='/register'>Register</Link>,
      icon: <LogoutOutlined />,
      key: 'setting:1',
    },
  ]

  if (!!role) {
    return loggedInItems
  } else {
    return loggedOutItems
  }
}

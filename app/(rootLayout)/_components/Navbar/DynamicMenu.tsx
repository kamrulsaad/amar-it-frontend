'use client'

import { menuItems } from '@/constants/menuItems'
import { useAppSelector } from '@/redux/hooks'
import { Menu } from 'antd'
import dynamic from 'next/dynamic'

const DynamicMenu = () => {
  const { role } = useAppSelector((state) => state.auth)
  
  return (
    <div className='mobile-hidden w-full'>
      <Menu
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderBottom: 'none',
          width: '100%',
        }}
        defaultSelectedKeys={['Home']}
        mode='horizontal'
        items={menuItems(role as string)}
      />
    </div>
  )
}

export default dynamic(() => Promise.resolve(DynamicMenu), { ssr: false })

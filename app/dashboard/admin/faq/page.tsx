
'use client'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UMTable from '@/components/ui/UMTable'
import { Button, message } from 'antd'
import Link from 'next/link'
import ActionBar from '@/components/ui/ActionBar'

import dayjs from 'dayjs'
import { useDeleteFaqMutation, useGetFaqsQuery } from '@/redux/api/faq/faqApi'

const FAQpage = () => {

  const [deleteFaq] = useDeleteFaqMutation()
  const { data, isLoading } = useGetFaqsQuery(undefined)
  const faqData = data
  // const meta = data?.meta

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....')
    try {
      //   console.log(data);
      const res = await deleteFaq(id)
      if (!!res) {
        message.success('Faq Deleted Successfully')
      }
    } catch (err: any) {
      message.error(err.message)
    }
  }

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      sorter: true,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A')
      },
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: function (data: any) {
        
        return (
          <>
            <Link href={`/dashboard/super_admin/faq/edit/${data}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                onClick={() => console.log(data)}
                type='primary'
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data)}
              type='primary'
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'super_admin',
            link: '/dashboard/super_admin',
          },
        ]}
      />

      <ActionBar title='Faq List'>
        <div>
          <Link href='/dashboard/super_admin/faq/create'>
            <Button type='primary'>Create</Button>
          </Link>
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={faqData}
        showSizeChanger={true}
        showPagination={true}
      />
    </div>
  )
}

export default FAQpage

'use client'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UMTable from '@/components/ui/UMTable'
import { Button, message } from 'antd'
import Link from 'next/link'
import ActionBar from '@/components/ui/ActionBar'
import dayjs from 'dayjs'
import { useDeleteBlogCategoryMutation, useGetBlogCategoriesQuery } from '@/redux/api/blog-category/blogCategory'

const BlogCategoryPage = () => {
  const [deleteBlogCategory] = useDeleteBlogCategoryMutation()
  const { data, isLoading } = useGetBlogCategoriesQuery(undefined)
  const faqData = data


  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....')
    try {
      const res = await deleteBlogCategory(id)
      if (!!res) {
        message.success('Blog Category Deleted Successfully')
      }
    } catch (err: any) {
      message.error(err.message)
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
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
            <Link href={`/dashboard/super_admin/blog-category/edit/${data}`}>
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
            <Button onClick={() => deleteHandler(data)} type='primary' danger>
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

      <ActionBar title='Blog Category List'>
        <div>
          <Link href='/dashboard/super_admin/blog-category/create'>
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

export default BlogCategoryPage

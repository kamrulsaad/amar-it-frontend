'use client'
import { DeleteOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UMTable from '@/components/ui/UMTable'
import { Button, Input, message } from 'antd'
import Link from 'next/link'
import ActionBar from '@/components/ui/ActionBar'
import dayjs from 'dayjs'
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/redux/api/blogApi'
import { useState } from 'react'
import { useDebounced } from '@/redux/hooks'
const BlogPage = () => {

  const query: Record<string, any> = {}

  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [deleteBlogCategory, { isLoading: deleteLoader }] = useDeleteBlogMutation()
  
  
  query['limit'] = size
  query['page'] = page
  query['sortBy'] = sortBy
  query['sortOrder'] = sortOrder

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  })

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm
  }
  const { data, isLoading } = useGetBlogsQuery({ ...query })
  const blogsData = data?.blogs
  const meta = data?.meta
  

  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteBlogCategory(id)
      if (!!res) {
        message.success('Blog Deleted Successfully')
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
      title: 'Content',
      dataIndex: 'content',
    },
    {
      title: 'BlogCategory',
      dataIndex: 'blogCategory',
      render: function (data: any) {
        return <>{data?.title}</>
      },
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
            <Link href={`/dashboard/super_admin/blogs/edit/${data}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                type='primary'
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              loading={deleteLoader}
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
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log('Page:', page, 'PageSize:', pageSize)
    setPage(page)
    setSize(pageSize)
  }
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter
    // console.log(order, field);
    setSortBy(field as string)
    setSortOrder(order === 'ascend' ? 'asc' : 'desc')
  }

  const resetFilters = () => {
    setSortBy('')
    setSortOrder('')
    setSearchTerm('')
  }

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

      <ActionBar title='Blog List'>
        <Input
          type='text'
          size='large'
          placeholder='Search...'
          style={{
            width: '20%',
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <div>
          <Link href='/dashboard/super_admin/blogs/create'>
            <Button type='primary'>Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type='primary'
              style={{ margin: '0px 5px' }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={blogsData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  )
}

export default BlogPage

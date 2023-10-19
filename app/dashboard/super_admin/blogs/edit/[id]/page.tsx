'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'
import {
  updateBlogCategoryResolver,
} from '@/schemas/blogCategory'
import { useGetBlogQuery, useUpdateBlogMutation } from '@/redux/api/blogApi'
import FormTextArea from '@/components/Forms/FormTextArea'
import FormSelectField, {
  SelectOptions,
} from '@/components/Forms/FormSelectField'
import { useGetBlogCategoriesQuery } from '@/redux/api/blog-category/blogCategory'
import UploadImage from '@/components/ui/UploadImage'

const EditFaq = ({
  params: { id },
}: {
  params: {
    id: string
  }
}) => {
  const { data } = useGetBlogQuery(id)
  const { data: blogsData } = useGetBlogCategoriesQuery(undefined)

  const blogCategoryOptions = blogsData?.map(
    (item: { title: string; id: string }) => {
      return {
        label: item?.title,
        value: item?.id,
      }
    }
  )
  const [updateBlog, { isLoading }] = useUpdateBlogMutation()
  const router = useRouter()

  const onSubmit = async (values: any) => {
    const obj = { ...values }
    const file = obj['file']
    delete obj['file']
    const data = JSON.stringify(obj)
    const formData = new FormData()
    formData.append('file', file as Blob)
    formData.append('data', data)

    try {
      const res = await updateBlog({ id, body: formData }).unwrap()
      if (!!res) {
        router.push('/dashboard/super_admin/blogs')
        message.success('Blog Updated Successfully')
      }
    } catch (err: any) {
      for (const error of err.data.errorMessages) {
        message.error(error.message)
      }
    }
  }
  const defaultValues = {
    title: data?.title || '',
    content: data?.content || '',
  }
  const base = 'super_admin'
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: 'Blogs', link: `/${base}/blogs` },
        ]}
      />
      <h1>Update Blog </h1>
      <Form
        onSubmit={onSubmit}
        resolver={updateBlogCategoryResolver}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput type='text' name='title' label='Title' />
          </Col>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormTextArea name='content' label='Content' />
          </Col>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormSelectField
              size='large'
              name='blogCategoryId'
              options={blogCategoryOptions as SelectOptions[]}
              label='Category'
              placeholder='Select'
            />
          </Col>
          <Col span={8} style={{ margin: '10px 0' }}>
            <UploadImage name='file' />
          </Col>
        </Row>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          update
        </Button>
      </Form>
    </div>
  )
}

export default EditFaq

'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'
import { SubmitHandler } from 'react-hook-form'
import {
  useGetBlogCategoryQuery,
  useUpdateBlogCategoryMutation,
} from '@/redux/api/blog-category/blogCategory'
import {
  UpdateBlogCategoryFormType,
  updateBlogCategoryResolver,
} from '@/schemas/blogCategory'

const EditFaq = ({
  params: { id },
}: {
  params: {
    id: string
  }
}) => {
  const { data } = useGetBlogCategoryQuery(id)
  const blogCategory = data
  const [updateFaq, { isLoading }] = useUpdateBlogCategoryMutation()
  const router = useRouter()
  const onSubmit: SubmitHandler<UpdateBlogCategoryFormType> = async (data) => {
    try {
      const response = await updateFaq({ id, ...data }).unwrap()

      if (!!response) {
        router.push('/dashboard/super_admin/blog-category')
        message.success('Blog category Updated Successfully')
      }
    } catch (error: any) {
      message.error(error.message)
    }
  }
  const defaultValues = {
    title: blogCategory?.title,
  }
  const base = 'super_admin'
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: 'Blog-category', link: `/dashboard/${base}/blog-category` },
        ]}
      />
      <h1>Update Blog Category</h1>
      <Form
        onSubmit={onSubmit}
        resolver={updateBlogCategoryResolver}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput name='title' label='Title' />
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

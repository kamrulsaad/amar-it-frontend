'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'
import { SubmitHandler } from 'react-hook-form'
import { useCreateBlogCategoryMutation } from '@/redux/api/blog-category/blogCategory'
import { CreateBlogCategoryFormType, createBlogCategoryResolver } from '@/schemas/blogCategory'
const CreateBlogCategory = () => {
  const [createBlogCategory, { isLoading }] = useCreateBlogCategoryMutation()
  const router = useRouter()
  const onSubmit: SubmitHandler<CreateBlogCategoryFormType> = async (data) => {
    message.loading('Creating.....')
    try {
      const response = await createBlogCategory({ ...data }).unwrap()
      if (!!response) {
        router.push('/dashboard/super_admin/blog-category')
        message.success('Blogcategory Created Successfully')
      }
    } catch (err: any) {
      message.error(err.message)
    }
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
      <h1>Create Blog Category</h1>
      <Form onSubmit={onSubmit} resolver={createBlogCategoryResolver}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput name='title' label='Title' />
          </Col>
        </Row>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          add
        </Button>
      </Form>
    </div>
  )
}

export default CreateBlogCategory

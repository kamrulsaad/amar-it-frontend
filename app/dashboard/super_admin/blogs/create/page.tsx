'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { useRouter } from 'next/navigation'
import { Button, message } from 'antd'
import { useGetBlogCategoriesQuery } from '@/redux/api/blog-category/blogCategory'
import FormTextArea from '@/components/Forms/FormTextArea'
import FormSelectField, {
  SelectOptions,
} from '@/components/Forms/FormSelectField'
import UploadImage from '@/components/ui/UploadImage'
import { useCreateBlogMutation } from '@/redux/api/blogApi'

const CreateBlogCategory = () => {
  const { data: blogCategories } = useGetBlogCategoriesQuery(undefined)

  const blogCategoryOptions = blogCategories?.map(
    (item: { title: string; id: string }) => {
      return {
        label: item?.title,
        value: item?.id,
      }
    }
  )

  const [createBlog, { isLoading }] = useCreateBlogMutation()
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
      const res = await createBlog(formData).unwrap()
      if (!!res) {
        router.push('/dashboard/super_admin/blogs')
        message.success('Blog Created Successfully')
      }
    } catch (err: any) {
      for (const error of err.data.errorMessages) {
        message.error(error.message)
      }
    }
  }

  const base = 'super_admin'
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: 'Blog', link: `/${base}/blogs` },
        ]}
      />
      <h1>Create Blog</h1>
      <Form onSubmit={onSubmit}>
        <div
          style={{
            width: '50%',
          }}
        >
          <FormInput name='title' label='Title' />
          <div
            style={{
              margin: '20px 0px',
            }}
          >
            <FormTextArea name='content' label='Content' />
          </div>
          <FormSelectField
            size='large'
            name='blogCategoryId'
            options={blogCategoryOptions as SelectOptions[]}
            label='Category'
            placeholder='Select'
          />
        </div>

        <div
          style={{
            margin: '20px 0px',
          }}
        >
          <UploadImage name='file' />
        </div>

        <Button loading={isLoading} type='primary' htmlType='submit'>
          Create
        </Button>
      </Form>
    </div>
  )
}

export default CreateBlogCategory

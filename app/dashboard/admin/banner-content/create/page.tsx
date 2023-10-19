'use client'

import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import FormTextArea from '@/components/Forms/FormTextArea'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UploadImage from '@/components/ui/UploadImage'
import { useCreateHomeBannerMutation } from '@/redux/api/bannerApi'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'

const CreateBlogContentPage = () => {
  const [addAdminWithFormData, { isLoading }] = useCreateHomeBannerMutation()
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
      const res = await addAdminWithFormData(formData).unwrap()
      if (!!res) {
        router.push('/dashboard/super_admin/faq')
        message.success('Home Banner created successfully!')
      }
    } catch (err: any) {
      for (const error of err.data.errorMessages) {
        message.error(error.message)
      }
    }
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'super_admin',
            link: '/super_admin',
          },
          {
            label: 'banner-content',
            link: '/super_admin/banner-content',
          },
        ]}
      />
      <h1>Create Banner Content</h1>

      <div>
        <Form onSubmit={onSubmit}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className='gutter-row'
              span={8}
              style={{
                marginBottom: '10px',
              }}
            >
              <FormInput type='text' name='title' size='large' label='Title' />
            </Col>
          </Row>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <FormTextArea name='content' rows={4} label='Content' />
          </div>
          <UploadImage name='file' />
          <Button loading={isLoading} htmlType='submit' type='primary'>
            Create
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateBlogContentPage

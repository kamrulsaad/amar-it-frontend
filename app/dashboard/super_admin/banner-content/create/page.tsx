'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import FormTextArea from '@/components/Forms/FormTextArea'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UploadImage from '@/components/ui/UploadImage'
import { useCreateHomeBannerMutation } from '@/redux/api/home-banner/homeBanner'
import {
  CreateHomeBannerFormType,
  createHomeBannerResolver,
} from '@/schemas/homeBanner'
import { Button, Col, Row, message } from 'antd'
import { SubmitHandler } from 'react-hook-form'
const CreateFacultyPage = () => {
  const [createHomeBanner, { isLoading }] = useCreateHomeBannerMutation()

  const onSubmit: SubmitHandler<CreateHomeBannerFormType> = async (
    values: any
  ) => {
    const obj = { ...values }
    console.log(obj)
    const file = obj['file']
    delete obj['file']
    const data = JSON.stringify(obj)
    const formData = new FormData()
    formData.append('file', file as Blob)
    formData.append('data', data)
    message.loading('Creating...')
    try {
      const response = await createHomeBanner(formData).unwrap()

      if (!!response) {
        //    router.push('/login')
        message.success('Home Banner Created successfully!')
      }
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const base = 'super_admin'
  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          {
            label: 'Banner Content',
            link: `/dashboard/${base}/banner-content`,
          },
        ]}
      />
      <h1>Create HomeBanner</h1>
      <Form onSubmit={onSubmit} resolver={createHomeBannerResolver}>
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>
            Banner Content
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput type='text' name='title' label='Title' size='large' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormTextArea rows={4} name='content' label='Content' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <UploadImage name='file' />
            </Col>
          </Row>
        </div>
        <Button loading={isLoading} htmlType='submit'>
          submit
        </Button>
      </Form>
    </>
  )
}

export default CreateFacultyPage

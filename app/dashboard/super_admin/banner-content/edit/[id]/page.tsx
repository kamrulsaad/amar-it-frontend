'use client'

import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import FormTextArea from '@/components/Forms/FormTextArea'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UploadImage from '@/components/ui/UploadImage'
import {
  useGetHomeBannerQuery,
  useUpdateHomeBannerMutation,
} from '@/redux/api/bannerApi'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'

const EditHomeBanner = ({
  params: { id },
}: {
  params: {
    id: string
  }
}) => {
  const { data } = useGetHomeBannerQuery(id)
  const homebanner = data
  const [updateHomeBanner, { isLoading }] = useUpdateHomeBannerMutation()
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
      const response = await updateHomeBanner({ id, body: formData }).unwrap()
      if (!!response) {
        router.push('/dashboard/super_admin/banner-content')
        message.success('HomeBanner Updated Successfully')
      }
    } catch (err: any) {
      for (const error of err.data.errorMessages) {
        message.error(error.message)
      }
    }
  }
  const defaultValues = {
    title: homebanner?.title || '',
    content: homebanner?.content || '',
    image: homebanner?.image || '',
  }
  const base = 'super_admin'
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: 'HomeBanner', link: `/dashboard/${base}/banner-content` },
        ]}
      />
      <h1>Update Home Banner Content</h1>

      <div>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
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
            update
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EditHomeBanner

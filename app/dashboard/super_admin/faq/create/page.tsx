'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'
import { SubmitHandler } from 'react-hook-form'
import { useCreatFaqMutation } from '@/redux/api/faq/faqApi'
import { CreateFaqFormType, createFaqResolver } from '@/schemas/faq'
const CreateDepartmentPage = () => {
  const [creatFaq, { isLoading }] = useCreatFaqMutation()
  const router = useRouter()
  const onSubmit: SubmitHandler<CreateFaqFormType> = async (data) => {
    message.loading('Creating.....')
    try {
      const response = await creatFaq({ ...data }).unwrap()
      if (!!response) {
        router.push('/dashboard/super_admin/faq')
        message.success('Faq Created Successfully')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const base = 'super_admin'
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: 'faq', link: `/dashboard/${base}/faq` },
        ]}
      />
      <h1>Create Faq</h1>
      <Form onSubmit={onSubmit} resolver={createFaqResolver}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput name='question' label='Question' />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput name='answer' label='Answer' />
          </Col>
        </Row>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          add
        </Button>
      </Form>
    </div>
  )
}

export default CreateDepartmentPage

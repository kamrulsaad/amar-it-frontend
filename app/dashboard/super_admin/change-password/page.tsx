'use client'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, message } from 'antd'
import { SubmitHandler } from 'react-hook-form'
import { useChangePasswordMutation } from '@/redux/api/authApi'
import { ResetPasswordFormType, resetPasswordResolver } from '@/schemas/user'
import { storeUserInfo } from '@/services/auth.service'

const ResetPassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const router = useRouter()
  const onSubmit: SubmitHandler<ResetPasswordFormType> = async (data) => {
    message.loading('Updating.....')
    try {
      const response = await changePassword({ ...data }).unwrap()
      if (response?.accessToken) {
        router.push('/dashboard/super_admin')
        message.success('Reset Password Successfully')
      }
      storeUserInfo({ accessToken: response?.accessToken })
    } catch (error: any) {
      message.error(error?.data?.message || 'Something went wrong')
    }
  }
  const base = 'super_admin'
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/dashboard/${base}` },
          { label: 'Reset Password', link: `/dashboard/${base}/` },
        ]}
      />
      <h1>Reset Password</h1>
      <Form onSubmit={onSubmit} resolver={resetPasswordResolver}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput
              type='password'
              name='oldPassword'
              label='Old Password'
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <FormInput
              type='password'
              name='newPassword'
              label='New Password'
            />
          </Col>
        </Row>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          Reset Password
        </Button>
      </Form>
    </div>
  )
}

export default ResetPassword

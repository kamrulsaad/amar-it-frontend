'use client'
import { Col, Row, Button, message } from 'antd'
import LoginImage from '@/assets/login-image.svg'
import Image from 'next/image'
import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import { useUserLoginMutation } from '@/redux/api/authApi'
import { storeUserInfo } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { LoginFormType, loginResolver } from '@/schemas/user'

const Login = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation()

  const router = useRouter()
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await userLogin({ ...data }).unwrap()
      if (response?.accessToken) {
        router.push('/')
        message.success('Login Successful')
      }
      storeUserInfo({ accessToken: response?.accessToken })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Row
      justify={'center'}
      align={'middle'}
      style={{
        minHeight: '100vh',
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image priority src={LoginImage} alt='login image' width={500} />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: '15px 0',
          }}
        >
          First Login to your account
        </h1>
        <div>
          <Form
            onSubmit={onSubmit}
            defaultValues={{
              username: 'hello world',
              password: '123454',
            }}
            resolver={loginResolver}
          >
            <div>
              <FormInput
                type='text'
                size='large'
                name='username'
                label='Username'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormInput
                type='password'
                size='large'
                name='password'
                label='User Password'
              />
            </div>
            <Button loading={isLoading} htmlType='submit' type='primary'>
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default Login

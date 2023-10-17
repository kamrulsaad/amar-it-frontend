'use client'
import { Col, Row, Button, message } from 'antd'
import React from 'react'
import Form from '@/components/Forms/Form'
import FormInput from '../Forms/FormInput'
import UploadImage from '../ui/UploadImage'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { CustomerSignUpFormType } from '@/schemas/user'
import { useCustomerSignUpMutation } from '@/redux/api/authApi'
import Image from 'next/image'
import LoginImage from '@/assets/login-image.svg'
import FormTextArea from '../Forms/FormTextArea'

const CustomerRegistration = () => {
 const [customerSignUp, { isLoading }] = useCustomerSignUpMutation()

 const router = useRouter()
    const onSubmit: SubmitHandler<CustomerSignUpFormType> = async (values : any) => {
      const obj = { ...values }
      const file = obj['file']
      delete obj['file']
      const data = JSON.stringify(obj)
      const formData = new FormData()
      formData.append('file', file as Blob)
      formData.append('data', data)
      message.loading('Creating...')
      try {
        const response = await customerSignUp(formData).unwrap()

        if (!!response) {
          router.push('/login')
          message.success('Customer Register Successful')
        }
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
      gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image priority src={LoginImage} alt='login image' width={500} />
      </Col>
      <Col sm={24} md={8} lg={8}>
        <h1
          style={{
            margin: '15px 0',
            textAlign: 'center',
          }}
        >
          First Register to your account
        </h1>
        <div>
          <Form onSubmit={onSubmit}>
            <div>
              <FormInput
                type='text'
                size='large'
                name='user.username'
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
                name='user.password'
                label='User Password'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormInput
                type='text'
                size='large'
                name='customer.firstName'
                label='First Name'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormInput
                type='text'
                size='large'
                name='customer.middleName'
                label='First Middle Name'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormInput
                type='text'
                size='large'
                name='customer.lastName'
                label='First Last Name'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormInput
                type='email'
                size='large'
                name='customer.email'
                label='Email Address'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormInput
                type='text'
                size='large'
                name='customer.contactNo'
                label='Contact No'
              />
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <Col span={8} style={{ margin: '10px 0' }}>
                <UploadImage name='file' />
              </Col>
            </div>
            <div
              style={{
                margin: '15px 0',
              }}
            >
              <FormTextArea
                name='customer.address'
                label='address'
              />
            </div>
            <Button loading={isLoading} htmlType='submit' type='primary'>
              SignUp
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default CustomerRegistration
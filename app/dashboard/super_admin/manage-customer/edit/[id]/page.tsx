'use client'

import Form from '@/components/Forms/Form'
import FormInput from '@/components/Forms/FormInput'
import FormSelectField from '@/components/Forms/FormSelectField'
import FormTextArea from '@/components/Forms/FormTextArea'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UploadImage from '@/components/ui/UploadImage'
import {
  useAddCustomerWithFormDataMutation,
  useCustomerQuery,
} from '@/redux/api/customerApi'
import { useGetPermissionsQuery } from '@/redux/api/permissionApi'
import { IPermission } from '@/types'

import { Button, Col, Row, message } from 'antd'
import { useRouter } from 'next/navigation'
interface EditAdminProps {
  params: {
    id: string
  }
}

const EditAdmin = ({ params }: EditAdminProps) => {
  const { id } = params
   const router = useRouter()

  const { data: customer } = useCustomerQuery(id)
  const defaultValues = {
    customer: {
      firstName: customer?.firstName,
      middleName: customer?.middleName,
      lastName: customer?.lastName,
      email: customer?.email,
      contactNo: customer?.contactNo,
      address: customer?.address,
      permissionId: customer?.permissionId,
    },
    user: {
      username: customer?.username,
      password: customer?.password,
    },
  }

  const { data } = useGetPermissionsQuery({ limit: 100, page: 1 })
  const [updateCustomer, { isLoading }] = useAddCustomerWithFormDataMutation()
  //@ts-ignore
  const departments: IPermission[] = data?.permissions

  const departmentOptions =
    departments &&
    departments?.map((department) => {
      return {
        label: department?.title,
        value: department?.id,
      }
    })

  const onSubmit = async (values: any) => {
    const obj = { ...values }
    const file = obj['file']
    delete obj['file']
    const data = JSON.stringify(obj)
    const formData = new FormData()
    formData.append('file', file as Blob)
    formData.append('data', data)

    try {
      const response = await updateCustomer({ id, body: formData }).unwrap()
      if (!!response) {
        router.push('/dashboard/super_admin/manage-customer/')
        message.success('Customer updated successfully!')
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
            label: 'manage-admin',
            link: '/super_admin/manage-admin',
          },
        ]}
      />
      <h1>Update Customer</h1>

      <div>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '10px',
            }}
          >
            <p
              style={{
                fontSize: '18px',
                marginBottom: '10px',
              }}
            >
              Customer Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput
                  type='text'
                  name='customer.firstName'
                  size='large'
                  label='First Name'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput
                  type='text'
                  name='customer.middleName'
                  size='large'
                  label='Middle Name'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput
                  type='text'
                  name='customer.lastName'
                  size='large'
                  label='Last Name'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput
                  type='password'
                  name='user.password'
                  size='large'
                  label='Password'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput size='large' name='user.username' label='Username' />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormSelectField
                  size='large'
                  name='customer.permissionId'
                  options={departmentOptions}
                  label='Department'
                  placeholder='Select'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput
                  type='email'
                  name='customer.email'
                  size='large'
                  label='Email address'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormInput
                  type='text'
                  name='customer.contactNo'
                  size='large'
                  label='Contact No.'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <FormTextArea
                  name='customer.address'
                  rows={2}
                  label='Address'
                />
              </Col>
              <Col
                className='gutter-row'
                span={8}
                style={{
                  marginBottom: '10px',
                }}
              >
                <UploadImage name='file' />
              </Col>
            </Row>
          </div>
          <Button loading={isLoading} htmlType='submit' type='primary'>
            Update
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EditAdmin

"use client";
import Form from '@/components/Forms/Form'
import FormInput from "@/components/Forms/FormInput";
import { useCreateContactMutation } from "@/redux/api/contactApi";
import { CreateContactFormType, createContactResolver } from "@/schemas/contact";
import { Button, Checkbox, message } from "antd";
import { SubmitHandler } from "react-hook-form";
// const { TextArea } = Input;

const ContactPage = () => {
  const [createContact, { isLoading }] = useCreateContactMutation()


  const onSubmit: SubmitHandler<CreateContactFormType> = async (data) => {
    try {
      const res = await createContact({ ...data }).unwrap()
      if (!!res) {
        message.success('Email sent successfully')
      }
      
    } catch (error: any) {
      message.error(error?.data?.message || 'Something went wrong')
    }
  }
  return (
    <div id='contact' className='block contactBlock'>
      <div className='container-fluid'>
        <div className='titleHolder'>
          <h2>Get in Touch</h2>
        </div>
        <Form
          onSubmit={onSubmit}
          resolver={createContactResolver}
          // name='normal_login'
          // className='login-form'
          // initialValues={{ remember: true }}
        >
          <div>
            <FormInput type='text' size='large' name='name' label='Name' />
          </div>
          <div>
            <FormInput type='email' size='large' name='email' label='Email' />
          </div>
          <div>
            <FormInput type='text' size='large' name='phone' label='Phone' />
          </div>
          <div>
            <FormInput
              type='text'
              size='large'
              name='subject'
              label='Subject'
            />
          </div>
          {/* <Form.Item name='message'>
            <TextArea name='message' size='large' placeholder='Message' />
          </Form.Item> */}
          <div>
            <FormInput type='text' size='large' name='message' label='Message' />
          </div>
          {/* <div>
            <FormInput
              type='text'
              size='large'
              name='message'
              label='Message'
            />
          </div> */}
          {/* <Form.Item>
            <Form.Item
              name='remember'
              valuePropName='checked'
              noStyle
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject('Should accept agreement'),
                },
              ]}
            >
              <Checkbox>I agree with terms and conditions.</Checkbox>
            </Form.Item>
          </Form.Item> */}
          {/* <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Submit
            </Button>
          </Form.Item> */}
          <Button
            style={{
              display: 'block',
              marginTop: '5px',
            }}
            loading={isLoading}
            htmlType='submit'
            type='primary'
          >
            Contact Us
          </Button>
        </Form>
      </div>
    </div>
  )
};

export default ContactPage;

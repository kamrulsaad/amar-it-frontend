"use client";

import { Form, Input, Button, Checkbox } from "antd";
const { TextArea } = Input;

const ContactPage = () => {
  return (
    <div id="contact" className="block contactBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Get in Touch</h2>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please enter your full name!",
              },
            ]}
          >
            <Input size="large" placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input size="large" placeholder="Email Address" />
          </Form.Item>
          <Form.Item name="telephone">
            <Input size="large" placeholder="Telephone" />
          </Form.Item>
          <Form.Item name="subject">
            <Input size="large" placeholder="Subject" />
          </Form.Item>
          <Form.Item name="message">
            <TextArea size="large" placeholder="Message" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Should accept agreement"),
                },
              ]}
            >
              <Checkbox>I agree with terms and conditions.</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactPage;

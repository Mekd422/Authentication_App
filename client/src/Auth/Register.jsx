import React from 'react'
import {Card, Flex, Typography, Form} from 'antd';
import {Link} from 'react-router-dom'

export const Register = () => {
    const handleRegister = (values) => {
        console.log('Received values:', values);
        // Here you would typically send the values to your backend for registration
    };
  return (
    <Card className='form-conatiner'>
        <Flex>
            <Flex vertical flex={1}>
                <Typography.Title level={3} strong className="title">
                    Create an Account

                </Typography.Title>
                <Typography.Text type="secondary" strong className="slogan">
                    join for exclusive access

                </Typography.Text>
                <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <input size="large" placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }, {
                            type: "email",
                            message: "the input is not valid email"
                        }]}
                    >
                        <input size="large"  placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <input.password size="large" placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="passwordConfirm"
                        rules={[{ required: true, message: 'Please input your Confirm password!' }]}
                    >
                        <input.password size="large" placeholder="Re-enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <button type="primary"
                        htmlType="submit"
                        size="large"
                        className='btn'>
                        Register</button>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/login">
                        </Link>
                        <button size="large"
                        className='btn'>
                        Sign In</button>
                    </Form.Item>

                </Form>
            </Flex>
            <Flex></Flex>
        </Flex>
    </Card>
  )
}


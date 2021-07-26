import { Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const SignUp = ({ context: { signup, loading } = {} }) => {
    const onFinish = (values) => {
        console.log('Success:', values);
        signup(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='px-5'>
            {/* <div className='d-flex align-items-center w-100'> */}
            <Card
                style={{ transform: 'translateX(0%) translateY(30%)' }}
                className='w-100'
                hoverable
            >
                <Form
                    name='basic'
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='First Name'
                        name='firstname'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Last Name'
                        name='lastname'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        Already have an account! <Link to='login'>Login</Link>
                        <Button
                            className='float-end w-25'
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default SignUp;

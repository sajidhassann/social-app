import { Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Login = ({ context: { login, loading } = {} }) => {
    const onFinish = (values) => {
        console.log('Success:', values);
        login(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='px-5'>
            {/* <div className='d-flex align-items-center w-100'> */}
            <Card
                style={{ transform: 'translateX(0%) translateY(60%)' }}
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
                        Don't have an account! <Link to='signup'>Signup</Link>
                        <Button
                            className='float-end w-25'
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;

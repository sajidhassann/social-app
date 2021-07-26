import { Badge, Button, Card, Comment, Form, Input, List } from 'antd';
import { ImSmile2, ImSad2, ImNeutral2 } from 'react-icons/im';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import dayjs from 'dayjs';
import { useRef } from 'react';
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const ThePost = ({
    user,
    emoji,
    content = '',
    count,
    comments = [],
    comment,
    loading,
    rated = 0,
    rate,
}) => {
    const ref = useRef(null);
    const formRef = useRef(null);

    const onFinish = async (values) => {
        console.log('Success:', { values });
        const { message } = values;
        await comment(message);
        ref.current?.scrollIntoView({ behvior: 'smooth' });
        formRef.current?.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', { errorInfo });
    };

    const onRating = (rating) => () => rate(rating);
    return (
        <Card
            className='border-1 border-primary card custom-card m-2 rounded-3'
            hoverable
        >
            <div className='card p-2'>
                <div className='row'>
                    <div className='col-2'>
                        {emoji === 1 ? (
                            <ImSmile2 size={40} />
                        ) : emoji === 3 ? (
                            <ImSad2 size={40} />
                        ) : emoji === 2 ? (
                            <ImNeutral2 size={40} />
                        ) : null}
                    </div>
                    <div className='col-10'>{content}</div>
                    <div className='col-2'></div>
                    <div className='col-10'>
                        <Button
                            type={rated === 1 ? 'primary' : 'default'}
                            ghost={rated === 1}
                            shape='circle'
                            className='border-0 mr-1'
                            icon={<FaThumbsUp className='mx-2' size={20} />}
                            onClick={onRating(1)}
                        >
                            <b>{count?.Likes} Like</b>
                        </Button>
                        <Button
                            type={rated === -1 ? 'primary' : 'default'}
                            ghost={rated === -1}
                            shape='circle'
                            className='border-0 bg-transparent'
                            icon={<FaThumbsDown className='mx-2' size={20} />}
                            onClick={onRating(-1)}
                        >
                            <b>{count?.Dislikes} Dislike</b>
                        </Button>
                    </div>
                </div>
            </div>
            <div
                style={{
                    height: 450,
                    overflow: 'auto',
                    scrollBehavior: 'smooth',
                }}
                className='my-1'
            >
                <List
                    className='comment-list bg-white rounded-2'
                    itemLayout='vertical'
                    dataSource={comments}
                    loading={loading}
                    rowKey={({ id }) => id.toString()}
                    renderItem={(item) => (
                        <div ref={ref}>
                            <List.Item
                                itemID={item?.id.toString()}
                                key={item?.id.toString()}
                                className='py-2 px-3'
                            >
                                {item?.users_id === user?.id ? (
                                    <Badge.Ribbon text='Author'>
                                        <Comment
                                            author={<b>{item?.pseudonyms}</b>}
                                            avatar='https://bulma.io/images/placeholders/128x128.png'
                                            content={<p>{item?.message}</p>}
                                            datetime={dayjs(
                                                item?.createdAt,
                                            ).fromNow()}
                                        />
                                    </Badge.Ribbon>
                                ) : (
                                    <Comment
                                        author={<b>{item?.pseudonyms}</b>}
                                        avatar='https://bulma.io/images/placeholders/128x128.png'
                                        content={<p>{item?.message}</p>}
                                        datetime={dayjs(
                                            item?.createdAt,
                                        ).fromNow()}
                                    />
                                )}
                            </List.Item>
                        </div>
                    )}
                />
            </div>
            <div className='w-100'>
                <Form
                    ref={formRef}
                    className='w-100 d-flex'
                    name='horizontal_login'
                    layout='inline'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div className='d-flex w-100'>
                        <Form.Item
                            className='w-75 p-0 m-0'
                            name='message'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your comment!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                className='w-100'
                                placeholder={`e.g. Hello world...`}
                                rows={1}
                                // onChange={onChange}
                                // value={value}
                            />
                        </Form.Item>
                        <div className='w-25 p-0 m-0 h-100 d-flex flex-grow-1'>
                            <Button
                                className='w-100 h-auto'
                                htmlType='submit'
                                type='primary'
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Card>
    );
};

export default ThePost;

import { Card } from 'antd';

const Post = ({ content, ...rest }) => {
    return (
        <Card
            {...rest}
            className='border-1 border-primary card custom-card m-2 rounded-3'
            hoverable
        >
            {content}
        </Card>
    );
};

export default Post;

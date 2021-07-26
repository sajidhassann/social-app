import { Button, Layout } from 'antd';
import NewPost from '../NewPost';
import Posts from '../Posts';
const { Header, Content } = Layout;

const Home = ({
    context: {
        posts = [],
        activePost = {},
        loading,
        postLoading,
        commentLoading,
        getPostData = () => {
            console.log('getPostData');
        },
        post = () => {
            console.log('post');
        },
        comment = () => {
            console.log('comment');
        },
        rate = () => {
            console.log('rate');
        },
        logout = () => {
            console.log('logout');
        },
    } = {},
}) => {
    console.log({ activePost });
    return (
        <Layout className='bg-white'>
            <Header
                className='position-fixed w-100 d-flex justify-content-between align-items-center'
                style={{ zIndex: 1000 }}
            >
                <h4 className='text-uppercase text-white'>Social App</h4>
                <Button onClick={logout}>
                    <b>Logout</b>
                </Button>
            </Header>
            <Content className='mt-5'>
                <div className='mt-3 p-3 w-100'>
                    <NewPost submitting={loading} post={post} />
                    <Posts
                        posts={posts}
                        activePost={activePost}
                        loading={postLoading}
                        commentLoading={commentLoading}
                        comment={comment}
                        getPostData={getPostData}
                        rate={rate}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default Home;

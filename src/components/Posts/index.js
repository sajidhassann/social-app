import Post from '../Post';
import ThePost from '../ThePost';
import './style.css';

const Posts = ({
    posts,
    getPostData,
    activePost,
    comment,
    rate,
    loading,
    commentLoading,
}) => {
    return (
        <div className='card-columns columns-2-sm columns-3-md w-100'>
            {posts?.map?.(({ id, mood, message, author_uid }) =>
                id === activePost?.id && !loading ? (
                    <ThePost
                        key={id.toString()}
                        user={{ id: author_uid }}
                        loading={commentLoading}
                        content={message}
                        emoji={mood}
                        count={activePost?.count}
                        comments={activePost?.comments}
                        rated={activePost?.rated}
                        rate={rate}
                        comment={comment}
                    />
                ) : (
                    <Post
                        key={id.toString()}
                        loading={loading && id === activePost?.id}
                        content={message}
                        onClick={() => getPostData(id)}
                    />
                ),
            )}
        </div>
    );
};

export default Posts;

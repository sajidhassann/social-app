import 'antd/dist/antd.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './routing/PrivateRoute';
import PublicRoute from './routing/PublicRoute';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post('/signin', data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setToken(res.data.token);
            setUser(res.data.user);
            console.log(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    const signup = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post('/signup', data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setToken(res.data.token);
            setUser(res.data.user);
            console.log(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const [posts, setPosts] = useState([]);
    const getAllPosts = async () => {
        try {
            const res = await axios.get('/posts/all');
            console.log(res.data);
            setPosts(res.data);
        } catch (err) {
            console.log({ err });
        }
    };

    const [activePost, setActivePost] = useState(undefined);
    const [postLoading, setPostLoading] = useState(false);
    const getPostData = async (id) => {
        setPostLoading(true);
        setActivePost({ id });
        try {
            const res = await Promise.allSettled([
                axios.get('/comments/getByPostID/' + id),
                axios.get('/ratings/getByPostID/' + id),
                axios.get('/ratings/getRatingByPostAndUserID/' + id),
            ]);
            console.log({ res });
            setActivePost({
                id,
                comments: res[0]?.value ? res[0].value.data : [],
                count: res[1]?.value
                    ? res[1].value.data
                    : { Likes: 0, Dislikes: 0 },
                rated:
                    res[2]?.value?.data === ''
                        ? -1000
                        : res[2]?.value?.data.rating,
            });
            setPostLoading(false);
        } catch (err) {
            console.log({ err });
            setActivePost({
                id,
                comments: [],
                count: { Likes: 0, Dislikes: 0 },
            });
            setPostLoading(false);
        }
    };

    const getComments = async () => {
        try {
            const res = await axios.get(
                '/comments/getByPostID/' + activePost?.id,
            );
            setActivePost({ ...activePost, comments: res.data });
        } catch (err) {
            console.log({ err });
        }
    };

    const [commentLoading, setCommentLoading] = useState(false);
    const comment = async (message) => {
        setCommentLoading(true);
        try {
            const res = await axios.post('/comments/post', {
                message,
                posts_id: activePost?.id,
            });
            console.log(res.data);
            await getComments();
            setCommentLoading(false);
        } catch (err) {
            console.log({ err });
            setCommentLoading(false);
        }
    };

    const getRatings = async (rating) => {
        try {
            const res = await axios.get(
                '/ratings/getByPostID/' + activePost?.id,
            );
            setActivePost({
                ...activePost,
                count: res?.data ? res.data : { Likes: 0, Dislikes: 0 },
                rated: rating === '' ? -1000 : rating,
            });
        } catch (err) {
            console.log({ err });
        }
    };

    const rate = async (rating) => {
        if (rating !== activePost?.rated) {
            try {
                if (activePost?.rated > -2) {
                    const res = await axios.put(
                        '/ratings/edit/' + activePost?.id,
                        {
                            rating,
                        },
                    );
                    if (res.data.success) {
                        await getRatings(rating);
                    }
                } else {
                    const res = await axios.post('/ratings/add', {
                        rating,
                        posts_id: activePost?.id,
                    });
                    await getRatings(
                        res.data === '' ? res.data : res.data.rating,
                    );
                }
            } catch (err) {
                console.log({ err });
            }
        }
    };

    const post = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post('/posts/create', data);
            console.log(res.data);
            await getAllPosts();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log({ err });
        }
    };
    const logout = () => {
        setToken(null);
        setUser(null);
        setActivePost(undefined);
        setPosts([]);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    useEffect(() => {
        if (token) {
            getAllPosts();
        }
        return () => {};
    }, [token]);
    return (
        <div>
            <Router>
                <>
                    <Switch>
                        <PrivateRoute
                            context={{
                                posts,
                                activePost,
                                loading,
                                postLoading,
                                commentLoading,
                                getPostData,
                                post,
                                comment,
                                rate,
                                logout,
                            }}
                            loading={loading}
                            token={token}
                            exact
                            path='/'
                            component={Home}
                        />
                        <PublicRoute
                            exact
                            context={{ login, loading }}
                            token={token}
                            path='/login'
                            component={Login}
                        />
                        <PublicRoute
                            exact
                            context={{ signup, loading }}
                            token={token}
                            path='/signup'
                            component={SignUp}
                        />
                    </Switch>
                </>
            </Router>
        </div>
    );
};

export default App;

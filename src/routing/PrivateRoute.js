import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    component: Component,
    token,
    loading,
    context,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !token && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component context={context} {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;

import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, token, context, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Redirect to='/' />
                ) : (
                    <Component context={context} {...props} />
                )
            }
        />
    );
};

export default PublicRoute;

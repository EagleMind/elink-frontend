import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isAuthenticated = sessionStorage.getItem('TOKEN_KEY'); // Check if token exists in local storage
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
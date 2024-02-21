import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';


const PrivateRoute = () => {
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isAuthenticated = localStorage.getItem('token')
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const PrivateRoute = () => {
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const token = Cookies.get('token');
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
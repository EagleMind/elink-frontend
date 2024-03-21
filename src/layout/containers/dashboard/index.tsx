import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../../redux/features/dashboard';
import Dashboard from '../../../views/dashboard';


const DashboardContainer: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDashboardData()); // Dispatch the fetch action
    }, [dispatch]);



    return (
        <Dashboard />
    );
};

export default DashboardContainer;

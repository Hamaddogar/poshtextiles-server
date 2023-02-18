import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthCheck } from '../../../utils/auth';


const Dashboard = () => {
    const { isAuthorised } = useSelector(store => store.mainReducer);
    AuthCheck();

    return isAuthorised
        ?
        <Box>
            <Box><Outlet /></Box>
        </Box>
        :
        <Navigate to="/login" replace={true} />
};

export default Dashboard;

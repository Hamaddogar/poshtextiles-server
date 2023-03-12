import { useMsal } from '@azure/msal-react';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { saveTokenServer } from '../../../RTK/Reducers/Reducers';
import { AuthCheck } from '../../../utils/auth';
import { loginRequest } from '../../../utils/authConfig';


const Dashboard = () => {
    const { isAuthorised } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();

    const { accounts, instance } = useMsal();
    AuthCheck();


    // schdular for 50 minutes
    setInterval(() => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                dispatch(saveTokenServer({
                    token: response.accessToken,
                    toastPermission: false
                }))
            })
    }, 50 * 60 * 1000);

    return isAuthorised
        ?
        <Box>
            <Box><Outlet /></Box>
        </Box>
        :
        <Navigate to="/login" replace={true} />
};

export default Dashboard;

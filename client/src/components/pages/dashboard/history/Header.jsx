import React from 'react';
import { Box } from '@mui/system';
import NavMenu from '../../../header/NavMenu';
import { Button, ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { historyGetter } from '../../../../RTK/Reducers/Reducers';
import { btnSm } from '../reUseAbles/ReuseAbles';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../../utils/authConfig';
import { API } from '../../../../utils/confidential';






const Header = () => {
    const dispatch = useDispatch();
    const { accessToken, postMan } = useSelector(store => store.mainReducer)
    const { instance, accounts } = useMsal();

    const dataGetter = () => {
        // dispatch(historyGetter({
        //     token: accessToken,
        //     endpoint: API.saleOrderFull,
        //     toastPermission: true
        // }))
        instance
        .acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
        .then((response) => {
            dispatch(historyGetter({
                token: postMan ? accessToken : response.accessToken,
                endpoint: API.microsoft.saleOrder,
                toastPermission: true
            }));
        }).catch((e) => { console.log("-error ", e) });
    }

    return (
        <Box>
            <NavMenu>
                <Button size='small' variant='contained' >History</Button>
                <ButtonBase sx={btnSm} size='small' onClick={dataGetter} > Data Getter </ButtonBase>
            </NavMenu>
        </Box>
    )
}

export default Header

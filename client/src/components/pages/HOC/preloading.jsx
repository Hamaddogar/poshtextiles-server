import { useMsal } from '@azure/msal-react';
import { Box } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { inventoryDataFunction, LOG_OUT, saleOrderNoFilter } from '../../../RTK/Reducers/Reducers';
import { loginRequest } from '../../../utils/authConfig';
import preloader from '../../assets/images/preloader.gif'



const Preloading = ({ children }) => {
    const dispatch = useDispatch();

    const { accounts, instance } = useMsal();
    const [preloading, setPreloading] = React.useState(true)


    React.useEffect(() => {
        if (accounts.length > 0) {
            // onLoad calling Api
            instance
                .acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0],
                })
                .then((response) => {
                    dispatch(saleOrderNoFilter({
                        token: response.accessToken,
                        toastPermission: false
                    }));
                    dispatch(inventoryDataFunction({
                        token: response.accessToken,
                        toastPermission: false
                    }));

                })
                .catch((e) => { console.log("-error ", e) });

            setTimeout(() => {
                setPreloading(false)
            }, 4000);

        } else dispatch(LOG_OUT());
        //eslint-disable-next-line
    }, [accounts])


    return (
        <div>
            {preloading ?
                <Box sx={{ height: '100vh', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <img alt=' ' src={preloader} style={{ maxWidth: '100px', width: '90%' }} />
                </Box>
                :
                children
            }
        </div>
    )
}

export default Preloading
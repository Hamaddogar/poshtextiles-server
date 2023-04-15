import { useMsal } from '@azure/msal-react';
import { Box } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { inventoryDataFunction, LOG_OUT, saleOrderNoFilter } from '../../../RTK/Reducers/Reducers';
import preloader from '../../assets/images/preloader.gif'
import { request_AccessToken_MICROSOFT } from '../../../utils/API_HELPERS';



const Preloading = ({ children }) => {
    const dispatch = useDispatch();

    const { accounts } = useMsal();
    const [preloading, setPreloading] = React.useState(true)


    React.useEffect(() => {
        if (accounts.length > 0) {
            // onLoad calling Api
            request_AccessToken_MICROSOFT()
            .then(decide => {
                if (decide.success) {
                    dispatch(saleOrderNoFilter({
                        token: decide.token,
                        toastPermission: false
                    }));
                    dispatch(inventoryDataFunction({
                        token: decide.token,
                        toastPermission: false
                    }));
                }
            })

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
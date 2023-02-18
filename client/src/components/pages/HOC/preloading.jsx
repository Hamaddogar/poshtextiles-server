import { useMsal } from '@azure/msal-react';
import { Box } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FEDEXP_TOEKN_SETTER, historyGetter, LOG_OUT, saleOrderNoFilter, UPDATE_TOKEN } from '../../../RTK/Reducers/Reducers';
import { loginRequest } from '../../../utils/authConfig';
import { API } from '../../../utils/confidential';
import { requestAccessToken_FEDEXP, requestAccessToken_MICROSOFT } from '../../../utils/FEDEXP_API_HELPERS';
import preloader from '../../assets/images/preloader.gif'



const Preloading = ({ children }) => {
    const { accessToken, postMan } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();

    const { accounts, instance } = useMsal();
    const [preloading, setPreloading] = React.useState(true)


    React.useEffect(() => {
        if (accounts.length > 0) {
            requestAccessToken_FEDEXP()
                .then(res => {
                    dispatch(FEDEXP_TOEKN_SETTER(res))
                });
            requestAccessToken_MICROSOFT()
                .then(res => {
                    dispatch(UPDATE_TOKEN({
                        token: postMan ? accessToken : res,
                        notify: false
                    }))
                    dispatch(saleOrderNoFilter({
                        token: res,
                        endpoint: API.microsoft.saleOrderFull,
                        toastPermission: true
                    }));
                    dispatch(historyGetter({
                        token: postMan ? accessToken : res,
                        endpoint: API.microsoft.saleOrderFull,
                        toastPermission: true
                    }));
                });




            // instance
            //     .acquireTokenSilent({
            //         ...loginRequest,
            //         account: accounts[0],
            //     })
            //     .then((response) => {
            //         dispatch(saleOrderNoFilter({
            //             token: postMan ? accessToken : response.accessToken,
            //             endpoint: API.microsoft.saleOrderFull,
            //             toastPermission: false
            //         }));
            //         dispatch(historyGetter({
            //             token: postMan ? accessToken : response.accessToken,
            //             endpoint: API.microsoft.saleOrderFull,
            //             toastPermission: false
            //         }));
            //     }).catch((e) => { console.log("-error ", e) });

            setTimeout(() => {
                setPreloading(false)
            }, 5000);

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
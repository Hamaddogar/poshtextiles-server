import { useMsal } from '@azure/msal-react';
import { Box } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { FEDEXP_TOEKN_SETTER, LOG_OUT, saleOrderNoFilter, saveTokenServer } from '../../../RTK/Reducers/Reducers';
import { loginRequest } from '../../../utils/authConfig';
import { requestAccessToken_FEDEXP } from '../../../utils/FEDEXP_API_HELPERS';
import preloader from '../../assets/images/preloader.gif'



const Preloading = ({ children }) => {
    // const { accessToken, postMan } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();

    const { accounts, instance } = useMsal();
    const [preloading, setPreloading] = React.useState(true)


    React.useEffect(() => {
        if (accounts.length > 0) {
            requestAccessToken_FEDEXP()
                .then(res => {
                    dispatch(FEDEXP_TOEKN_SETTER(res))
                });

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

                    dispatch(saveTokenServer({
                        token: response.accessToken,
                        toastPermission: false
                    }))

                }).catch((e) => { console.log("-error ", e) });




            // requestAccessToken_MICROSOFT()
            //     .then(res => {
            //         dispatch(UPDATE_TOKEN({
            //             token: res,
            //             notify: false
            //         }))
            //         dispatch(saleOrderNoFilter({
            //             token: res,
            //             toastPermission: true
            //         }));
            //         // dispatch(historyGetter({
            //         //     token: res,
            //         //     toastPermission: true
            //         // }));
            //     });

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
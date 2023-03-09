import React from 'react';
import { ButtonBase, FormControl, Hidden, Select } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { btnSm, lnk, styleSlect } from '../reUseAbles/ReuseAbles';
import NavMenu from '../../../header/NavMenu';
import { useDispatch } from 'react-redux';
import { saleOrderNoFilter } from '../../../../RTK/Reducers/Reducers';
import { requestAccessToken_MICROSOFT } from '../../../../utils/FEDEXP_API_HELPERS';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../../../utils/authConfig';

const Header = () => {
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [route, setRoute] = React.useState("");

    React.useEffect(() => {
        navigate(route);
        //eslint-disable-next-line
    }, [route]);

    const dataGetter = () => {
        instance
        .acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
        .then((response) => {
            dispatch(saleOrderNoFilter({
                            token: response.accessToken,
                            toastPermission: true
                        }));
        }).catch((e) => { console.log("-error ", e) });
        // requestAccessToken_MICROSOFT()
        //     .then(res => {
        //         dispatch(saleOrderNoFilter({
        //             token: res,
        //             toastPermission: true
        //         }));
        //     })
    };


    return (
        <Box >
            <NavMenu>
                <Hidden smDown>

                    <Stack direction={'row'} justifyContent='center' spacing={{ xs: 3, md: 3 }} alignItems='center'>
                        <Link style={lnk} to='/charge-card'>
                            <ButtonBase sx={btnSm} size='small' > CHARGE CARD </ButtonBase>
                        </Link>
                        <Link style={lnk} to='/history'>
                            <ButtonBase sx={btnSm} size='small' > HISTORY </ButtonBase>
                        </Link>
                        <ButtonBase sx={btnSm} size='small' onClick={dataGetter} > Data Getter </ButtonBase>
                    </Stack>
                </Hidden>




                <Hidden smUp>
                    <Box>
                        <FormControl fullWidth>
                            <Select
                                labelId="routes-select-label"
                                id="routes-select"
                                value={route}
                                onChange={(e) => setRoute(e.target.value)}
                                size='small'
                                sx={{ ...styleSlect, backgroundColor: 'white', }}
                                displayEmpty
                            >
                                {
                                    [
                                        { name: 'Select Page', linkTo: '' },
                                        { name: 'Shipping Quote', linkTo: '/shipping-quote' },
                                        { name: 'Charge Card', linkTo: '/charge-card' },
                                        { name: 'History', linkTo: '/history' },
                                        { name: 'Token Update', linkTo: '/token' },
                                    ].map(route => <MenuItem key={route.name} value={route.linkTo} sx={{ fontSize: '12px' }}>{route.name}</MenuItem>)
                                }
                                <MenuItem disableRipple disableTouchRipple ><ButtonBase sx={btnSm} size='small' onClick={dataGetter} > Data Getter </ButtonBase></MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Hidden>
            </NavMenu>
        </Box>
    )
}

export default Header

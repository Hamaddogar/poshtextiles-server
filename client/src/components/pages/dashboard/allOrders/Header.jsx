import React from 'react';
import { ButtonBase, FormControl, Hidden, Select } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { btnSm, lnk, styleSlect } from '../reUseAbles/ReuseAbles';
import NavMenu from '../../../header/NavMenu';
import { useDispatch, useSelector } from 'react-redux';
import { saleOrderNoFilter } from '../../../../RTK/Reducers/Reducers';
import { loginRequest } from '../../../../utils/authConfig';
import { useMsal } from '@azure/msal-react';
import { API } from '../../../../utils/confidential';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { accessToken, postMan } = useSelector(store => store.mainReducer)
    const [route, setRoute] = React.useState("");
    const { instance, accounts } = useMsal();


    React.useEffect(() => {
        navigate(route);
        //eslint-disable-next-line
    }, [route]);

    const dataGetter = () => {
        const ttk = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYThmMWE1ZjktZjhiOC00MDBjLTg3YTEtYTcwNGJlMmQ3ZGMyLyIsImlhdCI6MTY3NjcxOTU4NywibmJmIjoxNjc2NzE5NTg3LCJleHAiOjE2NzY3MjM0ODcsImFpbyI6IkUyWmdZR2h1Q1hsMnR1SEVnUi9QT2ppMy9Uc2tBUUE9IiwiYXBwaWQiOiJkYThkYzUzNC1lNjQyLTQ2ZTItOGYyOC01N2JjNzFkODU0YzAiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hOGYxYTVmOS1mOGI4LTQwMGMtODdhMS1hNzA0YmUyZDdkYzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJiMDZjMTliOC01YTAzLTQ0MjQtYWNjMy04OThhODQwYWMwMWYiLCJyaCI6IjAuQVZvQS1hWHhxTGo0REVDSG9hY0V2aTE5d2ozdmJabHNzMU5CaGdlbV9Ud0J1SjlhQUFBLiIsInJvbGVzIjpbIkFQSS5SZWFkV3JpdGUuQWxsIl0sInN1YiI6ImIwNmMxOWI4LTVhMDMtNDQyNC1hY2MzLTg5OGE4NDBhYzAxZiIsInRpZCI6ImE4ZjFhNWY5LWY4YjgtNDAwYy04N2ExLWE3MDRiZTJkN2RjMiIsInV0aSI6ImQ1SU92TDM0MTA2NWNtcy05MEJFQUEiLCJ2ZXIiOiIxLjAifQ.mQoHVIl2BUXOBaHngt8bWqSNFIXzt__lzernfC1jpP_eVNgPv13MeAKW2K-pRh5DSli-wxLTSb8LStSjFeDp0BBQXxMsL0Njcf_1S8jXG4McrBv4SMRCxc-3YwFKXJEA0Y3a-0lrWjprkD33Ww3a0lT6xgpu_dCnezvfNntW4D60yeE9TLxuFMxGgBcZXW8RMoT1X9XvA1kEFbazUu3gLKjTQt_kiGVzcE-tqfYFbb_XZfzrAxxgqvuNCVXmUP00tG1jlgrbw2Y004zCRpCPVEowNmWmvQJMrhHzzkLRUSKOLtsmS2YObaXKFjyiEZlfl19NvX5NcgftarZSo_7Oyg"
        const api = "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$expand=edcSalesLines,edcCustomers,edcWhseShipments&$count=true"
       
        dispatch(saleOrderNoFilter({
            token: accessToken,
            endpoint: API.microsoft.saleOrderFull,
            toastPermission: true
        }));
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

import React from 'react';
import { Box } from '@mui/system';
import NavMenu from '../../../header/NavMenu';
import { ButtonBase, FormControl, MenuItem, Select, Stack } from '@mui/material';
import { btnSm, styleSlect } from '../reUseAbles/ReuseAbles';
import { useDispatch, useSelector } from 'react-redux';
import { inventoryGetter } from '../../../../RTK/Reducers/Reducers';
import { API } from '../../../../utils/confidential';
// import OAuth2Login from 'react-simple-oauth2-login';
// import { generaterToken } from '../../../../utils/OauthToken';
// import { UseOAuth2 } from '../../../../utils/selfToken';
// import { tokenGetter } from '../../../../utils/graph';
// import { tokenGetter } from '../../../../utils/graph';





const Header = () => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(store => store.mainReducer)
    // const ci = `client_id=da8dc534-e642-46e2-8f28-57bc71d854c0&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=wrN8Q~vvX2FDmt_Sf.7ltpQta41eABkoaq.j0bBS`
    const inventoryDataGetter = () => {
        dispatch(inventoryGetter({
            token: accessToken,
            endpoint: API.inventory,
            toastPermission: true,
        }));
    };

    // const tokener = () => {
    //     const st = generaterToken;
    //     console.log(st);

    //     UseOAuth2({
    //         authorizeUrl: "https://login.microsoftonline.com/organizations",
    //         clientId: "da8dc534-e642-46e2-8f28-57bc71d854c0",
    //         redirectUri: "http://localhost:3000/",
    //         scope: "https://api.businesscentral.dynamics.com/.default",
    //     })
    // };
    // // const onSuccess = response => console.log(response);
    // // const onFailure = response => console.error(response);

    // const apiToken = () => {
    //     tokenGetter()
    // }

    return (
        <Box>
            <NavMenu>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <FormControl fullWidth>
                        <Select
                            labelId="routes-select-label"
                            id="routes-select"
                            value={'adjustment'}
                            // onChange={(e) => setRoute(e.target.value)}
                            size='small'
                            sx={{ ...styleSlect, backgroundColor: 'white', width: '130px', maxWidth: '130px', boxShadow: '1px 1px 4px rgb(0 0 0 / 25%)', borderRadius: '5px' }}
                        >
                            <MenuItem value={'adjustment'} sx={{ fontSize: '12px' }}>Adjustment</MenuItem>
                            <MenuItem value={'adjustment2'} sx={{ fontSize: '12px' }}>Adjustment 2</MenuItem>

                        </Select>
                    </FormControl>


                    <FormControl fullWidth>
                        <Select
                            labelId="routes-select-label"
                            id="routes-select"
                            value={'transfer'}
                            // onChange={(e) => setRoute(e.target.value)}
                            size='small'
                            sx={{ ...styleSlect, backgroundColor: 'white', width: '130px', maxWidth: '130px', boxShadow: '1px 1px 4px rgb(0 0 0 / 25%)', borderRadius: '5px' }}
                        >
                            <MenuItem value={'transfer'} sx={{ fontSize: '12px' }}>Transfer</MenuItem>
                            <MenuItem value={'transfer'} sx={{ fontSize: '12px' }}>Transfer</MenuItem>
                            <MenuItem value={'transfer'} sx={{ fontSize: '12px' }}>Transfer</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <OAuth2Login
                        authorizationUrl="https://login.microsoftonline.com/oauth2/v2.0/token"
                        responseType="token"
                        clientId={"da8dc534-e642-46e2-8f28-57bc71d854c0"}
                        redirectUri="http://localhost:3000/oauth-callback"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        
                        /> */}
                    <ButtonBase sx={btnSm} size='small' onClick={inventoryDataGetter} > InventoryData </ButtonBase>
                    {/* <ButtonBase sx={btnSm} size='small' onClick={apiToken} > apiToken </ButtonBase>
                    <ButtonBase sx={btnSm} size='small' onClick={tokener} > Gen_Token </ButtonBase> */}
                </Stack>
            </NavMenu>
        </Box>
    )
}

export default Header

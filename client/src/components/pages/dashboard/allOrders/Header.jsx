import React from 'react';
import { ButtonBase, FormControl, Hidden, Select } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { btnSm, lnk, styleSlect } from '../reUseAbles/ReuseAbles';
import NavMenu from '../../../header/NavMenu';

const Header = () => {
    const navigate = useNavigate();
    const [route, setRoute] = React.useState("");

    React.useEffect(() => {
        navigate(route);
        //eslint-disable-next-line
    }, [route]);


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
                                        { name: 'Charge Card', linkTo: '/charge-card' },
                                        { name: 'History', linkTo: '/history' },
                                    ].map(route => <MenuItem key={route.name} value={route.linkTo} sx={{ fontSize: '12px' }}>{route.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Hidden>
            </NavMenu>
        </Box>
    )
}

export default Header

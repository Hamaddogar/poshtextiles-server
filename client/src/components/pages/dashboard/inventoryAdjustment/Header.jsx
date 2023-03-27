import React from 'react';
import { Box } from '@mui/system';
import NavMenu from '../../../header/NavMenu';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { lnk } from '../reUseAbles/ReuseAbles';






const Header = () => {

    return (
        <Box>
            <NavMenu>
                <Stack spacing={3} direction='row' >
                    <Link to='/pinventory' style={lnk}> <Button size='small' variant='outlined' >Physical Inventory</Button></Link>
                    <Link to='/bin' style={lnk}><Button size='small' variant='outlined' >Bin Transfer</Button></Link>
                    <Link to='/location-transfer' style={lnk}><Button size='small' variant='outlined' >Location Transfer</Button></Link>
                </Stack>
            </NavMenu >
        </Box >
    )
}

export default Header

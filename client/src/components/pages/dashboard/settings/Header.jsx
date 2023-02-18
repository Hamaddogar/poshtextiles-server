import React from 'react';
import { Box } from '@mui/system';
import NavMenu from '../../../header/NavMenu';
import { Button } from '@mui/material';






const Header = () => {

    return (
        <Box>
            <NavMenu>
                <Button size='small' variant='contained' >Settings</Button>
            </NavMenu>
        </Box>
    )
}

export default Header

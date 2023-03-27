import React from 'react';
import { Box } from '@mui/system';
import NavMenu from '../../../header/NavMenu';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { styleSlect } from '../reUseAbles/ReuseAbles';


const Header = () => {

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
                </Stack>
            </NavMenu>
        </Box>
    )
}

export default Header

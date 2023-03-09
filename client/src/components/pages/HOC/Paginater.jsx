import React from 'react';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../dashboard/reUseAbles/ReuseAbles';

const Paginater = ({ size, children }) => {
    const navigate = useNavigate();
    return (
        <div>
            {
                size > 0 &&
                <Stack direction='row' my={3} textAlign='right' mt={2} justifyContent='space-between' alignItems={'center'}>
                    <BackButton onClick={() => navigate(-1)} />
                    <Box> {children} </Box>
                </Stack>
            }
        </div>
    )
}

export default Paginater
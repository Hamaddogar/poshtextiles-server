import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

const LoadingScreen = () => {
    return (
        <Stack direction='row' sx={{ height: '100vh', width: '100%' }} alignItems={'center'} justifyContent={'center'} >
            <CircularProgress />
        </Stack>
    )
}

export default LoadingScreen
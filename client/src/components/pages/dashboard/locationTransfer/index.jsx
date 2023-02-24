import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import LocationTransfer from './LocationTransfer';


const LocationTransferPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'Location Transfer'}
                        fontSize={{ xs: '22px', sm: '25px', md: '35px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <LocationTransfer />
                </Box>
            </Box>
        </Box>
}

export default LocationTransferPage

import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import Physicalinventory from './Physicalinventory';


const PhysicalinventoryPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'physical inventory'}
                        fontSize={{ xs: '22px', sm: '30px', md: '40px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <Physicalinventory />
                </Box>
            </Box>
        </Box>
}

export default PhysicalinventoryPage

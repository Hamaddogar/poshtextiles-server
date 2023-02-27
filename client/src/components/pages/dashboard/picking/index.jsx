import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import Picking from './Picking';


const PickingPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'inspection'}
                        fontSize={{ xs: '22px', sm: '40px', md: '55px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <Picking />
                </Box>
            </Box>
        </Box>
}

export default PickingPage

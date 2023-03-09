import { Box } from '@mui/system';
import React from 'react';

import saleorder from '../../../assets/icons/saleorder.png';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import Header from './Header';
import StockDetails from './StockDetails';


const StockDetailsPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
        <Header />
        <Box id='holder'>
            <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                <SideTextWrapper
                    icon={saleorder}
                    text={'Stock Details'}
                    fontSize={{xs:'20px',sm:'40px',md:'50px'}}
                />
            </Box>
            <Box id='displayer'>
                <StockDetails />
            </Box>
        </Box>
    </Box>
}

export default StockDetailsPage

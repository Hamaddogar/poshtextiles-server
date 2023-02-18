import { Box } from '@mui/system';
import React from 'react';

import AllOrders from './AllOrders';
import Header from './Header';


const AllSaleOrdersPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                </Box>
                <Box id='displayer'>
                    <AllOrders />
                </Box>
            </Box>
        </Box>
}

export default AllSaleOrdersPage

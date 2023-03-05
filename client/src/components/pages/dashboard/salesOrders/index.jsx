import { Box } from '@mui/system';
import React from 'react';
import Header from './Header';
import SalesOrders from './SalesOrders';


const SalesOrdersPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}></Box>
                <Box id='displayer'>
                    <SalesOrders />
                </Box>
            </Box>
        </Box>
}

export default SalesOrdersPage

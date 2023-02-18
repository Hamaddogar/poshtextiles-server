import { Box } from '@mui/system';
import React from 'react';

import Header from './Header';
import ShippingQuote from './ShippingQuote';


const ShippingQuotePage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}></Box>
                <Box id='displayer'>
                    <ShippingQuote />
                </Box>
            </Box>
        </Box>
}

export default ShippingQuotePage

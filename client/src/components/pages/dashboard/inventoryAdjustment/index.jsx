import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import InventoryAdjustment from './InventoryAdjustment';


const InventoryAdjustmentPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'Inventory Adjustment'}
                        fontSize={{ xs: '22px', sm: '20px', md: '35px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <InventoryAdjustment />
                </Box>
            </Box>
        </Box>
}

export default InventoryAdjustmentPage

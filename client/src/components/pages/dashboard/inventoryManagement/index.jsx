import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import InventoryManagment from './InventoryManagement';


const InventoryManagementPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'Inventory Management'}
                        fontSize={{ xs: '22px', sm: '23px', md: '30px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <InventoryManagment />
                </Box>
            </Box>
        </Box>
}

export default InventoryManagementPage

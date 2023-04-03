import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import CSVOrdersDetail from './CSVOrdersDetail';


const CSVOrdersPageDetail = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'MB Important'}
                        fontSize={{ xs: '15px', sm: '25px', md: '35px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <CSVOrdersDetail />
                </Box>
            </Box>
        </Box>
}

export default CSVOrdersPageDetail

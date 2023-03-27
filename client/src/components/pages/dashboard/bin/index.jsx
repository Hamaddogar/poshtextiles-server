import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import Bin from './Bin';
import Header from './Header';


const BinTransferPage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'Bin transfer'}
                        fontSize={{ xs: '22px', sm: '50px', md: '55px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <Bin />
                </Box>
            </Box>
        </Box>
}

export default BinTransferPage

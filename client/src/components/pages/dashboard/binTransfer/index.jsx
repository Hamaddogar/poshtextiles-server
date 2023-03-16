import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import Header from './Header';
import Bintransfer2 from './Bintransfer';


const BinTransferPage2 = () => {

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
                    <Bintransfer2 />
                </Box>
            </Box>
        </Box>
}

export default BinTransferPage2

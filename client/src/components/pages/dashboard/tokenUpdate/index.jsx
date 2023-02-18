import { Box } from '@mui/system';
import React from 'react';
import saleorder from '../../../assets/icons/saleorder.png';
import Header from './Header';
import { SideTextWrapper } from '../reUseAbles/ReuseAbles';
import TokenUpdate from './TokenUpdate';


const TokenUpdatePage = () => {

    return <Box sx={{ backgroundColor: '#E9EDF1', minHeight: '100vh' }}>
            <Header />
            <Box id='holder'>
                <Box id="left-bar" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
                    <SideTextWrapper
                        icon={saleorder}
                        text={'Token - Update'}
                        fontSize={{ xs: '22px', sm: '40px' }}
                    />
                </Box>
                <Box id='displayer'>
                    <TokenUpdate />
                </Box>
            </Box>
        </Box>
}

export default TokenUpdatePage

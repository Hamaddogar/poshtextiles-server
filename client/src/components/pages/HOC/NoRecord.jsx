import React from 'react';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../dashboard/reUseAbles/ReuseAbles';
import NoRecordImg from '../../assets/images/norecord.png'

const NoRecord = ({ backButton = true, size }) => {
    const { loading } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    return (
        <div>
            {
                size === 0 && !loading && <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }} textAlign='center' >
                        <Box component={'img'} sx={{maxWidth:'450px', width:'100%'}} src={NoRecordImg} alt='No record found' />
                    </Box>
                    {backButton && <BackButton onClick={() => navigate(-1)} />}
                </Box>
            }
        </div>
    )
}

export default NoRecord
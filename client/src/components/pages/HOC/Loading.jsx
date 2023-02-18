import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';

const PreLoader = ({ backButton, children }) => {

    const { loading } = useSelector(store => store.mainReducer)




    return (
        <div>
            {loading &&
                <Box>
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                </Box>
            }
            {!loading && children}
        </div>
    )
}

export default PreLoader;
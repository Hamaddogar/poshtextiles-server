import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const PreLoader = ({ loading, children }) => {

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
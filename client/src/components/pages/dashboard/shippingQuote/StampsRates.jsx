import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import logoSTAMP from './Assets/stamps.png';

const StampsRates = ({ rateListData, slider }) => {

    return (
        <Grid item xs={12} >
            <Divider > Available Rates </Divider>
            {
                rateListData.loading === "responded" &&
                (rateListData?.allService)?.length > 0 &&
                (rateListData?.allService.filter(item => {
                    return item.rate >= slider[0] && item.rate <= slider[1];
                }))?.map((item, indx, self) => {
                    return (
                        <>
                            <Box sx={{
                                borderTop: "1px solid #AFB2B5", borderBottom: indx === self.length - 1 ? "1px solid #AFB2B5" : "none", padding: "8px 0px 6px 0px", "&:hover": {
                                    backgroundColor: 'white'
                                }
                            }}>
                                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                    <Grid item xs={2}>
                                        <Stack direction={"row"} alignItems={"center"}>
                                            <Box> <img alt=" " src={logoSTAMP} style={{ width: "50px" }} /> </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                                            <Typography sx={{ marginRight: "5px", fontSize: '11px' }}>
                                                {item.serviceType} - {item.serviceName} / {item.days} Days
                                            </Typography>
                                            <Box sx={{ minWidth: '80px' }} >
                                                <Button
                                                    // onClick={() => handleClickProduct(item)}
                                                    size='small' sx={{
                                                        background: "dodgerBlue", color: "white", "&:hover": {
                                                            backgroundColor: 'dodgerBlue'
                                                        }
                                                    }}>{item.rate} {item.currency}</Button>
                                            </Box>

                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )
                })
            }

            {
                rateListData.loading === "responded" && (rateListData.error) &&
                <Box textAlign={'center'} sx={{ color: '#DE7D69' }} >
                    {rateListData.error}
                </Box>
            }
            {
                rateListData.loading === "responded"
                && (rateListData.allService?.length === 0)
                && !(rateListData.error) &&
                <Box textAlign={'center'} >
                    No Rates Are Found
                </Box>
            }

        </Grid>
    )
}

export default StampsRates
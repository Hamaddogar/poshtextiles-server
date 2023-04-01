import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import logoFED from './Assets/fedlogo.png';

const FedexRates = ({ rateListData, slider, service }) => {
    console.log("-----------------",rateListData);
    return (
        <div>
            <Grid item xs={12}>
                <Divider > Selected Service Rate </Divider>

                {
                    rateListData.loading === "responded" &&
                    (rateListData?.singleService)?.length > 0 &&
                    (rateListData?.singleService.filter(item => {
                        return item.rate >= slider[0] && item.rate <= slider[1];
                    }))?.map((item, indx, self) => {
                        // (rateListData?.singleService)?.map((item, indx, self) => {
                        return (
                            <>
                                <Box sx={{
                                    borderTop: "1px solid #AFB2B5", borderBottom: indx === self.length - 1 ? "1px solid #AFB2B5" : "none", padding: "8px 0px 6px 0px", "&:hover": {
                                        backgroundColor: 'white'
                                    }
                                }}>
                                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                        <Grid item xs={2}>
                                            <Box> <img alt=" " src={logoFED} style={{ width: "50px" }} /> </Box>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                                                <Typography sx={{ marginRight: "5px", fontSize: '11px' }}>
                                                    {item.serviceName} / {item.netWeight} {item.unit}
                                                </Typography>
                                                <Box >
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
                    <Box textAlign={'center'} >
                        {rateListData.error}
                    </Box>
                }
                {
                    rateListData.loading === "responded" && (rateListData.allService?.length === 0) &&
                    <Box textAlign={'center'} >
                        No Rates Are Found
                    </Box>
                }

            </Grid>

            <Grid item xs={12} >
                <Divider > Account and Normal Rates </Divider>

                {/* FEDEX */}
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
                                                <Box> <img alt=" " src={logoFED} style={{ width: "50px" }} /> </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                                                <Typography sx={{ marginRight: "5px", fontSize: '11px' }}>
                                                    {item.based} - {item.serviceName} / {item.netWeight} {item.unit}
                                                </Typography>
                                                <Box >
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
                    <Box textAlign={'center'} >
                        {rateListData.error}
                    </Box>
                }
                {
                    rateListData.loading === "responded" && (rateListData.allService?.length === 0) &&
                    <Box textAlign={'center'} >
                        No Rates Are Found
                    </Box>
                }


            </Grid>
        </div>
    )
}

export default FedexRates
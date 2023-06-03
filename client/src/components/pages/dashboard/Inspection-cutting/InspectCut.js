import React from 'react'
import { Button, Grid, Stack, Typography, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackButton, handleNoAction, } from '../reUseAbles/ReuseAbles';
import BasicTable from './table-yargade';
import UpperHeader from '../reUseAbles/UpperHeader';
import { MARK_DONE_CUTTING_GREEN_PACKING } from '../../../../RTK/Reducers/Reducers';





const btnStyle = { background: "white", border: "1px solid #7F7F7F", padding: "3px 5px", width: "60%", color: "#202020" }
const InspectCut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ins_cut_item_detail, saleOrderDetails, status } = useSelector(store => store.mainReducer);
    const handleDoneCutting = () => {
        dispatch(MARK_DONE_CUTTING_GREEN_PACKING(true))
        navigate('/picking');
    }

    const handleResult = () => {
        // dispatch(ADD_NEW_RESULT({
        //     etag: showSelectedProduct["@odata.etag"],
        // }));
        // navigate(-2);
    }
    return (
        <div>
            <Box>
                {!ins_cut_item_detail && status !== 'pending' && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
                {ins_cut_item_detail && <Box>
                    <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleNoAction} />

                    {/* main body */}
                    <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                        <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>

                            <Box margin='20px auto auto auto' >
                                <Stack direction='row' justifyContent={"center"} spacing={3}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Button style={{ background: "#E0E0E0", color: "#7A7B7C", padding: "10px 25px", border: "1px solid #7A7B7C" }}>YARDAGE</Button>
                                    </Box>
                                    <Box >
                                        <select id="roll" style={{ marginLeft: "15px", textAlign: "center", color: "#7A7B7C", width: "100%", borderRadius: "5px", padding: "10px 25px", background: "#E0E0E0", border: "1px solid #7A7B7C" }}>
                                            <option label="TYPE OF DEFECT">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll2">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll3">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll4">Roll- 4" x 6" Shipping label</option>
                                        </select>
                                    </Box>
                                </Stack>
                                <Grid container mt={4}>
                                    <Grid sx={{ borderRight: "3px solid #919191" }} item container xs={12} md={8}>
                                        <Grid sx={{ padding: "10px 30px" }} container xs={12} md={6}>
                                            <BasicTable />
                                        </Grid>
                                        <Grid sx={{ padding: "10px 30px" }} container xs={12} md={6}>
                                            <BasicTable />
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{ paddingLeft: "45px" }} item xs={12} md={4}>
                                        <Typography>Inspection Report Status</Typography>
                                        <Box className="mt20">
                                            <label>Inspector Name:</label><br />
                                            <select id="roll" style={{ textAlign: "center", border: "0px", background: "#E9EDF1", width: "60%" }}>
                                                <option label=""></option>
                                                <option label="roll2"></option>
                                                <option label="roll3"></option>
                                                <option label="roll4"></option>
                                            </select>
                                        </Box>
                                        <Box className="mt20">
                                            <label>Inspector's Comments:</label><br />
                                            <textarea style={{ width: "60%", background: "#E9EDF1" }} id="review" name="review" rows="4" cols="50">
                                            </textarea>
                                        </Box>
                                        <Box className="mt20">
                                            <Typography>
                                                Inspection Results:
                                            </Typography>
                                            <Stack spacing={1} mt={1}>
                                                <Button onClick={handleResult} sx={btnStyle}>Good</Button>
                                                <Button onClick={handleResult} sx={btnStyle}>OK</Button>
                                                <Button onClick={handleResult} sx={btnStyle}>DAMAGED</Button>
                                            </Stack>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>

                </Box >}

                <Grid container direction='row' my={1} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                    <Grid item>
                        <BackButton onClick={() => navigate(-1)} />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='success' size='small' onClick={handleDoneCutting}> DONE CUTTING</Button>
                    </Grid>
                </Grid>

            </Box>

        </div>
    )
}

export default InspectCut
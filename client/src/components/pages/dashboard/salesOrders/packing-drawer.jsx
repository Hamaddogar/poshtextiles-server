import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getPacking, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
// import { validateAddressFEDEXP, validateAddressUPS } from '../../../../RTK/Reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../HOC/Loading';
import { Delete, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '../reUseAbles/Toasters';
import { PACKING_PAGE_INDEX_FUN, PACKING_PREVIEW_FUN } from '../../../../RTK/Reducers/Reducers';


const PackingDrawer = ({ toggleDrawer, packingSideBar, handleShippingQuote }) => {


    const { PACKING_NO, PACKING_PREVIEW } = useSelector(store => store.mainReducer)
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState({ load: true, valid: false })
    const [boxIndex, setBoxIndex] = React.useState(0)

    const navigate = useNavigate();

    const handlePakingPreview = () => {
        dispatch(PACKING_PAGE_INDEX_FUN(boxIndex));
        navigate('/packing-preview');
    }

    const handleIndex = (suffer) => {
        // setBoxIndex(Math.abs((boxIndex + suffer)))
        setBoxIndex(Math.abs((boxIndex + suffer) % PACKING_PREVIEW.length))
    }


    React.useLayoutEffect(() => {

        if (packingSideBar && PACKING_NO) {
            // alert(PACKING_NO)
            // setLoading({ ...loading, load: true });
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        getPacking({ token: decide.token, code: PACKING_NO })
                            .then(response => {
                                console.log("<<<<<createPacking>>>>>>>", response);
                                setLoading({ ...loading, load: false });
                                if ("value" in response?.getPacking) {
                                    dispatch(PACKING_PREVIEW_FUN(response?.getPacking?.value))
                                    // setRows(response?.getPacking?.value?.[0]?.packingLines)
                                }
                                else Toaster('error', ``)
                            })
                            .catch(error => {
                                console.log("<<<<<", error);
                                setLoading({ ...loading, load: false });
                            })
                    }
                })
        }

    }, [packingSideBar])


    return (
        <div>
            <React.Fragment>

                <SwipeableDrawer
                    anchor={"right"}
                    open={packingSideBar}
                    // onClose={loading.loading === "loading" ? () => { } : toggleDrawer(false)}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Box
                        sx={{ width: 500, height: "100vh", padding: "10px 20px 0px 20px", background: "#FFFFFF" }}
                        role="presentation"
                    >
                        <PreLoader loading={loading.load}>
                            <Grid container spacing={.4} justifyContent={'space-between'} alignItems={'center'} sx={{ color: '#919191' }} >
                                <Grid item xs={12} sx={{ borderBottom: '1px solid black' }}>
                                    <Stack direction='row' alignItems={'center'} justifyContent={'space-around'}>
                                        <KeyboardDoubleArrowLeft onClick={() => handleIndex(-1)} color='error' sx={{ cursor: 'pointer' }} />
                                        <Typography variant='h5'>Box {boxIndex + 1}/{PACKING_PREVIEW?.length}</Typography>
                                        <KeyboardDoubleArrowRight onClick={() => handleIndex(+1)} color='success' sx={{ cursor: 'pointer' }} />
                                    </Stack>
                                    <Box my={3} sx={{ textAlign: 'center' }}>
                                        <Button variant='outlined'>Scan LOT</Button>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ height: '60vh' }} className='scroll'>
                                        {
                                            PACKING_PREVIEW?.length > 0 ?
                                                <TableContainer component={Paper} className="bsn">
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableHead sx={{ backgroundColor: '#F1F3F4' }}>
                                                            <TableRow sx={{ 'td, th': { border: 0 } }}>
                                                                <TableCell> Item Source </TableCell>
                                                                <TableCell >Line No</TableCell>
                                                                <TableCell > Weight </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {PACKING_PREVIEW?.[boxIndex]?.packingLines?.length > 0 ?
                                                                PACKING_PREVIEW?.[boxIndex]?.packingLines?.map((row, indx) => (
                                                                    <TableRow key={indx} sx={{ '&:td, &:th': { border: 0 } }}
                                                                    // onClick={e => handleSelect(row)}
                                                                    >
                                                                        <TableCell> {PACKING_PREVIEW?.[boxIndex]?.sourceNo} </TableCell>
                                                                        <TableCell>{row.LineNo}</TableCell>
                                                                        <TableCell>{row.billedWeight} <Delete sx={{ color: 'gray', fontSize: '15px' }} /></TableCell>

                                                                    </TableRow>
                                                                ))
                                                                :
                                                                <Typography sx={{ color: 'red', textAlign: 'center' }} mt={5}>
                                                                    No Packing-Lines Found
                                                                </Typography>
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                :
                                                <Typography sx={{ color: 'red', textAlign: 'center' }} mt={5}>
                                                    No Boxes are Found
                                                </Typography>
                                        }
                                    </Box>
                                </Grid>

                                {
                                    PACKING_PREVIEW?.[boxIndex]?.packingLines?.length > 0 &&
                                    <Grid item container alignItems='center' justifyContent={'space-between'} xs={12}>
                                        <Grid item xs={6}>
                                            <Typography>
                                                Total QTY :
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography sx={{ textAlign: 'right' }}>
                                                {PACKING_PREVIEW?.[boxIndex]?.packingLines?.[0]?.insuredValue}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography>
                                                Box Weight :
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography sx={{ textAlign: 'right' }}>
                                                {PACKING_PREVIEW?.[boxIndex]?.packingLines?.[0]?.weight}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }

                                <Grid item xs={12} mt={1} sx={{ textAlign: 'right' }}>
                                    <Divider />
                                    <Button sx={{ fontSize: '13px', textTransform: 'captalize' }} variant='contained' size='small' color='success' onClick={handleShippingQuote}>Ship Now</Button> &nbsp; &nbsp; &nbsp;
                                    <Button sx={{ fontSize: '13px', textTransform: 'captalize' }} variant='contained' size='small' onClick={handlePakingPreview}>Preview</Button>
                                </Grid>
                            </Grid>
                        </PreLoader>

                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default PackingDrawer;
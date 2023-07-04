import { CircularProgress, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import { BackButton, Search, SearchIconWrapper, StyledInputBase, handleNoAction, searchDropDown } from '../reUseAbles/ReuseAbles';
import PickingTable from './PickingTable';
import fabric from '../../../assets/icons/fabric.png';
import shelf from '../../../assets/icons/shelf.png';
import UpperHeader from '../reUseAbles/UpperHeader';
import { SearchSharp } from '@mui/icons-material';
import { MARK_DONE_CUTTING_GREEN_PACKING, WH_SHIP_DETAILS_FUN } from '../../../../RTK/Reducers/Reducers';
import { patchPicking, registerPacking, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import GeneralModel from '../reUseAbles/GeneralModel';
import { Toaster } from '../reUseAbles/Toasters';
import Actions, { ActionMenuItem } from '../reUseAbles/Actions';





const Picking = () => {

    const { saleOrderDetails, WH_SHIP_DETAILS } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [data, setData] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState({ id: "", item: {}, patch: false })
    const [registered, setRegistered] = React.useState({ response: {}, loading: false })
    const [searchIt, setSearchIt] = React.useState("");
    const [searchToBL, setSearchToBL] = React.useState('lot');
    const [generalModel, setGeneralModel] = React.useState(false);

    const handleSearchTo = event => setSearchToBL(event.target.value);
    const handleSearchIt = event => setSearchIt(event.target.value);


    const handleCompleteHere = () => {
        dispatch(MARK_DONE_CUTTING_GREEN_PACKING(true));
        navigate('/sale-order');
    }

    // console.log('cWH_SHIP_DETAILS', WH_SHIP_DETAILS);
    const handleRegisterPickItem = () => {
        // console.log('cWH_SHIP_DETAILS-inside', WH_SHIP_DETAILS);
        if (selected?.id && selected?.item?.WHPickNo) {
            setGeneralModel(true);
            setRegistered({ response: {}, loading: true });
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        registerPacking({ token: decide.token, pkCode: selected.item.WHPickNo })
                            .then(response => {
                                // console.log('------',response);
                                setRegistered({ response: response?.registerDetail, loading: false });
                            })
                            .catch(error => {
                                // setLoading({ ...loading, load: false });
                            })
                    }
                })
        } else {
            Toaster('warn', "Please Select an Item from Table")
        }
    };


    const handlePatch = () => {
        Toaster('loading', 'Please Hold Patching ...')
        const [itemToPatch] = WH_SHIP_DETAILS?.shipItems?.filter(item => item.lotNo && item.systemId === selected?.item?.systemId)
        // console.log(itemToPatch);

        if (itemToPatch) {
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        patchPicking({
                            token: decide.token,
                            sysID: itemToPatch.systemId,
                            body: { "lotNo": itemToPatch.lotNo },
                        }).then(res => {
                            // console.log('---patch---', res);
                            if (!(res.error)) {
                                const newData = data?.map(item =>
                                    item.systemId === res?.patchDetails?.systemId ? { ...item, patched: true } : item
                                )
                                console.log('newData', newData);
                                setData(newData);
                                setRows(newData);
                                Toaster('success', res.message)
                            } else {
                                Toaster('error', `${res.message}`)
                            }
                        })
                    }
                })
        } else {
            Toaster('warn', 'No Item Found ...')
        }


    }



    return (
        <div>
            <GeneralModel open={generalModel} setOpen={setGeneralModel} heading={registered.loading ? 'Register Pick' : 'Register Pick Response'}>
                <Box sx={{ width: '400px' }}></Box>
                <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                    <Grid item xs={12}>
                        {registered.loading && <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>}
                    </Grid>
                    <Grid item xs={12}>
                        {!(registered?.loading) && registered?.response?.responseMsg &&
                            <Typography color={registered?.response?.responseMsg === "Registered Successfully" ? "success" : 'error'}>
                                {registered?.response?.responseMsg}
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </GeneralModel>

            {!saleOrderDetails && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
            {saleOrderDetails && <Box>
                <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleNoAction} />
                {/* main body */}
                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>
                        <Box >
                            <Stack direction='row' justifyContent={"center"} spacing={4}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={fabric} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan LOT</Button>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={shelf} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan Bin</Button>
                                </Box>
                            </Stack>

                            <Stack direction='row' justifyContent={'center'} sx={{ backgroundColor: '#E9EDF1' }} py={.6}>
                                <FormControl>
                                    <Select
                                        labelId="searchTo-select-label"
                                        id="searchTo-select"
                                        value={searchToBL}
                                        onChange={handleSearchTo}
                                        size='small'
                                        sx={searchDropDown}
                                    >
                                        <MenuItem value='bin' sx={{ fontSize: '12px' }}>Scan Bin</MenuItem>
                                        <MenuItem value='lot' sx={{ fontSize: '12px' }}>Scan LOT</MenuItem>
                                    </Select>
                                </FormControl>

                                <Search>
                                    <SearchIconWrapper>
                                        <SearchSharp sx={{ fontSize: '18px' }} />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search', width: '100%' }}
                                        size='small'
                                        fullWidth
                                        onChange={handleSearchIt}
                                    />
                                </Search>
                            </Stack>

                            <Box maxWidth={'md'} margin='20px auto auto auto' >
                                <PickingTable
                                    selected={selected}
                                    setSelected={setSelected}
                                    searchToBL={searchToBL}
                                    searchIt={searchIt}
                                    data={data}
                                    setData={setData}
                                    rows={rows}
                                    setRows={setRows}
                                />
                            </Box>
                        </Box>
                    </Box >
                </Box>

            </Box >}
            <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BackButton onClick={() => navigate('/sale-order')} />
                        &nbsp; &nbsp; &nbsp;
                        <Actions id='picking-menu'>
                            <ActionMenuItem click={handleRegisterPickItem} label={'Register Pick Now'} />
                            <ActionMenuItem click={handleCompleteHere} label={'Complete Picking'} last={true} />
                        </Actions>
                        &nbsp; &nbsp; &nbsp;
                        <Button onClick={handlePatch} disabled={!(selected?.patch)} size='small' sx={{ fontSize: '12px', paddingX: 2.4, backgrounnd: '#495BD6' }} variant='contained'>Patch Now</Button>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}

export default Picking

import { Checkbox, Hidden, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import BackArrow from '../../../assets/icons/back-arrow.png'
import { headInputStyle, subHeadInputStyle, Wrapper } from '../reUseAbles/ReuseAbles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentsModel from './commentsModel';


const CreateSalesOrder = () => {

    const [copy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [dropShipChecked, setDropShipChecked] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [commentModel, setCommentModel] = React.useState(false);
    const handleOpen = () => setCommentModel(true);
    const orderDetail = {}


    const navigate = useNavigate();
    // const dispatch = useDispatch();


    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * 9), ((((page - 1) * 9)) + 9)))
    }

    // for actions 


    return (
        <div>
            <Box>
                <CommentsModel commentModel={commentModel} setCommentModel={setCommentModel} />

                <Box sx={{}} >
                    <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >

                        <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                            <Grid item xs={6} md={4} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Bill To: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={orderDetail.billTo} size='small' InputProps={{
                                    endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px' }} />  </InputAdornment>)
                                }} />
                            </Grid>

                            <Grid item xs={6} md={4} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={orderDetail.shipTo} size='small' InputProps={{
                                    endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px' }} /> </InputAdornment>)
                                }} />
                            </Grid>

                            <Grid item xs={6} md={4} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Project Name: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={orderDetail.projectName} size='small'

                                />
                            </Grid>

                            <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Terms: </Typography>
                                <TextField sx={headInputStyle} fullWidth  defaultValue={orderDetail.terms} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Priority: </Typography>
                                <TextField sx={headInputStyle} fullWidth  defaultValue={orderDetail.priority} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Specifier: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={orderDetail.specifier} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Sales Person: </Typography>
                                <TextField sx={headInputStyle} fullWidth  defaultValue={orderDetail.salesPerson} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Customer PO: </Typography>
                                <TextField sx={headInputStyle} fullWidth  defaultValue={orderDetail.customerPO} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Campaign: </Typography>
                                <TextField sx={headInputStyle} fullWidth  defaultValue={orderDetail.campaign} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Order Date: </Typography>
                                <TextField sx={headInputStyle} fullWidth type={"date"} defaultValue={orderDetail.orderDate} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Req Ship Date: </Typography>
                                <TextField sx={headInputStyle} fullWidth type={"date"} defaultValue={orderDetail.reqShipDate} size='small' />
                            </Grid>

                            <Hidden mdUp>
                                <Grid item xs={6}>
                                    <Box >
                                        <Button onClick={handleOpen} sx={{
                                            background: "#FFFFFF", color: "black", padding: "2px 15px", '&:hover': {
                                                background: "white",
                                                color: "black",
                                                fontWeight: '600'
                                            }
                                        }}>Comments</Button>
                                    </Box>
                                </Grid>
                            </Hidden>

                        </Grid>

                        <Hidden mdDown>
                            <Grid item>
                                <Box >
                                    <Button onClick={handleOpen} sx={{
                                        background: "#FFFFFF", color: "black", padding: "2px 15px", '&:hover': {
                                            background: "white",
                                            color: "black",
                                            fontWeight: '600'
                                        }
                                    }}>Comments</Button>
                                </Box>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Box>







































                <Box sx={{ padding: '15px' }} mb={1}>
                    <Box sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)`, display: 'flex', alignItems: 'flex-start', padding: '15px 0px' }}>
                        <Box sx={{ padding: '8px' }} >
                            <Box style={{ width: '100%', minWidth: '146px', cursor: 'pointer', backgroundColor: 'white', minHeight: '140px' }}></Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Wrapper justifyContent={'space-between'} >
                                <Wrapper margin='3px 10px' >
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Type: </Typography>
                                    <TextField defaultValue='' size='small' sx={subHeadInputStyle} />
                                </Wrapper>

                                <Wrapper margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Name: </Typography>
                                    <TextField defaultValue='' size='small' sx={subHeadInputStyle} />
                                </Wrapper>

                                <Wrapper margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Description: </Typography>
                                    <TextField defaultValue='' size='small' sx={{ ...subHeadInputStyle, minWidth: '13rem' }} />
                                </Wrapper>

                                <Wrapper margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Drop Ship: </Typography>
                                    <Checkbox
                                        checked={dropShipChecked}
                                        onChange={e => setDropShipChecked(e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </Wrapper>


                                <Stack >
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Number: </Typography>
                                    <TextField defaultValue='' size='small' sx={subHeadInputStyle} />
                                </Stack>


                                <Stack margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Quantity: </Typography>
                                    <TextField defaultValue='' size='small' sx={{ ...subHeadInputStyle, maxWidth: '8rem', minWidth: '5rem' }} />
                                </Stack>

                                <Stack margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Min Quantity: </Typography>
                                    <TextField defaultValue='' size='small' sx={{ ...subHeadInputStyle, maxWidth: '8rem', minWidth: '5rem' }} />
                                </Stack>
                                <Stack margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Price: </Typography>
                                    <TextField defaultValue='' size='small' sx={{ ...subHeadInputStyle, maxWidth: '8rem', minWidth: '5rem' }} />
                                </Stack>
                                <Stack margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Discount: </Typography>
                                    <TextField defaultValue='' size='small' sx={{ ...subHeadInputStyle, maxWidth: '8rem', minWidth: '5rem' }} />
                                </Stack>
                                <Stack margin='3px 10px'>
                                    <Typography mr={1} sx={{ color: '#6D6D6D' }}>Amount: </Typography>
                                    <TextField defaultValue='' size='small' sx={{ ...subHeadInputStyle, maxWidth: '8rem', minWidth: '5rem' }} />
                                </Stack>

                                <Wrapper justifyContent={{ xs: 'center', md: 'space-between' }} margin='7px 10px 3px 0px' width='100%' spacing={0} >
                                    <TextField placeholder='Comments' size='small' sx={{ ...subHeadInputStyle, minWidth: '80%', }} fullWidth />
                                    <Box margin='5px 0px'>
                                        <Button color='error' variant='contained' size='small'>cancel</Button> &nbsp;
                                        <Button color='primary' variant='contained' size='small'>ok</Button>
                                    </Box>
                                </Wrapper>
                            </Wrapper>
                        </Box>
                    </Box>
                </Box>


                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>
                        <Grid container alignItems={'center'} rowGap={3} sx={{ margin: '10px', minHeight: '70vh' }}>
                            {rows && rows.map((item, index) => <Grid xs={12} sm={6} md={4} item justifyContent='space-between' key={index} sx={{ minHeight: '100px', }} >
                                <Box sx={{ cursor: 'pointer' }} px={{ xs: '1', md: 2, lg: 3 }} onClick={() => ""}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid xs={6} item> <Box component='img' alt='img' style={{ width: '100%', maxWidth: '146px', cursor: 'pointer' }} src={item.image} /> </Grid>
                                        <Grid item container direction={'column'} justifyContent={'space-between'} xs={6} px={1} sx={{ position: 'relative' }}>

                                            <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                                <Typography textAlign='center' mt={1} variant='h1' fontSize={{ xs: '18px', sm: '25px', md: '30px' }} fontWeight={500} >JEROME SAHARA</Typography>
                                                <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                                                    <Typography fontSize='12px'>MOQ : <span style={{ fontSize: '20px' }}>{item.moq}</span></Typography>
                                                    <Typography fontSize='12px' textAlign={'right'}>QTY : <span style={{ fontSize: '20px' }}>{item.qty}</span></Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Grid>)
                            }
                        </Grid>
                    </Box >
                </Box>
            </Box >
            {
                rows.length > 0 &&
                <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                    <Grid item>
                        <Box>
                            <Button startIcon={<img src={BackArrow} alt='back' width='18px' />} variant='contained' color='error' size='small' onClick={() => navigate(-1)}> Go back</Button>
                            &nbsp; &nbsp; &nbsp;
                        </Box>
                    </Grid>
                    <Grid item>
                        <Pagination
                            total={Math.ceil(copy.length / 9)}
                            current={currentPage}
                            onPageChange={page => handlePageChange(page)}
                        />
                    </Grid>
                </Grid>
            }

            <Box mt={2}>
                <Button startIcon={<img src={BackArrow} alt='back' width='18px' />} variant='contained' color='error' size='small' onClick={() => navigate(-1)}> Go back</Button>
                &nbsp; &nbsp; &nbsp;
            </Box>

        </div >
    )
}

export default CreateSalesOrder

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { PACKING_PAGE_INDEX_FUN } from '../../../../RTK/Reducers/Reducers';




function SwipeableTextMobileStepper({ children }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { PACKING_PAGE_INDEX, PACKING_BOXES_PREVIEW } = useSelector(store => store.mainReducer);
  const maxSteps = PACKING_BOXES_PREVIEW?.length;
  const handleNext = () => dispatch(PACKING_PAGE_INDEX_FUN(PACKING_PAGE_INDEX + 1));
  const handleBack = () => dispatch(PACKING_PAGE_INDEX_FUN(PACKING_PAGE_INDEX - 1));
  const handleStepChange = (step) => dispatch(PACKING_PAGE_INDEX_FUN(step));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{ bgcolor: 'background.default', textAlign: 'center' }}  >
        <Typography variant='h5' >Box {maxSteps ? PACKING_PAGE_INDEX + 1 : 0} / {maxSteps}</Typography>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={PACKING_PAGE_INDEX}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={maxSteps === 0 || PACKING_PAGE_INDEX === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? (<KeyboardDoubleArrowLeft color='error' sx={{ cursor: 'pointer' }} />) : (<KeyboardDoubleArrowRight color='success' sx={{ cursor: 'pointer' }} />)}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={maxSteps === 0 || PACKING_PAGE_INDEX === 0}>
            {theme.direction === 'rtl' ? (<KeyboardDoubleArrowRight color='success' sx={{ cursor: 'pointer' }} />) : (<KeyboardDoubleArrowLeft color='error' sx={{ cursor: 'pointer' }} />)}
            Back
          </Button>
        }
      />
      {PACKING_BOXES_PREVIEW?.length === 0 &&
        <Typography sx={{ color: 'red', textAlign: 'center', height: '65vh' }} mt={5}>
          No Boxes are Found
        </Typography>}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={PACKING_PAGE_INDEX}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {PACKING_BOXES_PREVIEW?.map((thisBox, index) => (
          <div key={index}>
            {Math.abs(PACKING_PAGE_INDEX - index) <= 2 ?
              <Box>
                <Grid container spacing={.4} justifyContent={'space-between'} alignItems={'center'} sx={{ color: '#919191' }} >
                  <Grid item xs={12}>
                    <Box sx={{ height: '60vh' }} className='scroll'>
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
                            {thisBox?.packingLines?.map((row, indx) => (
                              <TableRow key={indx} sx={{ '&:td, &:th': { border: 0 } }}
                              // onClick={e => handleSelect(row)}
                              >
                                <TableCell> {thisBox?.sourceNo} </TableCell>
                                <TableCell>{row.LineNo}</TableCell>
                                <TableCell>{row.billedWeight} <Delete sx={{ color: 'gray', fontSize: '15px' }} /></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {thisBox?.packingLines?.length === 0 &&
                        <Typography sx={{ color: 'red', textAlign: 'center' }} mt={10}>
                          No Packing-Lines Found
                        </Typography>}
                    </Box>
                  </Grid>

                  <Grid item container alignItems='center' justifyContent={'space-between'} xs={12}>
                    <Grid item xs={6}>  <Typography>  Total QTY : </Typography> </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ textAlign: 'right' }}>
                        {thisBox?.packingLines?.[0]?.insuredValue ? thisBox?.packingLines?.[0]?.insuredValue : 0}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}> <Typography> Box Weight : </Typography> </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ textAlign: 'right' }}>
                        {thisBox?.packingLines?.[0]?.weight ? thisBox?.packingLines?.[0]?.weight : 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              :
              null
            }
          </div>
        ))}

      </SwipeableViews>
      {children}
    </Box>
  );
}

export default SwipeableTextMobileStepper;

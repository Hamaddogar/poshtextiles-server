import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
// Import CSS file
import './stockdetails.css'
import Topcontent from './topcontent';
import { TextField } from '@mui/material';
import { subHeadInputStyle } from '../reUseAbles/ReuseAbles';
import SaleInvoiceTable from './SaleInvoiceTable';
import { useSelector } from 'react-redux';
import SaleOrderTable from './SaleOrderTable';
import PurchaseInvoiceTable from './PurchaseInvoiceTable';
import LedgerTable from './LedgerTable';


const tabStyle = { borderTopRightRadius: "10px", borderTopLeftRadius: "10px", background: "#D9D9D9", marginRight: "15px", color: '#000000' }

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function StockDetails() {
    const { perPage, stockDetails_saleOrder, stockDetails_Invoice, stockDetails_purchase, stockDetails_ledger, } = useSelector(store => store.mainReducer);
    const theme = useTheme();
    const [tabs, setTabs] = React.useState(1);
    const handleChange = (event, newTab) => setTabs(newTab);
    const handleChangeIndex = (tab) => setTabs(tab);



    return (
        <Box>
            {/* Top Content */}
            <Topcontent />
            {/* Search Box */}
            <Box style={{ padding: "0px 30px 20px 0px", display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
                <SearchIcon sx={{ marginTop: "8px", fontSize: '16px' }} />
                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '15rem', maxWidth: '15rem' }} />
            </Box>

            {/* Main Content */}
            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <AppBar position="static">
                    <Tabs
                        value={tabs}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        className='stockTabs'
                        aria-label="full width tabs example"
                        sx={{
                            minHeight: 'auto',
                            '& .MuiTabs-flexContainer': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none'
                            },
                            '& .MuiTabs-root': {
                                minHeight: '30px !important'
                            },
                            '& .MuiButtonBase-root': {
                                backgroundColor: '#D9D9D9',
                                padding: '3px 10px',
                                maxWidth: '170px',
                                color: 'black',
                                minWidth: 'auto',
                                minHeight: '30px'
                            },
                            '& .Mui-selected': {
                                backgroundColor: 'white'
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            }
                        }}
                    >
                        <Tab sx={tabStyle} label="Sales Order" {...a11yProps(0)} />
                        <Tab sx={tabStyle} label="Sales Invoice" {...a11yProps(1)} />
                        <Tab sx={tabStyle} label="Purchase Order" {...a11yProps(2)} />
                        <Tab sx={tabStyle} label="Item Ledger" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tabs}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={tabs} index={0} dir={theme.direction}>
                        <SaleOrderTable data={stockDetails_saleOrder} perPage={perPage} />
                    </TabPanel>
                    <TabPanel value={tabs} index={1}>
                        <SaleInvoiceTable data={stockDetails_Invoice} perPage={perPage} />
                    </TabPanel>
                    <TabPanel value={tabs} index={2}>
                        <PurchaseInvoiceTable data={stockDetails_purchase} perPage={perPage} />
                    </TabPanel>
                    <TabPanel value={tabs} index={3}>
                        <LedgerTable data={stockDetails_ledger} perPage={perPage} />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Box>

    );
}
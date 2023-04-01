import { chargeCard, inventoryAdjustment, stockDetails_Invoice, stockDetails_ledger, stockDetails_purchase } from './fakeData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { APIS } from '../../utils/table';


// ------------------All Asyn Reducers are below ------------------//
let initialState = {
  perPage: 21,
  isAuthorised: false,
  loading: false,
  // original data
  allOrders: [],
  inventoryData: [],
  inventoryAdjustment: inventoryAdjustment,
  binTransfer: [],
  physicalInventory: [],
  locationTransfer: [],
  historyData: [],
  // dummy data
  chargeCardData: chargeCard,
  stockDetails_saleOrder: [],
  stockDetails_Invoice: stockDetails_Invoice,
  stockDetails_purchase: stockDetails_purchase,
  stockDetails_ledger: stockDetails_ledger,
  // app select and flow 
  saleOrderDetails: null,
  pickingSelectedProduct: null,
  // client info
  client_Info: null,
  // FEDEXP
  loadingHistory: false,
  loadingInventory: false,

  loadingNewOrder: false,
  newOrderData: null,


}

// ________________ Asyn Functions for Calling __________________ //

// saleOrderNoFilter
export const saleOrderNoFilter = createAsyncThunk(
  'mainSlice/saleOrderNoFilter',
  async ({ token, toastPermission }) => {
    const data = await toast.promise(
      axios.post(APIS.sale_orders_micro, { token: token }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// inventorydata 
export const inventoryDataFunction = createAsyncThunk(
  'mainSlice/inventoryDataFunction',
  async ({ token, toastPermission }) => {
    const data = await toast.promise(
      axios.post(APIS.inventory_micro, { token: token }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// History
export const historyGetter = createAsyncThunk(
  'mainSlice/historyGetter',
  async ({ token, toastPermission }) => {
    const data = await toast.promise(
      axios.post(APIS.sale_orders_micro, { token: token }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);



























// asyn setter
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    LOG_OUT: (state) => {
      state.loading = null;
      state.isAuthorised = false;
      state.client_Info = null;
      state.accessToken = false;
      state.idToken = false;
      state.allOrders = [];
    },
    LOG_IN: (state, { payload }) => {
      state.isAuthorised = true;
      state.accessToken = payload;
    },
    SELECTED_SALE_ORDER_DATA: (state, { payload }) => {
      state.saleOrderDetails = payload;
    },
    SELECT_PICKING_PRODUCT: (state, { payload }) => {
      state.pickingSelectedProduct = payload;
    },
    ADD_NEW_INVENTORY_PRODUCT: (state, { payload }) => {
      state.inventoryAdjustment.push(payload);
    },


  },


  // thunk reducers Responses
  extraReducers: (builder) =>
    builder

      // saleOrderNoFilter cases
      .addCase(saleOrderNoFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(saleOrderNoFilter.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.allOrders = payload;
          state.stockDetails_saleOrder = payload.flatMap(item => (item.edcSalesLines).map(lineItem => {
            return {
              no: lineItem.lineNo,
              date: lineItem.promisedDeliveryDate,
              cus_name: item.shipToName,
              qty: lineItem.quantity,
              price: lineItem.lineAmount
            }
          }))
        }
      })
      .addCase(saleOrderNoFilter.rejected, (state, { error }) => {
        state.loading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // inventoryData
      .addCase(inventoryDataFunction.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(inventoryDataFunction.fulfilled, (state, { payload }) => {
        state.loadingInventory = false;
        if (payload) state.inventoryData = payload;
      })
      .addCase(inventoryDataFunction.rejected, (state, { error }) => {
        state.loadingInventory = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // historyGetter
      .addCase(historyGetter.pending, (state) => {
        state.loadingHistory = true;
      })
      .addCase(historyGetter.fulfilled, (state, { payload }) => {
        state.loadingHistory = false;
        if (payload) state.allOrders = payload;
      })
      .addCase(historyGetter.rejected, (state, { error }) => {
        state.loadingHistory = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })


})





export const { LOG_OUT,
  SELECTED_SALE_ORDER_DATA,
  LOG_IN,
  SELECT_PICKING_PRODUCT,
  ADD_NEW_INVENTORY_PRODUCT,
} = mainSlice.actions;



// ------------------All Asyn Getter Setter Reducers Exporter ------------------//

export const mainReducer = mainSlice.reducer;


import { chargeCard, inventoryAdjustment, stockDetails_Invoice, stockDetails_ledger, stockDetails_purchase } from './fakeData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { APIS } from '../../utils/table';


// ------------------All Asyn Reducers are below ------------------//
let initialState = {
  perPage: 21,
  currentPageAllOrders: 1,
  orderTypeAllOrders: 'all',
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
  csv_OrdersDetail: null,
  csv_data_local: [],
  csv_data_responded: [],
  csv_fileName: null,
  // client info
  client_Info: null,
  // FEDEXP
  loadingHistory: false,
  loadingCSV: false,
  loadingInventory: false,

  loadingNewOrder: false,
  newOrderData: null,

  // stamps
  stamps_token: null,
  stamps_code: null,
  // shipfrom location
  ship_from_location: {},
  ins_cut_item_detail: null,

  sale_order_paking: false,
  successPickData0: [],
  WH_SHIP_NO: null,
  WH_SHIP_DETAILS: {
    status: false,
    already: false,
    shipNo: "",
    SNo: "",
    shipItems: [],
  },

  PACKING_DETAILS: {
    status: false,
    shipNo: "",
    SNo: "",
    pkNo: "",
  },



  PACKING_NO: null,
  PACKING_BOXES_PREVIEW: null,
  PACKING_PAGE_INDEX: 0,

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

// csvOrderDealer
export const csvOrderDealer = createAsyncThunk(
  'mainSlice/csvOrderDealer',
  async ({ token, body }) => {
    const data = await toast.promise(
      axios.post(APIS.csv_order_micro, { token, body }),
      { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// csvOrderDealer
export const shipFromLocation = createAsyncThunk(
  'mainSlice/shipFromLocation',
  async ({ token, locationCode }) => {
    const data = await axios.post(APIS.shipFrom, { token, locationCode })
    return data.data;
  }
);

// successPick_micro
export const successPickDetails = createAsyncThunk(
  'mainSlice/successPickDetails',
  async ({ token, pickCode }) => {
    const data = await axios.post(APIS.successPick_micro, { token, pickCode })
    return data.data;
  }
);

// pickingPageDealer

















const Toaster = (type, error) => {

  switch (type) {
    case 'loading':
      toast.loading('Loading...', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true
      });
      break;
    case 'success':
      toast.success('Loaded', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      break;
    case 'error':
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      break;

    default:
      break;
  }








}





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
    CSV_PRODUCT_DETAIL: (state, { payload }) => {
      state.csv_OrdersDetail = {
        total: payload.total,
        product: payload.product,
      };
    },
    CSV_DATA_LOCAL_RED: (state, { payload }) => {
      state.csv_data_local = payload.data;
      state.csv_data_responded = [];
      state.csv_fileName = payload.name;
    },
    STAMPS_TOKEN: (state, { payload }) => {
      if (payload.set) {
        state.stamps_token = payload.token;
        state.stamps_code = payload.code;
      } else {
        state.stamps_token = null;
        state.stamps_code = null;
      }
    },
    PAGE_DEALER_ALL_ORDERS: (state, { payload }) => {
      if (payload.to === "page") {
        state.currentPageAllOrders = payload.currentPage
      } else if (payload.to === "both") {
        state.orderTypeAllOrders = payload.orderType;
        state.currentPageAllOrders = payload.currentPage
      } else {
        state.orderTypeAllOrders = payload.orderType
      }
    },
    INS_CUT_ITEM: (state, { payload }) => {
      state.ins_cut_item_detail = payload
    },
    MARK_DONE_CUTTING_GREEN_PACKING: (state, { payload }) => {
      if (payload) {
        state.successPickData0 = [];
        state.sale_order_paking = true;
      } else {
        state.successPickData0 = [];
        state.sale_order_paking = false;
      }
    },
    WH_SHIP_NO_FUN: (state, { payload }) => {
      if (payload) {
        state.WH_SHIP_NO = payload;
      }
      else {
        state.WH_SHIP_NO = payload;
        state.PACKING_NO = payload;
        state.PACKING_BOXES_PREVIEW = payload;
      }
    },
    WH_SHIP_DETAILS_FUN: (state, { payload }) => {
      if (payload) {
        state.WH_SHIP_DETAILS = payload;
      }
      else {
        state.WH_SHIP_DETAILS.status = false;
        state.WH_SHIP_DETAILS.already = false;
        state.WH_SHIP_DETAILS.shipNo = "";
        state.WH_SHIP_DETAILS.SNo = "";
        state.WH_SHIP_DETAILS.shipItems = [];
      }
    },
    PACKING_DETAILS_FUN: (state, { payload }) => {
      if (payload) {
        state.PACKING_DETAILS = payload;
      }
      else {
        state.PACKING_DETAILS.status = false;
        state.PACKING_DETAILS.shipNo = "";
        state.PACKING_DETAILS.SNo = "";
        state.PACKING_DETAILS.pkNo = "";
      }
    },
    PACKING_BOXES_PREVIEW_FUN: (state, { payload }) => {
      state.PACKING_BOXES_PREVIEW = payload;
    },
    PACKING_PAGE_INDEX_FUN: (state, { payload }) => {
      state.PACKING_PAGE_INDEX = payload;
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


      // csvOrderDealer
      .addCase(csvOrderDealer.pending, (state) => {
        state.loadingCSV = true;
      })
      .addCase(csvOrderDealer.fulfilled, (state, { payload }) => {
        state.loadingCSV = false;
        if (payload.success) {
          state.csv_data_local = [];
          console.log("-------------", payload);
          state.csv_data_responded = payload.data;
        }
      })
      .addCase(csvOrderDealer.rejected, (state, { error }) => {
        state.loadingCSV = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // shipFromLocation
      .addCase(shipFromLocation.pending, (state) => {
        state.loadingCSV = true;
      })
      .addCase(shipFromLocation.fulfilled, (state, { payload }) => {
        if (!(payload.error)) {
          state.ship_from_location = payload.location;
        }
      })
      .addCase(shipFromLocation.rejected, (state, { error }) => {
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // successPickDetails
      .addCase(successPickDetails.pending, (state) => {
        Toaster('loading')
      })
      .addCase(successPickDetails.fulfilled, (state, { payload }) => {
        toast.dismiss();
      })
      .addCase(successPickDetails.rejected, (state, { error }) => {
        toast.dismiss();
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

  // pickingPageDealer





})





export const { LOG_OUT,
  SELECTED_SALE_ORDER_DATA,
  LOG_IN,
  SELECT_PICKING_PRODUCT,
  ADD_NEW_INVENTORY_PRODUCT,
  CSV_PRODUCT_DETAIL,
  CSV_DATA_LOCAL_RED,
  STAMPS_TOKEN,
  PAGE_DEALER_ALL_ORDERS,
  INS_CUT_ITEM,
  MARK_DONE_CUTTING_GREEN_PACKING,
  WH_SHIP_NO_FUN,
  WH_SHIP_DETAILS_FUN,
  PACKING_DETAILS_FUN,
  PACKING_BOXES_PREVIEW_FUN,
  PACKING_PAGE_INDEX_FUN,
} = mainSlice.actions;



// ------------------All Asyn Getter Setter Reducers Exporter ------------------//

export const mainReducer = mainSlice.reducer;


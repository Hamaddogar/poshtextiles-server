import { chargeCard, inventoryAdjustment, inventoryData, stockDetails_Invoice, stockDetails_ledger, stockDetails_purchase, stockDetails_saleOrder } from './fakeData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { APIS } from '../../utils/table';


// ------------------All Asyn Reducers are below ------------------//
let initialState = {
  perPage: 20,
  isAuthorised: false,
  loading: false,
  // original data
  allOrders: [],
  inventoryData: inventoryData,
  inventoryAdjustment: inventoryAdjustment,
  binTransfer: [],
  physicalInventory: [],
  locationTransfer: [],
  historyData: [],
  // dummy data
  chargeCardData: chargeCard,
  stockDetails_saleOrder: stockDetails_saleOrder,
  stockDetails_Invoice: stockDetails_Invoice,
  stockDetails_purchase: stockDetails_purchase,
  stockDetails_ledger: stockDetails_ledger,
  // app select and flow 
  saleOrderDetails: null,
  pickingSelectedProduct: null,
  postMan: false,
  firstTime: true,
  // client info
  client_Info: null,
  accessToken: "yJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYThmMWE1ZjktZjhiOC00MDBjLTg3YTEtYTcwNGJlMmQ3ZGMyLyIsImlhdCI6MTY3NTg0MDA2NywibmJmIjoxNjc1ODQwMDY3LCJleHAiOjE2NzU4NDM5NjcsImFpbyI6IkUyWmdZSmhUR1A0aUt1Wi9CT1BVbzQ5NDMrektCd0E9IiwiYXBwaWQiOiJkYThkYzUzNC1lNjQyLTQ2ZTItOGYyOC01N2JjNzFkODU0YzAiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hOGYxYTVmOS1mOGI4LTQwMGMtODdhMS1hNzA0YmUyZDdkYzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJiMDZjMTliOC01YTAzLTQ0MjQtYWNjMy04OThhODQwYWMwMWYiLCJyaCI6IjAuQVZvQS1hWHhxTGo0REVDSG9hY0V2aTE5d2ozdmJabHNzMU5CaGdlbV9Ud0J1SjlhQUFBLiIsInJvbGVzIjpbIkFQSS5SZWFkV3JpdGUuQWxsIl0sInN1YiI6ImIwNmMxOWI4LTVhMDMtNDQyNC1hY2MzLTg5OGE4NDBhYzAxZiIsInRpZCI6ImE4ZjFhNWY5LWY4YjgtNDAwYy04N2ExLWE3MDRiZTJkN2RjMiIsInV0aSI6IjZVb21SeU95amthaTY2RzN2aFh0QVEiLCJ2ZXIiOiIxLjAifQ.nlMhaU2Bhb9DFCZRMTAW4xQUTrL0_yL4sDC3DWGd02FhqZbBEkRW8JIuNoTYjCLiIsPwD967jMF8yfnGUtz7J9mA0CpnaJHX8S8SHcHUr-t7QYSUNZFSod7U1deU3amEBjN45dosxp2cKQM8NaYBnDexZAclJnz_l77CYuQiM268X0fDoGhrh4ctxFJjSd0QNMW8XV-CtqXRB-Jz9XrOnd4tje6YlKoLvPALInZPlPiJsr60zrnFGelazviwccClqpXfiAh6DMBwWfHl7QAEjdM-kdWwbXawlBOu00acfX90L6yXd4DaNi8hqGaBn4vCNYCvNN3uAk62HQJj_nVg0A",
  // FEDEXP
  FEDEXP_TOKEN: null,
  fedexpAddressValid: false,

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

// validateAddressFEDEXP
export const validateAddressFEDEXP = createAsyncThunk(
  'mainSlice/validateAddressFEDEXP',
  async ({ token, body, toastPermission }) => {
    const data = await toast.promise(
      axios.post(APIS.check_address_fedexp, { token, body }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// validateAddress UPS
export const validateAddressUPS = createAsyncThunk(
  'mainSlice/validateAddressUPS',
  async ({ body, toastPermission }) => {
    const data = await toast.promise(
      axios.post(APIS.check_address_ups, { body }),
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
      state.client_Info = payload;
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
    ADD_NEW_RESULT: (state, { payload }) => {
      // ["@odata.etag"]
      // state.saleOrderDetails.saleOrders.forEach((prod, indx) => {
      //   if (prod["@odata.etag"] === payload["@odata.etag"]) {
      //     state.saleOrderDetails.saleOrders[indx].status = true
      //   }
      // });
      // payload.navigate(-2);
    },
    ACCESS_TOKEN_SETTER: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.idToken = payload.idToken;
    },
    UPDATE_TOKEN: (state, { payload }) => {
      state.accessToken = payload.token;
      if (payload.notify) toast.success('Token Updated', { autoClose: 3000 });
      // document.getElementById('token').reset()
    },
    USE_POSTMAN_TOKEN: (state) => {
      state.postMan = !(state.postMan);
    },
    CALL_APIS_FIRST_TIME: (state) => {
      state.firstTime = false;
    },
    FEDEXP_TOEKN_SETTER: (state, { payload }) => {
      state.FEDEXP_TOKEN = payload;
    },
    FEDEXP_ADDRESS_STATUS: (state) => {
      state.fedexpAddressValid = false;
    }


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
        console.log(payload);
        if (payload) state.allOrders = payload;
      })
      .addCase(saleOrderNoFilter.rejected, (state, { error }) => {
        state.loading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // historyGetter
      .addCase(historyGetter.pending, (state) => {
        state.loading = true;
      })
      .addCase(historyGetter.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        if (payload) state.allOrders = payload;
      })
      .addCase(historyGetter.rejected, (state, { error }) => {
        state.loading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // validateAddressFEDEXP cases
      .addCase(validateAddressFEDEXP.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateAddressFEDEXP.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.error) {
          Swal.fire({ icon: 'error', title: payload.code, text: `${payload.message}` })
        } else {
          state.fedexpAddressValid = true;
        }
      })
      .addCase(validateAddressFEDEXP.rejected, (state, actions) => {
        console.log('rejected', actions);
        state.loading = false;
        Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // validateAddress UPS cases
      .addCase(validateAddressUPS.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateAddressUPS.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.error) {
          Swal.fire({ icon: 'error', title: payload.code, text: `${payload.message}` })
        } else {
          state.fedexpAddressValid = true;
        }



      })
      .addCase(validateAddressUPS.rejected, (state, actions) => {
        console.log('rejected', actions);
        state.loading = false;
        Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })







})





export const { LOG_OUT,
  SELECTED_SALE_ORDER_DATA,
  LOG_IN,
  SELECT_PICKING_PRODUCT,
  ADD_NEW_INVENTORY_PRODUCT,
  ADD_NEW_RESULT,
  ACCESS_TOKEN_SETTER,
  UPDATE_TOKEN,
  USE_POSTMAN_TOKEN,
  CALL_APIS_FIRST_TIME,
  FEDEXP_TOEKN_SETTER,
  FEDEXP_ADDRESS_STATUS,
} = mainSlice.actions;



// ------------------All Asyn Getter Setter Reducers Exporter ------------------//

export const mainReducer = mainSlice.reducer;


import { chargeCard, inventoryAdjustment, inventoryData, stockDetails_Invoice, stockDetails_ledger, stockDetails_purchase, stockDetails_saleOrder } from './fakeData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';


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

}

// ________________ Asyn Functions for Calling __________________ //

// saleOrderNoFilter
export const saleOrderNoFilter = createAsyncThunk(
  'mainSlice/saleOrderNoFilter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// History
export const historyGetter = createAsyncThunk(
  'mainSlice/historyGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// inventoryGetter
export const inventoryGetter = createAsyncThunk(
  'mainSlice/inventoryGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);

// stockDetailsGetter
export const stockDetailsGetter = createAsyncThunk(
  'mainSlice/stockDetailsGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);


// binTransferGetter
export const binTransferGetter = createAsyncThunk(
  'mainSlice/binTransferGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);


// inventoryAdjustmentGetter
export const inventoryAdjustmentGetter = createAsyncThunk(
  'mainSlice/inventoryAdjustmentGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);


// locationTransferGetter
export const locationTransferGetter = createAsyncThunk(
  'mainSlice/locationTransferGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
      toastPermission ? { pending: 'Loading Please Wait...', success: 'Successfully Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
      { autoClose: 1500, hideProgressBar: true }
    );
    return data.data;
  }
);


// physicalInventoryGetter
export const physicalInventoryGetter = createAsyncThunk(
  'mainSlice/physicalInventoryGetter',
  async ({ token, endpoint, toastPermission }) => {
    const data = await toast.promise(
      axios.get(endpoint, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Accept": `application/json` } }),
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
        if (payload && payload.value) state.allOrders = payload.value;
        else { alert('error is found') }
      })
      .addCase(saleOrderNoFilter.rejected, (state, actions) => {
        console.log('ssss',actions);
        state.loading = false;
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // historyGetter
      .addCase(historyGetter.pending, (state) => {
        state.loading = true;
      })
      .addCase(historyGetter.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload && payload.value) state.historyData = payload.value;
        else { alert('error is found') }
      })
      .addCase(historyGetter.rejected, (state, actions) => {
        state.loading = false;
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // inventoryGetter cases
      .addCase(inventoryGetter.fulfilled, (state, { payload }) => {
        alert('Inventory data aa gya , console check karin')
        // if (payload && payload.value) state.inventoryData = payload.value;
      })
      .addCase(inventoryGetter.rejected, (state, actions) => {
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // stockDetailsGetter cases
      .addCase(stockDetailsGetter.fulfilled, (state, { payload }) => {
        if (payload && payload.value) state.allOrders = payload.value;
      })
      .addCase(stockDetailsGetter.rejected, (state, actions) => {
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // binTransferGetter cases
      .addCase(binTransferGetter.fulfilled, (state, { payload }) => {
        if (payload && payload.value) state.binTransfer = payload.value;
      })
      .addCase(binTransferGetter.rejected, (state, actions) => {
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // inventoryAdjustmentGetter cases
      .addCase(inventoryAdjustmentGetter.fulfilled, (state, { payload }) => {
        if (payload && payload.value) state.inventoryAdjustment = payload.value;
      })
      .addCase(inventoryAdjustmentGetter.rejected, (state, actions) => {
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // locationTransferGetter cases
      .addCase(locationTransferGetter.fulfilled, (state, { payload }) => {
        if (payload && payload.value) state.locationTransfer = payload.value;
      })
      .addCase(locationTransferGetter.rejected, (state, actions) => {
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
      })

      // physicalInventoryGetter cases
      .addCase(physicalInventoryGetter.fulfilled, (state, { payload }) => {
        if (payload && payload.value) state.physicalInventory = payload.value;
      })
      .addCase(physicalInventoryGetter.rejected, (state, actions) => {
        if (actions.error.code === "ERR_BAD_REQUEST") Swal.fire({ icon: 'error', title: actions.error.code, text: `Please Use New Token` })
        else Swal.fire({ icon: 'error', title: actions.error.code, text: `${actions.error.message}` })
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
} = mainSlice.actions;



// ------------------All Asyn Getter Setter Reducers Exporter ------------------//

export const mainReducer = mainSlice.reducer;


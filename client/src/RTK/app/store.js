import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from '../Reducers/Reducers'
import { persistReducer, persistStore } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist-indexeddb-storage';

const persistConfig = {
  key: 'poshtextiles',
  storage: storage('myDB'),
  // stateReconciler: autoMergeLevel2,
  stateReconciler: autoMergeLevel1,
  blacklist: [
    "allOrders",
    "chargeCardData",
    "stockDetails_saleOrder",
    "stockDetails_Invoice",
    "stockDetails_purchase",
    "stockDetails_ledger",
    "client_Info",
    "historyData",
    "firstTime",
    "FEDEXP_TOKEN",
    "csv_OrdersDetail",
    "csv_data_local",
    "csv_fileName",
    "csv_data_responded",
    "stamps_token",
    "stamps_code",
    "currentPageAllOrders",
    "orderTypeAllOrders",
    "ship_from_location",
    "client_Info",
    "WH_SHIP_NO",
    "WH_SHIP_DETAILS",
    "PACKING_NO",
    "PACKING_BOXES_PREVIEW",
    "PACKING_PAGE_INDEX",
    "PACKING_DETAILS",
    "sale_order_paking"
  ],
  rootReducer: mainReducer
}

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: { mainReducer: persistedReducer },
});


export const persistor = persistStore(store);
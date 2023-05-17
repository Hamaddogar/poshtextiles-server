import React from 'react';
import './App.css';
import { AuthCheck } from './utils/auth';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/login/Login';
import Page404 from './components/pages/page404/Page404';
import Dashboard from './components/pages/dashboard/Dashboard';

// const AllSaleOrdersPage = React.lazy(()=> import('./components/pages/dashboard/allOrders'))

import AllSaleOrdersPage from './components/pages/dashboard/allOrders';
import BinTransferPage from './components/pages/dashboard/bin';
import ChargeCardPage from './components/pages/dashboard/chargeCard';
import HistoryPage from './components/pages/dashboard/history';
import InspectionCuttingPage from './components/pages/dashboard/Inspection-cutting';
import InventoryAdjustmentPage from './components/pages/dashboard/inventoryAdjustment';
import InventoryManagementPage from './components/pages/dashboard/inventoryManagement';
import NotificationsPage from './components/pages/dashboard/notifications';
import CuttingPage from './components/pages/dashboard/picking/cutting';
import PickingPage from './components/pages/dashboard/picking';
import SalesOrdersPage from './components/pages/dashboard/salesOrders';
import SettingsPage from './components/pages/dashboard/settings';
import ProfilePage from './components/pages/dashboard/profile';
import ShippingQuotePage from './components/pages/dashboard/shippingQuote';
import StockDetailsPage from './components/pages/dashboard/stockDetails';
import PhysicalinventoryPage from './components/pages/dashboard/Physicalinventory';
import BinTransferPage2 from './components/pages/dashboard/binTransfer';
import LocationTransferPage from './components/pages/dashboard/locationTransfer';
import NewLocationTransferPage from './components/pages/dashboard/newLocationTransfer';
import CreateSalesOrderPage from './components/pages/dashboard/createSalesOrder';
import Preloading from './components/pages/HOC/preloading';
import CSVOrdersPage from './components/pages/dashboard/csvOrders';
import CSVOrdersPageDetail from './components/pages/dashboard/csvOrdersDetail';
import StampsAuthFlow from './components/pages/stamps_Auth_Flow/Stamps_Auth_Flow';
import PackingPreviewPage from './components/pages/dashboard/PackingPreview';

function App() {

  AuthCheck()


  return (
    <div>
      <Routes>
        {/* Routes are Secured */}
        <Route exact path='/' element={<Preloading><Dashboard /></Preloading>} >
          <Route index element={<AllSaleOrdersPage />} />
          <Route path="sale-order" element={<SalesOrdersPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="shipping-quote" element={<ShippingQuotePage />} />
          <Route path="charge-card" element={<ChargeCardPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="stock-details" element={<StockDetailsPage />} />
          <Route path="packing-preview" element={<PackingPreviewPage />} />
          <Route path="inventory" element={<InventoryManagementPage />} />
          <Route path="bin" element={<BinTransferPage />} />
          <Route path="bintransfer" element={<BinTransferPage2 />} />
          <Route path="pinventory" element={<PhysicalinventoryPage />} />
          <Route path="picking" element={<PickingPage />} />
          <Route path="inspection" element={<InspectionCuttingPage />} />
          <Route path="cutting" element={<CuttingPage />} />
          <Route path="inventory-adjustment" element={<InventoryAdjustmentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="setting" element={<SettingsPage />} />
          <Route path="location-transfer" element={<LocationTransferPage />} />
          <Route path="new-location-transfer" element={<NewLocationTransferPage />} />
          <Route path="create-order" element={<CreateSalesOrderPage />} />
          <Route path="csv-order" element={<CSVOrdersPage />} />
          <Route path="csv-order-detail" element={<CSVOrdersPageDetail />} />


        </Route>


        <Route path='/login' exact element={<Login />} />
        <Route path='/forgot' exact element={<Login />} />
        <Route path='/auth_stamps' exact element={<StampsAuthFlow />} />
        <Route path='/new-account' exact element={<Login />} />
        <Route path='*' element={<Page404 />} />


      </Routes>
    </div>
  );
}

export default App;

export const table = {
    Ecom_Sales_Order: 'Ecom_Sales_Order',
    Sales_Order_Deatils: 'Sales_Order_Deatils',
    Ecom_Sales_Order_Sales_Lines: 'Ecom_Sales_Order_Sales_Lines',
    Ecom_Warehouse_Shipment: 'Ecom_Warehouse_Shipment',
    Ecom_Whse_Shipment_Lines: 'Ecom_Whse_Shipment_Lines',
    Ecom_Location_Card: 'Ecom_Location_Card',
    Ecom_Tracking_No: 'Ecom_Tracking_No',
    Ecom_Contacts: 'Ecom_Contacts',
    Ecom_Salesperson: 'Ecom_Salesperson',
    Customer: 'Customer',
    Ecom_Product_List: 'Ecom_Product_List',
};


// const server = "http://localhost:8080"


export const APIS = {
    token_fed: '/fedexp_token',
    token_stamps: '/auth_stamps',
    token_micro: '/token_microsoft',
    inventory_micro: "/inventory",
    token_refresh_stamps: '/refresh_stamps',

    // fedexp 
    create_shipment: '/shipment',
    check_address_fedexp: '/address_validate_fedexp',
    rate_list_fedexp: '/rate_list_fedexp',

    // ups
    create_Shipment_UPS: '/ups_shipment',
    check_address_ups: '/address_validate_ups',
    rate_list_ups: '/rate_list_ups',

    // printer
    printer: "/printer",

    // stamps
    funds_STAMP: "/funds_stamps",
    create_shipment_stamps: '/stamps_shipment',
    check_address_stamps: '/address_validate_stamps',
    rate_list_stamps: '/rate_list_stamps',

    // authorise.net
    auth_net_charge: "/charge_card",

    // microsoft
    sale_orders_micro: '/sales',
    history_micro: '/history',
    new_order_micro: '/newOrder',
    csv_order_micro: '/csv_orders',
    customers_micro: '/customers',
    shipFrom: '/shipfrom',
    create_Shipment_micro: '/createShipment',
    pick_details_micro: '/pickDetails',
    request_pick_micro: '/requestPick',
    successPick_micro: '/successPick',
    pickingPage_micro: '/pickingPage',
    createPaking_micro: '/create-packing',
    registerPacking_micro: '/register-picking',
    getPacking_micro: '/get-picking',
    postPacking_micro: '/post-picking',
    gets_lots_detail_micro: '/lots',
    post_shipment_micro: '/post-shipment',
    post_invoice_micro: '/post-invoice',


}






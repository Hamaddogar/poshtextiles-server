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


const server = "http://localhost:8080"


export const APIS = {
    token_fed: server + '/fedexp_token',
    token_stamps: server + '/auth_stamps',
    token_micro: server + '/token_microsoft',
    inventory_micro: server + "/inventory",
    token_refresh_stamps: server + '/refresh_stamps',



    // fedexp 
    create_shipment: server + '/shipment',
    check_address_fedexp: server + '/address_validate_fedexp',
    rate_list_fedexp: server + '/rate_list_fedexp',

    // ups
    create_Shipment_UPS: server + '/ups_shipment',
    check_address_ups: server + '/address_validate_ups',
    rate_list_ups: server + '/rate_list_ups',

    // printer
    printer: server + "/printer",

    // stamps
    funds_STAMP: server + "/funds_stamps",
    create_shipment_stamps: server + '/stamps_shipment',
    check_address_stamps: server + '/address_validate_stamps',
    rate_list_stamps: server + '/rate_list_stamps',

    // authorise.net
    auth_net_charge: server + "/charge_card",

    // microsoft
    sale_orders_micro: server + '/sales',
    history_micro: server + '/history',
    new_order_micro: server + '/newOrder',
    csv_order_micro: server + '/csv_orders',
    customers_micro: server + '/customers',
    shipFrom: server + '/shipfrom',
    create_Shipment_micro: server + '/createShipment',
    pick_details_micro: server + '/pickDetails',
    request_pick_micro: server + '/requestPick',
    successPick_micro: server + '/successPick',
    pickingPage_micro: server + '/pickingPage',
    createPaking_micro: server + '/create-picking',
    registerPacking_micro: server + '/register-picking',
    getPacking_micro: server + '/get-picking',
    postPacking_micro: server + '/post-picking',
    gets_lots_detail_micro: server + '/lots',


}






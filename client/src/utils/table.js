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

export const APIS = {
    token_fed: 'http://localhost:8080/fedexp_token',
    token_micro: 'http://localhost:8080/token_microsoft',
    inventory_micro: "http://localhost:8080/inventory",
    

    // fedexp 
    create_shipment : 'http://localhost:8080/shipment',
    check_address_fedexp: 'http://localhost:8080/address_validate_fedexp',
    rate_list_fedexp: 'http://localhost:8080/rate_list_fedexp',


    // ups
    create_shipment_ups: 'http://localhost:8080/ups_shipment',
    check_address_ups: 'http://localhost:8080/address_validate_ups',
    rate_list_ups: 'http://localhost:8080/rate_list_ups',

    // microsoft
    sale_orders_micro: 'http://localhost:8080/sales',
    history_micro: 'http://localhost:8080/history',
    new_order_micro: 'http://localhost:8080/newOrder', 
}








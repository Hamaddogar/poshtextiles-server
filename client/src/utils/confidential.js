export const FEDEXP_CLIENT_ID = 'l7f3e40fe52f194710907c05dd71fe4df3';
export const FEDEXP_CLIENT_SECRET = '3de32885a68543c9b0ddebf86f5489e9';


export const MICROSOFT_CLIENT_ID = "da8dc534-e642-46e2-8f28-57bc71d854c0";
export const MICROSOFT_AUTHORITY = "https://login.microsoftonline.com/organizations";






export const FEDEXP_Production_Server = "https://apis.fedex.com";
export const FEDEXP_Sandbox_Server = "https://apis-sandbox.fedex.com";
export const CORS_Proxy = 'https://cors-anywhere.herokuapp.com/';











export const API = {
    fedexp: {
        token: "/oauth/token",
        create_Shipment: "/ship/v1/shipments",
        Cancel_Shipment: '/ship/v1/shipments/cancel',
        Validate_Shipment: "/ship/v1/shipments/packages/validate",
        Create_Tag: "/ship/v1/shipments/tag",
        track_Multiple: "/track/v1/associatedshipments",
    },

    // microsoft apis
    microsoft: {
        saleOrder: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$expand=edcSalesLines,edcCustomers,edcWhseShipments&$count=true",
        inventory: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcStockBalances?$top=300",
        saleOrderFull: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$top=300&$expand=edcSalesLines,edcCustomers,edcWhseShipments",
        // raw
        api1: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(aabdd4f3-a1f4-ec11-82f8-0022483487fb)/edcContacts",
        api2: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(aabdd4f3-a1f4-ec11-82f8-0022483487fb)/edcCustomers?$expand=edcCustContacts&$top=10&$count=true",
        api3: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies",
        api5: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcLocations",
        api6: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcItemCategories",
        api7: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcItems",
        api8: "https://login.microsoftonline.com/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/oauth2/v2.0/token",
        api10: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrderDeatils?$expand=edcSalesLines&$top=10&$count=true&$filter=no eq 'SO34571'",
        api11: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrderDeatils?$expand=edcSalesLines&$top=10&$count=true",
        newOrder: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$expand=edcSalesLines,edcCustomers,edcWhseShipments&$count=true",
        token: "https://login.microsoftonline.com/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/oauth2/v2.0/token",
    },

};

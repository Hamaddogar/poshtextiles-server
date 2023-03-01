module.exports = {
    SERVERS: {
        FEDEXP_Production_Server: "https://apis.fedex.com",
        FEDEXP_Sandbox_Server: "https://apis-sandbox.fedex.com",

        MICROSOFT_Sandbox_Server: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)",
        
        UPS_Sandbox_Server: "https://wwwcie.ups.com",
        UPS_Production_Server: "https://onlinetools.ups.com",
        
    },

    API_FEDEXP: {
        Token: "/oauth/token",
        Create_Shipment: "/ship/v1/shipments",
        Cancel_Shipment: '/ship/v1/shipments/cancel',
        Validate_Shipment: "/ship/v1/shipments/packages/validate",
        Create_Tag: "/ship/v1/shipments/tag",
        Track_Multiple: "/track/v1/associatedshipments",
    },

    API_MICROSOFT: {
        Token: "https://login.microsoftonline.com/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/oauth2/v2.0/token",
        Sales_Orders: "/edcSalesOrders?$expand=edcSalesLines,edcCustomers,edcWhseShipments&$count=true",
        Inventory: "/edcStockBalances?$top=300",
        History: "/edcSalesOrders?$top=300",

    },

    API_UPS : {
        Create_Shipment: "/ship/v1/shipments",
    }

};
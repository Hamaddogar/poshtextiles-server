module.exports = {
    SERVERS: {
        FEDEXP_Production_Server: "https://apis.fedex.com",
        FEDEXP_Sandbox_Server: "https://apis-sandbox.fedex.com",

        
        UPS_Sandbox_Server: "https://wwwcie.ups.com",
        UPS_Production_Server: "https://onlinetools.ups.com",
        
        
        
        STAMPS_AUTH_Server: "https://signin.testing.stampsendicia.com",
        STAMPS_Sandbox_Server : "https://api.testing.stampsendicia.com/sera",
        STAMPS_Production_Server : "https://api.stampsendicia.com/sera",

    },


    API_MICROSOFT: {
        Token: "https://login.microsoftonline.com/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/oauth2/v2.0/token",
        Sales_Orders: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$expand=edcSalesLines,edcWhseShipments($expand=edcBoxDetails),edcCustomers,edcShipToAdds,edcSalesComments,edcSalesLines($expand=edcSalesComments)&$orderby=no desc",
        Inventory: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcItems",
        History: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$top=300",
        new_Sale_Order: "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(aabdd4f3-a1f4-ec11-82f8-0022483487fb)/edcCreateSalesOrders?$expand=edcSalesLines",
        Customer : "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(aabdd4f3-a1f4-ec11-82f8-0022483487fb)/edcCustomers?$expand=edcCustContacts&$top=10&$count=true",
        locations : code => `https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcLocations?$filter=code eq '${code}'`


    },

    API_FEDEXP: {
        Token: "/oauth/token",
        Create_Shipment: "/ship/v1/shipments",
        Validate_Address: "/address/v1/addresses/resolve",
        rate_list: '/rate/v1/rates/quotes'
    },

    // /addressvalidation/v1/1?regionalrequestindicator=true&maximumcandidatelistsize=10
    // 
    API_UPS: {
        Create_Shipment: "/ship/v1/shipments",
        Validate_Address: "/addressvalidation/v1/1?regionalrequestIndicator=true&maximumcandidatelistsize=1",
        rate_list : "/rest/Rate"
    },

    API_STAMPS : {
        Token : "https://signin.testing.stampsendicia.com/oauth/token",
        Validate_Address: "/v1/addresses/validate",
        Create_Shipment: " ",
        rate_list: ' '
    }

};
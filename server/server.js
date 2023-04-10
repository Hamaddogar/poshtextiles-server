// require('dotenv').config()
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const querystring = require('querystring');
const { v4: uuidv4 } = require('uuid');

const axios = require('axios');
const path = require("path");
const cors = require('cors');
const { SECRETS } = require('./environment/credentials');
const { API_FEDEXP, SERVERS, API_MICROSOFT, API_UPS, API_STAMPS } = require('./environment/APIs');
const app = express();


// useage
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.static("./build"));
app.use(express.static("./uploads"));
app.use(express.urlencoded({ limit: '200mb', extended: true }));


let data = []
// ---------------- MiddleWares -------------- //
const cache = (req, res, next) => {
    if (data.length) { res.send(data) }
    else { next() }
}



// ---------------Helpers -----------------//
const getServiceName = (serviceCode) => {
    const services = {
        "01": "UPS Next Day Air",
        "02": "UPS 2nd Day Air",
        "03": "UPS Ground",
        "12": "UPS 3 Day Select",
        "13": "UPS Next Day Air Saver",
        "14": "UPS Next Day Air Early A.M.",
        "59": "UPS 2nd Day Air A.M.",
        "65": "UPS Saver",
        "07": "UPS Worldwide Express",
        "08": "UPS Worldwide Expedited",
        "11": "UPS Standard",
        "54": "UPS Worldwide Express Plus",
        "70": "UPS Access Point Economy",
        "71": "UPS Worldwide Express Freight Midday",
        "72": "UPS Worldwide Economy",
        "74": "UPS Express Saver",
        "90": "UPS Worldwide Express Freight",
        "92": "UPS SurePost",
        "93": "UPS SurePost"
    };

    return services[serviceCode] || "Unknown Service";
};

const CLIENT_ID_STAMPS = 'my778N8oCwaKq0dSPT1soKY9807OpicK';
const REDIRECT_URI_STAMPS = 'http://localhost:3000/auth_stamps';
const AUTH_ENDPOINT_STAMPS = 'https://signin.testing.stampsendicia.com/authorize';
const CLIENT_SECRET_STAMPS = 'd_uNVV_XwW8K2wwO7UrEkMIuiokqPLANSUnr6JNP1CcXUbrtgQoTsBSnOJi0ttGF';
const TOKEN_ENDPOINT_STAMPS = 'https://signin.testing.stampsendicia.com/oauth/token';
const stampsUsername = "poshtext-01";
const stampsPassword = "April2023!";



// ---------------- Routes -------------- //
const routeStrings = {
    // tokens
    token_fed: '/fedexp_token',
    token_stamps: '/stamps_token',

    // fedexp
    shipment_fedexp: '/shipment',
    address_validate_fedexp: '/address_validate_fedexp',
    rate_list_fedexp: '/rate_list_fedexp',

    // UPS
    shipment_ups: '/ups_shipment',
    address_validate_ups: '/address_validate_ups',
    rate_list_ups: '/rate_list_ups',

    // stamps
    shipment_stamps: '/stamps_shipment',
    address_validate_stamps: '/address_validate_stamps',
    rate_list_stamps: '/rate_list_stamps',

    // microsoft
    sale_orders_micro: '/sales',
    history_micro: '/history',
    inventory_micro: '/inventory',
    new_order_micro: '/newOrder',
    csv_orders_micro: '/csv_orders',
    customers_micro: '/customers',
    ship_from_location_micro: '/shipfrom'

}

// ---------------- Routes -------------- //
// ---------------- FedExp Routes -------------- //

// FedExp-Token
app.get(routeStrings.token_fed, async (req, res) => {
    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const body = {
        grant_type: SECRETS.GRANT_TYPE_FEDEXP,
        client_id: SECRETS.CLIENT_ID_FEDEXP,
        client_secret: SECRETS.CLIENT_SECRET_FEDEXP
    };
    try {
        const response = await axios.post(
            SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.Token,
            new URLSearchParams(body).toString(),
            config
        );

        if (response?.data?.access_token) {
            res.status(response.status).send(response.data.access_token);
        } else {
            throw ({
                response: {
                    "message": "Server Error!",
                    "name": "Error",
                    "status": 500
                }
            });
        }


    } catch (error) {
        console.log(error);
        if (error?.response?.status) res.send({ error: true, message: error.response.data.errors[0].message });
        else res.status(500).send({ error: error.message });
    }
});

// FedExp shipment_fedexp
app.post(routeStrings.shipment_fedexp, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    let URLs = [];
    try {
        const arr = req.body.body.requestedShipment.requestedPackageLineItems;

        for (let i = 0; i < arr.length; i += 4) {
            const chunk = arr.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.requestedShipment.requestedPackageLineItems = chunk
            const response = await axios.post(
                SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.Create_Shipment,
                newBody,
                config
            );
            // console.log("resss", response);
            if (response?.data?.output?.transactionShipments?.[0]?.pieceResponses?.[0]?.packageDocuments?.[0]?.url) {
                const pdfUrls = ((response.data.output.transactionShipments[0].pieceResponses).map(item => {
                    return item.packageDocuments[0].url;
                }));
                URLs.push(...pdfUrls)
            }
        }

        async function downloadAndConvert(urls) {
            const base64Array = [];
            for (let i = 0; i < urls.length; i++) {
                try {
                    const response = await axios.get(urls[i], { responseType: 'arraybuffer' });
                    const imageData = response.data;
                    const fileName = `label${i + 1}.png`;
                    fs.writeFileSync(fileName, imageData, 'binary');

                    const base64Data = fs.readFileSync(fileName, 'base64');
                    base64Array.push(base64Data);

                    fs.unlinkSync(fileName);
                } catch (error) {
                    console.error(`Failed to download ${urls[i]}`, error);
                }
            }
            return base64Array;
        }


        const images = await downloadAndConvert(URLs)


        res.status(200).send({
            file: true,
            data: images,
            error: false
        })

    } catch (error) {
        console.log(error);
        if (error?.response?.status) res.send({ message: error?.response?.data?.errors[0]?.message, error: true, code: error?.response?.data?.errors[0]?.code });
        else res.send({ message: "Request failed with status code 500", error: true });
    }
});


// FedExp address validation
app.post(routeStrings.address_validate_fedexp, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.Validate_Address,
            req.body.body,
            config
        );
        if (response?.status === 200 && (response.data.output.resolvedAddresses[0].attributes.DPV || response.data.output.resolvedAddresses[0].attributes.Matched || response.data.output.resolvedAddresses[0].attributes.Resolved)) {
            res.status(response.status).send({
                message: response.data.output.resolvedAddresses[0].attributes.Resolved,
                error: false,
                valid: true,
            });
        } else if (response?.data?.output?.resolvedAddresses[0]?.customerMessages[0]?.code) {
            throw ({
                response: {
                    "message": response.data.output.resolvedAddresses[0].customerMessages[0].code,
                    "name": response.data.output.resolvedAddresses[0].customerMessages[0].message,
                    "status": 500,
                }
            });
        }
        else {
            throw ({
                response: {
                    "message": "Server Error!",
                    "name": "Error",
                    "status": 500,
                }
            });
        }

    } catch (error) {
        console.log(error);
        if (error?.status) res.send({ code: error.status, message: error.message, error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message) || error.response.message),
            error: true
        });
        else res.send({ code: error.status, message: error.message, error: true });
    }
});


// FedExp rate_list 
app.post(routeStrings.rate_list_fedexp, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    const accountNumber = "740561073";

    let rates = [];
    try {
        let newBody = { ...req.body.body }
        newBody.accountNumber.value = accountNumber;

        const response = await axios.post(
            SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.rate_list,
            newBody,
            config
        );
        console.log("response", response.data);
        response.data?.output?.rateReplyDetails?.map(service => {
            // respo[0].ratedShipmentDetails[0]
            service.ratedShipmentDetails.map(item => {
                if (item.rateType === "ACCOUNT" || item.rateType === "LIST") {
                    rates.push({
                        based: item.rateType,
                        serviceName: service.serviceName,
                        days: "02",
                        currency: item.currency,
                        pkgType: item.ratedPackages?.[0]?.rateType,

                        rate: item.totalNetCharge,
                        netWeight: item.shipmentRateDetail.totalBillingWeight.value,
                        unit: item.shipmentRateDetail.totalBillingWeight.units
                    })
                }
            })


        })


        res.status(200).send({
            error: false,
            allServices: rates,
        });

    } catch (error) {
        console.log(error);
        if (error?.status) res.send({ code: error.status, message: error.message, error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.errors[0]?.message) || (error?.response?.data?.response?.errors[0]?.message)),
            error: true
        });
        else res.send({ code: error.status, message: error.message, error: true });
    }
});














// ---------------------- UPS Routes ------------------- //

// UPS shipment order
app.post(routeStrings.shipment_ups, async (req, res) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AccessLicenseNumber': 'ACE923D1E3142AC6',
            'Username': 'silktex',
            'Password': 'Crafts12#'
        }
    };
    const images = [];
    try {
        const lineItems = req.body.body.ShipmentRequest.Shipment.Package;
        for (let i = 0; i < lineItems.length; i += 4) {
            const chunk = lineItems.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.ShipmentRequest.Shipment.Package = chunk;
            const response = await axios.post(
                SERVERS.UPS_Production_Server + API_UPS.Create_Shipment,
                newBody,
                config
            );

            if (response?.data?.ShipmentResponse?.ShipmentResults?.PackageResults) {
                if (Array.isArray(response.data.ShipmentResponse.ShipmentResults.PackageResults)) {
                    const new_images = (response.data.ShipmentResponse.ShipmentResults.PackageResults).map((item) => item.ShippingLabel.GraphicImage)
                    images.push(...new_images)
                } else {
                    const new_images = response.data.ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage
                    images.push(new_images)
                }
            }
        };

        res.status(200).send({
            file: true,
            data: images,
            error: false
        })
    } catch (error) {
        console.log(error);
        if (error?.response?.status) res.send({ message: error.response.data.response.errors[0].message, error: true });
        else res.send({ message: 'Request failed with status code 500', error: true });
    }
});


// UPS address validation
app.post(routeStrings.address_validate_ups, async (req, res) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'AccessLicenseNumber': 'ACE923D1E3142AC6',
            'Username': 'silktex',
            'Password': 'Crafts12#'
        }
    };
    try {
        const response = await axios.post(
            SERVERS.UPS_Production_Server + API_UPS.Validate_Address,
            req.body.body,
            config
        );



        if (response?.status === 200 && (response?.data?.XAVResponse?.Response?.ResponseStatus?.Description === "Success")) {
            res.status(response.status).send({
                message: true,
                error: false,
                valid: true
            });
        } else if (response?.response?.data?.response?.errors[0]?.message) {
            throw ({
                response: {
                    "message": response.response.data.response.errors[0].message,
                    "name": response.response.data.response.errors[0].code,
                    "status": 500,
                }
            })
        }
        else {
            throw ({
                response: {
                    "message": "Server Error!",
                    "name": "Error",
                    "status": 500
                }
            });
        }

    } catch (error) {
        console.log(error);
        // res.send(error)
        if (error?.status) res.send({ code: error.status, message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message)), error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.response?.errors[0]?.message) || (error?.response?.data?.errors[0]?.code) || error?.response?.message),
            error: true
        });
        else res.send({ code: error.status, message: error.message, error: true });
    }
});


// UPS rate list
app.post(routeStrings.rate_list_ups, async (req, res) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'AccessLicenseNumber': 'ACE923D1E3142AC6',
            'Username': 'silktex',
            'Password': 'Crafts12#'
        }
    };

    const body = {
        "UPSSecurity": {
            "UsernameToken": {
                'Username': 'parveendhawan',
                'Password': 'praveen#123'
            },
            "ServiceAccessToken": {
                'AccessLicenseNumber': 'ACE923D1E3142AC6',
            }
        },
        "RateRequest": req.body.body
    };


    const request = {
        shop: {
            "RequestAction": "Shop",
            "RequestOption": "Shop"
        },
        ShipperNumber: "R006V5",
    }

    const shopRates = [];
    try {

        let newBody = { ...body }
        newBody.RateRequest.Request = request.shop;
        const response = await axios.post(
            SERVERS.UPS_Production_Server + API_UPS.rate_list,
            newBody,
            config
        );


        if ("Fault" in response.data) {
            throw {
                response: {
                    "message": response?.data?.detail?.Errors?.ErrorDetail?.PrimaryErrorCode?.Description,
                    "name": response?.data?.detail?.Errors?.ErrorDetail?.PrimaryErrorCode?.Code,
                    "status": 500
                }
            }
        } else if (response?.status === 200 && (Array.isArray(response.data?.RateResponse?.RatedShipment))) {
            const shop = (response.data.RateResponse.RatedShipment).map(item => {
                return {
                    serviceName: getServiceName(item.Service.Code),
                    days: item.GuaranteedDelivery?.BusinessDaysInTransit,
                    currency: item.TotalCharges.CurrencyCode,
                    rate: item.TotalCharges.MonetaryValue,
                    netWeight: item.BillingWeight.Weight,
                    unit: item.BillingWeight.UnitOfMeasurement.Code
                }
            });
            shopRates.push(...shop)
        }

        res.status(200).send({
            allServices: shopRates,
            error: false,
        });

    } catch (error) {
        console.log("error Rates", error);
        if (error?.response?.status) res.send({ error: true, message: error?.response?.data?.response?.errors[0]?.message });
        else res.status(500).send({ error: true, message: error.message });
    }
});



// -----------------stamps Routes --------------------- //





app.get('/auth', async (req, res) => {
    try {
        const queryParams = querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID_STAMPS,
            redirect_uri: REDIRECT_URI_STAMPS
        });

        const authorizationUrl = `${AUTH_ENDPOINT_STAMPS}?${queryParams}`;
        res.send(authorizationUrl);

    } catch (error) {
        console.error(error);
        res.send({ ...error });
    }
});


// stamps address validation
app.post(routeStrings.address_validate_stamps, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    try {

        const response = await axios.post(
            "https://api.testing.stampsendicia.com/sera/v1/addresses/validate",
            req.body.body,
            config
        );

        if (Array.isArray(response?.data) && "validation_results" in response?.data[0]) {
            const result = response?.data[0]?.validation_results?.result_code;
            switch (result) {
                case "V100":
                    res.status(200).send({
                        message: response.data[0].validation_results.result_description,
                        error: false,
                        valid: true,
                    });
                    break;
                case "V101":
                    res.send({
                        message: "The postal code is invalid",
                        error: true,
                        valid: false,
                    });
                    break;
                case "V102":
                    res.send({
                        message: "The state is invalid",
                        error: true,
                        valid: false,
                    });
                    break;
                case "V103":
                    res.send({
                        message: "The city is invalid",
                        error: true,
                        valid: false,
                    });
                    break;
                case "V104":
                    res.send({
                        message: "The street address is invalid",
                        error: true,
                        valid: false,
                    });
                    break;
                case "V105":
                    res.send({
                        message: "The country is not supported",
                        error: true,
                        valid: false,
                    });
                    break;
                case "V106":
                    res.send({
                        message: "The address is too long",
                        error: true,
                        valid: false,
                    });
                    break;
                case "V200":
                    res.send({
                        message: "The address is invalid",
                        error: true,
                        valid: false,
                    });
                    break;
                default:
                    throw ({
                        response: {
                            message: 'Try Again'
                        }
                    })
            }
        } else {
            throw ({
                response: {
                    message: 'Try Again'
                }
            })
        }
    } catch (error) {
        console.log(error);
        if (error?.status) res.send({ code: error.status, message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message)), error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.message) || (error?.response?.data?.errors[0]?.code) || error?.response?.message),
            error: true
        });
        else res.send({ code: 'error.status', message: 'error.message', error: true });
    }
});


// stamps rate list
app.post(routeStrings.rate_list_stamps, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    let allRates = []
    try {
        const url = "https://api.testing.stampsendicia.com/sera/v1/rates"
        const response = await axios.post(
            url,
            req.body.body,
            config
        );

        const avaliableServices = response.data.map(rate => {
            return rate.service_type
        })

        for (let index = 0; index < avaliableServices.length; index++) {
            let newBody = { ...req.body.body }
            newBody.service_type = avaliableServices[index];
            const response = await axios.post(
                url,
                newBody,
                config
            );


            response.data.forEach(item => {
                allRates.push({
                    serviceName: item.service_type,
                    serviceType: item.packaging_type,
                    days: item.estimated_delivery_days,
                    currency: item.shipment_cost.currency,
                    rate: item.shipment_cost.total_amount,
                })
            });
        }



        res.status(200).send({
            allServices: allRates,
            error: false,
        });

    } catch (error) {
        console.log(error);
        res.send({
            code: error?.response?.status || error?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});


// stamps shipment & labels
app.post(routeStrings.shipment_stamps, async (req, res) => {

    let images = [];
    try {
        const url = "https://api.testing.stampsendicia.com/sera/v1/labels";

        const lineItems = req.body.body.package;
        console.log(lineItems);
        for (let i = 0; i < lineItems.length; i++) {
            // const chunk = lineItems.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.package = lineItems[i];
            const response = await axios.post(
                url,
                newBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-locale": "en_US",
                        "Authorization": `Bearer ${req.body.token}`,
                        "Idempotency-Key": `${uuidv4()}`
                    }
                }
            );

            if (response.status < 300 && "labels" in (response?.data)) {
                if (Array.isArray(response.data.labels)) {
                    const new_images = (response.data.labels).map((item) => item.label_data)
                    images.push(...new_images)
                } else {
                    const new_images = response.data.labels.label_data
                    images.push(new_images)
                }
            }
        };


        res.status(200).send({
            file: true,
            data: images,
            error: false
        })

    } catch (error) {
        console.log(error);
        res.send({
            code: error.response.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// add funds to stamps
app.get("/auth_stamps", async (req, res) => {

    try {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlA3Z3pLRGdfRENlVzcyeXZ3cnpQcCJ9.eyJodHRwczovL3N0YW1wc2VuZGljaWEuY29tL2ludGVncmF0aW9uX2lkIjoiNzc4OTdmNDYtNjg2NS00NzQ1LTlkZjMtZDUzYjc4MTA4YjBjIiwiaHR0cHM6Ly9zdGFtcHNlbmRpY2lhLmNvbS91c2VyX2lkIjozNzI1Mzk5LCJpc3MiOiJodHRwczovL3NpZ25pbi50ZXN0aW5nLnN0YW1wc2VuZGljaWEuY29tLyIsInN1YiI6ImF1dGgwfDM3MjUzOTkiLCJhdWQiOiJodHRwczovL2FwaS5zdGFtcHNlbmRpY2lhLmNvbSIsImlhdCI6MTY4MDc3Mjg2OCwiZXhwIjoxNjgwNzczNzY4LCJhenAiOiJteTc3OE44b0N3YUtxMGRTUFQxc29LWTk4MDdPcGljSyJ9.C_kpgBYXycvxgtfaF5doJ53BGB1WsJhlK4VZXdyQaoGLU1kTooNovUJfGsTVbC_AA3mAe0nussWvDtRACFlCKpt9ffdKByr4HnDn3krMfNH5zt2_1CDo9bXkjZo0idOot8h93IIRgIp3pc-S-H3pyamoRa1UsxnADaJQj2u_anGeO0QSBiICwr4ybb7MktRh6yYulTXrn7izagT9jmtguClrVf4K4FazESJPAUrgsoOzc9VL0cEgtP27-a8TDaKzwUWYb4Pn8wqFoTxIlz3Pe32amH_trW0vtJqIkQNLAjhnwHUU3LzokIpC0gM9rkw3aGVyN9KkDnGvChhltx8SRg"
        const response = await axios.post(
            "https://api.testing.stampsendicia.com/sera/v1/balance/add-funds",
            {
                "amount": 5000,
                "currency": "usd"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-locale": "en_US",
                    "Authorization": `Bearer ${token}`,
                    "Idempotency-Key": `${uuidv4()}`
                }
            }
        )





        console.log("ress", response.data);



        res.status(200).send(response.data)

    } catch (error) {
        console.log(error);
        res.status(error?.response?.status).send({
            code: error.response.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});













// =============== PRINTING labels ALL =============//
app.post('/printer', async (req, res) => {
    const base64 = req.body.printData
    try {

        for (let index = 0; index < base64.length; index++) {
            const item = base64[index];
            let formData = new FormData();
            formData.append('label', item);
            await axios.post("https://zpl.rs74.net", formData);
        }

        res.status(200).send({
            error: false,
            printed: true,
        })
    } catch (error) {
        console.log(error);
        if (error?.name) res.send({ message: error.message, error: true });
        else res.send({ message: 'Request failed with status code 500', error: true });
    }

});






// -----------------Microsoft Routes --------------------- //

// microsoft all sales orders
app.post(routeStrings.sale_orders_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    // // console.log( `Bearer ${req.body.token}`);
    try {
        const response = await axios.get(
            API_MICROSOFT.Sales_Orders,
            config
        );
        // console.log(response?.data?.value);
        if (response?.data?.value) {
            res.status(response.status).send(response.data.value);
        } else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {
        console.log("error", error);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else res.status(500).send({ error: error.message });
    }
});

// microsoft all inventory 
app.post(routeStrings.inventory_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            API_MICROSOFT.Inventory,
            config
        );
        if (response?.data?.value) {
            res.status(response.status).send(response.data.value);
        } else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {
        // console.log("error", error.response);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else res.status(500).send({ error: error.message });
    }
});

// CREATE sale order
app.post(routeStrings.new_order_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "If-Match": "*"
        }
    };

    try {
        const response = await axios.post(
            API_MICROSOFT.new_Sale_Order,
            req.body.body,
            config
        );

        res.status(response.status).send({
            error: false,
            created: true,
        });


    } catch (errorss) {
        console.log("error", errorss);
        if (errorss?.response?.status) res.status(errorss.response.status).send({
            error: {
                message: errorss.response.data.error.message,
                error: true
            }
        });
        else res.status(500).send({ error: errorss.message });
    }
});

// CSV ORDERS data 
app.post(routeStrings.csv_orders_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        // const response = await axios.post(
        //     API_MICROSOFT.comments_micro,
        //     req.body.body,
        //     config
        // );
        const response = {
            status: 200,
            data: req.body.body
        }
        setTimeout(() => {
            res.status(response.status).send({
                success: true,
                data: response.data
            });
        }, 5000);

    } catch (errorCatch) {
        res.status(errorCatch?.response?.status).send({
            error: {
                message: errorCatch?.response?.data?.error?.message,
                error: true
            }
        });
    }
});

// custermer getter
app.post(routeStrings.customers_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    // // console.log( `Bearer ${req.body.token}`);
    try {
        const response = await axios.get(
            API_MICROSOFT.Customer,
            config
        );
        console.log(response?.data);
        if (response?.data?.value) {
            res.status(response.status).send(response.data.value);
        } else {
            console.log("-------else-", response);
            throw ({
                response: {
                    "message": "Server Error!",
                    "name": "Error",
                    "status": 500
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.status(error?.response?.status).send({
            code: error.response.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// ship_from_location_micro
app.post(routeStrings.ship_from_location_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            API_MICROSOFT.locations(req.body.locationCode),
            config
        );
        if (response?.data?.value?.length > 0) {
            res.status(response.status).send({ error: false, location: response.data.value[0] });
        } else {
            throw ({
                response: {
                    "message": "Server Error!",
                    "name": "Error",
                    "status": 500
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.status(error?.response?.status).send({
            code: error.response.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// ------------------- Configurations----------------- //


// server configuration
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); })

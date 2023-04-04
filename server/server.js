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

const getServiceDays = (serviceCode) => {
    const services = {
        "01": 1,
        "02": 2,
        "03": 3,
        "12": 3,
        "13": 1,
        "14": 1,
        "59": 2,
        "65": 1,
        "07": "1-3",
        "08": "2-5",
        "11": "1-5",
        "54": "1-3",
        "70": "2-5",
        "71": "1-3",
        "72": "2-5",
        "74": "1-3",
        "90": "1-3",
        "92": "2-7",
        "93": "2-7"
    };

    return services[serviceCode] || "9999";
};






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
    comments_micro: '/comments',

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

        response.data?.output?.rateReplyDetails?.map(service => {
            // respo[0].ratedShipmentDetails[0]
            service.ratedShipmentDetails.map(item => {
                if (item.rateType === "ACCOUNT" || item.rateType === "LIST") {
                    rates.push({
                        based: item.rateType,
                        serviceName: service.serviceName,
                        days: "02",
                        currency: item.currency,
                        pkgType: item.ratedPackages[0].rateType,

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
        console.log("error", error);
        if (error?.response?.status) res.send({ error: true, message: error?.response?.data?.response?.errors[0]?.message });
        else res.status(500).send({ error: true, message: error.message });
    }
});



// -----------------stamps Routes --------------------- //


const CLIENT_ID = 'my778N8oCwaKq0dSPT1soKY9807OpicK';
const CLIENT_SECRET = 'd_uNVV_XwW8K2wwO7UrEkMIuiokqPLANSUnr6JNP1CcXUbrtgQoTsBSnOJi0ttGF';
const REDIRECT_URI = 'http://localhost:8080/auth_stamps';
const AUTH_ENDPOINT = 'https://signin.testing.stampsendicia.com/authorize';
const TOKEN_ENDPOINT = 'https://signin.testing.stampsendicia.com/oauth/token';
const stampsUsername = "poshtext-01";
const stampsPassword = "April2023!";


app.get('/auth_stamps', async (req, res) => {
    const authorizationCode = req.query.code;
    // console.log("eqe", authorizationCode);
    try {

        if (authorizationCode) {
            const tokenResponse = await axios.post(TOKEN_ENDPOINT, {
                grant_type: 'authorization_code',
                code: authorizationCode,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            });
            res.status(200).send(tokenResponse.data.access_token);
        } else {
            const queryParams = querystring.stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI
            });

            const authorizationUrl = `${AUTH_ENDPOINT}?${queryParams}`;
            // console.log(authorizationUrl);
            res.redirect(authorizationUrl);
        }

    } catch (error) {
        console.error(error);
        res.send({ ...error });
    }
});


app.post('/refresh_stamps', async (req, res) => {
    // const authorizationCode = req.query.code;
    // console.log("eqe", authorizationCode);
    try {

        const tokenResponse = await axios.post(TOKEN_ENDPOINT, {
            "grant_type": "refresh_token",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": `${req.body.token}`
        });

        console.log("--------", tokenResponse.data);


        res.status(200).send({ ...tokenResponse.data });

    } catch (error) {
        console.error(error);
        res.send({ ...error });
    }
});

app.get('/auth', async (req, res) => {

    try {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlA3Z3pLRGdfRENlVzcyeXZ3cnpQcCJ9.eyJodHRwczovL3N0YW1wc2VuZGljaWEuY29tL2ludGVncmF0aW9uX2lkIjoiNzc4OTdmNDYtNjg2NS00NzQ1LTlkZjMtZDUzYjc4MTA4YjBjIiwiaHR0cHM6Ly9zdGFtcHNlbmRpY2lhLmNvbS91c2VyX2lkIjozNzI1Mzk5LCJpc3MiOiJodHRwczovL3NpZ25pbi50ZXN0aW5nLnN0YW1wc2VuZGljaWEuY29tLyIsInN1YiI6ImF1dGgwfDM3MjUzOTkiLCJhdWQiOiJodHRwczovL2FwaS5zdGFtcHNlbmRpY2lhLmNvbSIsImlhdCI6MTY4MDYxODc3OSwiZXhwIjoxNjgwNjE5Njc5LCJhenAiOiJteTc3OE44b0N3YUtxMGRTUFQxc29LWTk4MDdPcGljSyJ9.KSjWTxIgC7dOYz59J-kYhgCDDRlg9UIstjfrjlkRkkMuTRTBrWGHGLv3XfxuCDf7p6-P53Il3gXJ9fi8sHEpfiQAr8_T4FY951yugiao5a1gs1fhMBbEPxgb28VBkSHNBF1SijB-Z_Y24_tfqNItF8CY20YDsVSFAPDZnaQciZ4o8b9DHKf0e_Zo-k0IfgDJOo7fhCzS_idONqa0wE4-MR9NVBN6h0-xpTglBZmKLA9hJX0nR3PRJ7w38Eg8P_MmJ_ciMiwX-iUvK4NR946a9pk7BEJVFEqTjn5ocg5wH2GzAfC46YfPhcibedrgCJIeu_HBFBPAVgx1IrQAzUq6kw"
        res.send(token)

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
        res.send({ code: error.status, message: error.message, error: true })
    }
});


// stamps shipment & labels
app.post(routeStrings.shipment_stamps, async (req, res) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
            "Idempotency-Key": `${uuidv4()}`
        }
    };
    let images = [];
    try {
        const url = "https://api.testing.stampsendicia.com/sera/v1/labels";

        const lineItems = req.body.body.packages;
        for (let i = 0; i < lineItems.length; i += 4) {
            const chunk = lineItems.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.packages = chunk;
            const response = await axios.post(
                url,
                newBody,
                config
            );
            console.log("resss", response);
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
            code: error.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message
            , error: true
        })
    }
});

// preview file link UPS
app.get('/report_stamps', (req, res) => {
    const filePath = path.join(__dirname, '/reports/stamps/STAMPS_labels_report.png');
    res.sendFile(filePath, {
        headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'inline; filename=STAMPS_labels_report.png'
        }
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
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
app.post(routeStrings.sale_orders_micro, cache, async (req, res) => {
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
            data = response.data.value
            res.status(response.status).send(response.data.value);
        } else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {
        // console.log("error", error.response.data);
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
        }
    };
    // console.log(req.body.token);
    // console.log(req.body.body);
    try {
        const response = await axios.post(
            API_MICROSOFT.new_Sale_Order,
            req.body.body,
            config
        );

        console.log('response', response);
        res.send(response.data)
        // if (response?.data?.value) {







        //     res.status(response.status).send(response.data.value);
        // } else throw ({
        //     response: {
        //         "message": "Server Error!",
        //         "name": "Error",
        //         "status": 500
        //     }
        // });

    } catch (error) {
        console.log("error", error);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else res.status(500).send({ error: error.message });
    }
});

// CREATE comments_micro
app.post(routeStrings.comments_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            API_MICROSOFT.comments_micro,
            req.body.body,
            config
        );

        // console.log(response.data);
        res.send(response.data)

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




// ------------------- Configurations----------------- //


// server configuration
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); })

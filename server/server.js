// require('dotenv').config()
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const querystring = require('querystring');
const { v4: uuidv4 } = require('uuid');
// import * as authorize from "authorizenet";
// const authorize = require('authorizenet');
const axios = require('axios');
const path = require("path");
const cors = require('cors');
const { SECRETS } = require('./environment/credentials');
const { API_FEDEXP, SERVERS, API_MICROSOFT, API_UPS, API_STAMPS } = require('./environment/APIs');
const app = express();
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;

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





// ---------------- Routes -------------- //
const routeStrings = {
    // tokens
    token_micro: '/token_microsoft',
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

    // authorise.net 
    auth_net_charge: "/charge_card",

    // microsoft
    sale_orders_micro: '/sales',
    history_micro: '/history',
    inventory_micro: '/inventory',
    new_order_micro: '/newOrder',
    csv_orders_micro: '/csv_orders',
    customers_micro: '/customers',
    ship_from_location_micro: '/shipfrom',
    create_shipment: '/createShipment',
    get_pick_details_micro: '/pickDetails',
    patch_pick_details_micro: '/patchDetails',
    request_pick_micro: '/requestPick',
    success_pick_detail_micro: '/successPick',
    picking_page_detail_micro: '/pickingPage',
    create_new_packing_micro: '/create-packing',
    register_new_packing_micro: '/register-picking',
    get_packing_micro: '/get-picking',
    post_packing_micro: '/post-picking',
    gets_lots_detail_micro: '/lots',
    post_wh_shipment_micro: '/post-shipment',
    post_wh_invoice_micro: '/post-invoice',

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
        if (error?.response?.status) res.send({ error: true, message: error.response.data.errors[0].message });
        else res.status(500).send({ error: error?.message });
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
        if (error?.status) res.send({ code: error.status, message: error?.message, error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message) || error?.response?.message),
            error: true
        });
        else res.send({ code: error.status, message: error?.message, error: true });
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
        if (error?.status) res.send({ code: error.status, message: error?.message, error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.errors[0]?.message) || (error?.response?.data?.response?.errors[0]?.message)),
            error: true
        });
        else res.send({ code: error.status, message: error?.message, error: true });
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
        // res.send(error)
        if (error?.status) res.send({ code: error.status, message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message)), error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.response?.errors[0]?.message) || (error?.response?.data?.errors[0]?.code) || error?.response?.message),
            error: true
        });
        else res.send({ code: error.status, message: error?.message, error: true });
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
        if (error?.response?.status) res.send({ error: true, message: error?.response?.data?.response?.errors[0]?.message });
        else res.status(500).send({ error: true, message: error?.message });
    }
});



// -----------------stamps Routes --------------------- //


app.get('/auth', async (req, res) => {
    try {
        const queryParams = querystring.stringify({
            response_type: 'code',
            client_id: SECRETS.CLIENT_ID_STAMPS,
            redirect_uri: SECRETS.REDIRECT_URI_STAMPS
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
            API_STAMPS.Validate_Address,
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
        if (error?.status) res.send({ code: error.status, message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message)), error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.message) || (error?.response?.data?.errors[0]?.code) || error?.response?.message),
            error: true
        });
        else res.send({ code: 'error.status', message: 'error?.message', error: true });
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
        const response = await axios.post(
            API_STAMPS.rate_list,
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
        const lineItems = req.body.body.package;
        for (let i = 0; i < lineItems.length; i++) {
            // const chunk = lineItems.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.package = lineItems[i];
            const response = await axios.post(
                API_STAMPS.Create_Shipment,
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
        res.send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// add funds to stamps
app.get("/funds_stamps", async (req, res) => {

    try {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlA3Z3pLRGdfRENlVzcyeXZ3cnpQcCJ9.eyJodHRwczovL3N0YW1wc2VuZGljaWEuY29tL2ludGVncmF0aW9uX2lkIjoiNzc4OTdmNDYtNjg2NS00NzQ1LTlkZjMtZDUzYjc4MTA4YjBjIiwiaHR0cHM6Ly9zdGFtcHNlbmRpY2lhLmNvbS91c2VyX2lkIjozNzI1Mzk5LCJpc3MiOiJodHRwczovL3NpZ25pbi50ZXN0aW5nLnN0YW1wc2VuZGljaWEuY29tLyIsInN1YiI6ImF1dGgwfDM3MjUzOTkiLCJhdWQiOiJodHRwczovL2FwaS5zdGFtcHNlbmRpY2lhLmNvbSIsImlhdCI6MTY4MTg0Mzg1NCwiZXhwIjoxNjgxODQ0NzU0LCJhenAiOiJteTc3OE44b0N3YUtxMGRTUFQxc29LWTk4MDdPcGljSyJ9.P_aK30O80t65epfIBVi86kb6aBl_sfpPqGaGC5RCLxMJ0bJ5E79jc_EoH0OO20jrXN3UqqMRjGMbzoEfCHWt9zLULzquEG3vw3ofixfsRANjfAG9W2PGQ5da6nS1nebraqTISqZK6GIdIO1i3QorUEQAe-pBURllzzRgAs_n6NKbd3kXw_ddvAsetZcpD0JZqMzvOboO-WW8hbO3ojlBpMWxccUhRFERfnR1RpsS57lg3_Ne7U7I_yC431eWG0q-XMCQMNbyOxzySdhMadhn7bkaemEP5mbHDjkbtvrFzPCEU_uk8XhJ5EFCeHx7bQ5taNpK54K8fFCYyDGDD09jgA"
        const response = await axios.post(
            "https://api.testing.stampsendicia.com/sera/v1/balance/add-funds",
            {
                "amount": 1000,
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



        res.status(200).send(response.data)

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});


app.get('/auth_stamps', async (req, res) => {
    try {
        // Step 1: Redirect the user to the Stamps.com authentication endpoint
        if (!req.query.code) {
            const queryParams = querystring.stringify({
                response_type: 'code',
                client_id: SECRETS.CLIENT_ID_STAMPS,
                redirect_uri: SECRETS.REDIRECT_URI_STAMPS,
            });
            const authorizationUrl = `${API_STAMPS.AUTH_ENDPOINT}?${queryParams}`;
            return res.redirect(authorizationUrl);
        }

        // Step 2: Handle the authorization code and exchange it for an access token
        const authorizationCode = req.query.code;
        const tokenRequest = {
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: SECRETS.REDIRECT_URI_STAMPS,
            client_id: SECRETS.CLIENT_ID_STAMPS,
            client_secret: SECRETS.CLIENT_SECRET_STAMPS,
        };

        const { data: tokenResponse } = await axios.post(API_STAMPS.TOKEN_ENDPOINT, querystring.stringify(tokenRequest), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const accessToken = tokenResponse?.access_token;
        res.send(accessToken);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting access token or making API request');
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
        if (error?.name) res.send({ message: error?.message, error: true });
        else res.send({ message: 'Request failed with status code 500', error: true });
    }

});






// -----------------Microsoft Routes --------------------- //

// ==========token============
app.post(routeStrings.token_micro, async (req, res) => {
    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const body = {
        grant_type: SECRETS.GRANT_TYPE_MICROSOFT,
        client_id: SECRETS.CLIENT_ID_MICROSOFT,
        scope: SECRETS.SCOPE_MICROSOFT,
        client_secret: SECRETS.CLIENT_SECRET_MICROSOFT
    };
    try {
        const response = await axios.post(
            SECRETS.AUTH_URL,
            new URLSearchParams(body).toString(),
            config
        );
        res.send({ success: true, token: response.data.access_token })
    } catch (error) {
        res.send({ error: true });
    }
});

// microsoft all sales orders
app.post(routeStrings.sale_orders_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            API_MICROSOFT.Sales_Orders,
            config
        );
        // data = response?.data?.value
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
        if (error?.status) res.status(error.status).send({ error: error?.message });
        else if (error?.response?.status) res.status(error?.response?.status).send({ error: error?.response?.message });
        else res.status(500).send({ error: error?.message });
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
        if (error?.status) res.status(error.status).send({ error: error?.message });
        else if (error?.response?.status) res.status(error?.response?.status).send({ error: error?.response?.message });
        else res.status(500).send({ error: error?.message });
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
        if (errorss?.response?.status) res.status(errorss.response.status).send({
            error: {
                message: errorss.response.data.error?.message,
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
    try {
        const response = await axios.get(
            API_MICROSOFT.Customer,
            config
        );
        if (response?.data?.value) {
            res.status(response.status).send(response.data.value);
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
        res.status(error?.response?.status).send({
            code: error?.response?.status,
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
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// create_shpment
app.post(routeStrings.create_shipment, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            API_MICROSOFT.create_WH_Shipment,
            req.body.body,
            config
        );
        res.send({ creation: response.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// get_pick_details
app.post(routeStrings.get_pick_details_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            API_MICROSOFT.get_pick_details(req.body.pickCode),
            config
        );
        res.send({ error: false, pickDetails: response.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// request_to_pick
app.post(routeStrings.request_pick_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            API_MICROSOFT.request_to_pick,
            req.body.body,
            config
        );
        res.send({ requested: response.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// success_pick_detail
app.post(routeStrings.success_pick_detail_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    try {
        const response = await axios.get(
            API_MICROSOFT.success_pick_detail(req.body.pickCode),
            config
        );
        res.send({ error: false, NOC: response.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});


// bin and inventory
app.post(routeStrings.picking_page_detail_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    const allPickingDetails = req.body.picks;
    const dataToSend = []
    const dataToSendRaw = []
    try {
        for (let index = 0; index < allPickingDetails.length; index++) {
            const item = allPickingDetails[index];
            const responseInventory = await axios.get(
                API_MICROSOFT.inventory_pick_detail(item.itemNo, item.locationCode),
                config
            );

            const responseBin = await axios.get(
                API_MICROSOFT.bin_pick_detail(item.itemNo, item.locationCode),
                config
            );

            dataToSendRaw.push({ inv: responseInventory?.data, bin: responseBin?.data })
            dataToSend.push({
                actionType: item.actionType,
                activityType: item.activityType,
                systemId: item.systemId,
                name: item.description,
                WhseDocumentNo: item.WhseDocumentNo,
                sourceNo: item.sourceNo,
                WHPickNo: item.no,
                destinationNo: item.destinationNo,
                WhseDocumentNo: item.WhseDocumentNo,
                ...responseInventory?.data?.value?.[0],
                ...responseBin?.data?.value?.[0],
            })

        }

        res.send({ error: false, data: dataToSend, dataToSendRaw });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// create_new_packing
app.post(routeStrings.create_new_packing_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            API_MICROSOFT.create_to_packing,
            req.body.body,
            config
        );
        res.send({ newPacking: response.data, body: req.body.body });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});


// get_packing_details
app.post(routeStrings.get_packing_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            API_MICROSOFT.packing_detail(req.body.code),
            config
        );
        res.send({ getPacking: response.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// register_new_packing_micro
app.post(routeStrings.register_new_packing_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    const body = {
        "WhsePickNo": req.body.pkCode
    }
    try {
        const registerPickResponse = await axios.post(
            API_MICROSOFT.register_pick,
            body,
            config
        );

        res.send({ error: false, registerDetail: registerPickResponse.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// get lots
app.post(routeStrings.gets_lots_detail_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    try {

        const responseInventory = await axios.get(
            API_MICROSOFT.inventory_pick_detail(req.body.item.no, req.body.item.locationCode),
            config
        );
        res.send({ error: false, lots: responseInventory?.data?.value });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// post_wh_shipment_micro
app.post(routeStrings.post_wh_shipment_micro, async (req, res) => {
    const config = { headers: { "Authorization": `Bearer ${req.body.token}`, } };
    try {
        const response = await axios.post(
            API_MICROSOFT.post_wh_shipment,
            req.body.body,
            config
        );
        res.send({ error: false, postShipment: response?.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});

// post_wh_INVOICE_micro
app.post(routeStrings.post_wh_invoice_micro, async (req, res) => {
    const config = { headers: { "Authorization": `Bearer ${req.body.token}`, } };
    try {
        const response = await axios.post(
            API_MICROSOFT.post_wh_invoice,
            req.body.body,
            config
        );
        res.send({ error: false, postInvoice: response?.data });

    } catch (error) {
        res.status(error?.response?.status).send({
            code: error?.response?.status,
            message: error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});


// get_pick_details
app.post(routeStrings.patch_pick_details_micro, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
            "Content-Type": "application/json",
            "If-Match": "*"
        }
    };
    try {
        const response = await axios.patch(
            API_MICROSOFT.patch_pick_details(req.body.sysID),
            req.body.body,
            config
        );
        res.send({ error: false, patchDetails: response.data, message: 'Successfully Patched' });

    } catch (error) {
        // console.log(error);
        // console.log(error?.response?.data?.error?.[0]?.message);
        res.send({
            code: error?.response?.status,
            message: error?.response?.data?.error?.message || error?.response?.data?.errors?.[0]?.error_message || error?.message,
            error: true
        })
    }
});


// ------------------- Authorise.net payment ----------------- //

app.post(routeStrings.auth_net_charge, async (req, res) => {
    // app.get("/ch", async (req, res) => {
    const { amount, cardNumber, expirationDate, cvv } = req.body;


    try {

        var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(SECRETS.AUTHORISE_NET_API_LOGIN_ID);
        merchantAuthenticationType.setTransactionKey(SECRETS.AUTHORISE_NET_TRANSACTION_KEY);

        var creditCard = new ApiContracts.CreditCardType();
        // creditCard.setCardNumber('5555555555554444');
        // creditCard.setExpirationDate('0824');
        // creditCard.setCardCode('999');

        creditCard.setCardNumber(cardNumber);
        creditCard.setExpirationDate(expirationDate);
        creditCard.setCardCode(cvv);


        var paymentType = new ApiContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        var orderDetails = new ApiContracts.OrderType();
        orderDetails.setInvoiceNumber('INV-12345');
        orderDetails.setDescription('Product Description');

        var tax = new ApiContracts.ExtendedAmountType();
        tax.setAmount('4.26');
        tax.setName('level2 tax name');
        tax.setDescription('level2 tax');

        var duty = new ApiContracts.ExtendedAmountType();
        duty.setAmount('8.55');
        duty.setName('duty name');
        duty.setDescription('duty description');

        var shipping = new ApiContracts.ExtendedAmountType();
        shipping.setAmount('8.55');
        shipping.setName('shipping name');
        shipping.setDescription('shipping description');

        var billTo = new ApiContracts.CustomerAddressType();
        billTo.setFirstName('Ellen');
        billTo.setLastName('Johnson');
        billTo.setCompany('Souveniropolis');
        billTo.setAddress('14 Main Street');
        billTo.setCity('Pecan Springs');
        billTo.setState('TX');
        billTo.setZip('44628');
        billTo.setCountry('USA');

        var shipTo = new ApiContracts.CustomerAddressType();
        shipTo.setFirstName('China');
        shipTo.setLastName('Bayles');
        shipTo.setCompany('Thyme for Tea');
        shipTo.setAddress('12 Main Street');
        shipTo.setCity('Pecan Springs');
        shipTo.setState('TX');
        shipTo.setZip('44628');
        shipTo.setCountry('USA');

        var lineItem_id1 = new ApiContracts.LineItemType();
        lineItem_id1.setItemId('1');
        lineItem_id1.setName('vase');
        lineItem_id1.setDescription('cannes logo');
        lineItem_id1.setQuantity('18');
        lineItem_id1.setUnitPrice(45.00);

        var lineItem_id2 = new ApiContracts.LineItemType();
        lineItem_id2.setItemId('2');
        lineItem_id2.setName('vase2');
        lineItem_id2.setDescription('cannes logo2');
        lineItem_id2.setQuantity('28');
        lineItem_id2.setUnitPrice('25.00');

        var lineItemList = [];
        lineItemList.push(lineItem_id1);
        lineItemList.push(lineItem_id2);

        var lineItems = new ApiContracts.ArrayOfLineItem();
        lineItems.setLineItem(lineItemList);

        var userField_a = new ApiContracts.UserField();
        userField_a.setName('A');
        userField_a.setValue('Aval');

        var userField_b = new ApiContracts.UserField();
        userField_b.setName('B');
        userField_b.setValue('Bval');

        var userFieldList = [];
        userFieldList.push(userField_a);
        userFieldList.push(userField_b);

        var userFields = new ApiContracts.TransactionRequestType.UserFields();
        userFields.setUserField(userFieldList);

        var transactionSetting1 = new ApiContracts.SettingType();
        transactionSetting1.setSettingName('duplicateWindow');
        transactionSetting1.setSettingValue('120');

        var transactionSetting2 = new ApiContracts.SettingType();
        transactionSetting2.setSettingName('recurringBilling');
        transactionSetting2.setSettingValue('false');

        var transactionSettingList = [];
        transactionSettingList.push(transactionSetting1);
        transactionSettingList.push(transactionSetting2);

        var transactionSettings = new ApiContracts.ArrayOfSetting();
        transactionSettings.setSetting(transactionSettingList);

        var transactionRequestType = new ApiContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setPayment(paymentType);
        // amount
        transactionRequestType.setAmount(amount);
        transactionRequestType.setLineItems(lineItems);
        transactionRequestType.setUserFields(userFields);
        transactionRequestType.setOrder(orderDetails);
        transactionRequestType.setTax(tax);
        transactionRequestType.setDuty(duty);
        transactionRequestType.setShipping(shipping);
        transactionRequestType.setBillTo(billTo);
        transactionRequestType.setShipTo(shipTo);
        transactionRequestType.setTransactionSettings(transactionSettings);

        var createRequest = new ApiContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(merchantAuthenticationType);
        createRequest.setTransactionRequest(transactionRequestType);

        //pretty print request

        var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
        //Defaults to sandbox
        //ctrl.setEnvironment(SDKConstants.endpoint.production);
        ctrl.execute(function () {
            var apiResponse = ctrl.getResponse();
            var response = new ApiContracts.CreateTransactionResponse(apiResponse);
            //pretty print response

            if (response != null) {
                if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                    if (response.getTransactionResponse().getMessages() != null) {
                        res.status(200).send({ success: true, response });
                    }
                    else {
                        if (response.getTransactionResponse().getErrors() != null) {
                            res.send(response.getTransactionResponse().getErrors());
                        }
                    }
                }
                else {
                    res.send({ success: false, response });
                    if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

                    }
                    else {
                    }
                }
            }
            else {
                res.send({ success: false, response });
            }

            // callback(response);
        });

    } catch (error) {
        res.status(500).json(error);
    }
});







// ------------------- Configurations----------------- //

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}
// server configuration
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); })

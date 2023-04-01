// require('dotenv').config()
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { Buffer } = require('buffer');
const PDFMerger = require('pdf-merger-js');
const querystring = require('querystring');
const { createCanvas, Image, loadImage } = require('canvas');

const cron = require('node-cron');
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
            SERVERS.FEDEXP_Production_Server + API_FEDEXP.Token,
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

    try {
        let images = [];
        const arr = req.body.body.requestedShipment.requestedPackageLineItems;

        for (let i = 0; i < arr.length; i += 4) {
            const chunk = arr.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.requestedShipment.requestedPackageLineItems = chunk
            const response = await axios.post(
                SERVERS.FEDEXP_Production_Server + API_FEDEXP.Create_Shipment,
                newBody,
                config
            );
            // console.log("resss", response);
            if (response?.data?.output?.transactionShipments[0]?.pieceResponses[0]?.packageDocuments[0]?.url) {
                const pdfUrls = ((response.data.output.transactionShipments[0].pieceResponses).map(item => {
                    return item.packageDocuments[0].url;
                }));
                images.push(...pdfUrls)
            }
        }

        const canvas = createCanvas(800, 1200);
        const ctx = canvas.getContext('2d');

        async function downloadAndDrawImage(url, x, y, width, height) {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const img = await loadImage(response.data);
            ctx.drawImage(img, x, y, width, height);
        }

        (async function main() {
            let x = 0;
            let y = 0;
            const width = canvas.width / images.length;
            const height = canvas.height;

            for (const url of images) {
                await downloadAndDrawImage(url, x, y, width, height);
                x += width;
            }

            const buffer = canvas.toBuffer('image/png');
            // fs.writeFileSync('merged-image.png', buffer);
            const filePath = path.join(__dirname, '/reports/fedexp/fedexp_labels_report.png');
            fs.writeFileSync(filePath, buffer);
        })();

        async function downloadAndConvert() {
            let arrayData = []
            for (let i = 0; i < images.length; i++) {
                const response = await axios.get(images[i], { responseType: 'arraybuffer' });
                const imageData = response.data;
                const fileName = `label${i + 1}.png`;
                fs.writeFileSync(fileName, imageData, 'binary');

                const img = await loadImage(fileName);
                const canvas = createCanvas(800, 1200);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 800, 1200);
                const base64DataSingle = canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
                // console.log(`Base64 data for label${i + 1}: ${base64Data}`);
                arrayData.push(base64DataSingle)
            }
            return arrayData
        };

        const images64 = await downloadAndConvert(images)
        res.status(200).send({
            filename: 'fedexp_labels_report.png',
            contentType: 'application/png',
            file: "http://localhost:8080/report_fedexp",
            data: images64,
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
            SERVERS.FEDEXP_Production_Server + API_FEDEXP.Validate_Address,
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

// preview file fedexp
app.get('/report_fedexp', (req, res) => {
    const filePath = path.join(__dirname, '/reports/fedexp/fedexp_labels_report.png');
    res.sendFile(filePath, {
        headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'inline; filename=fedexp_labels_report.png'
        }
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
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
    const serviceType = req.body.details

    let rates = [], rawData = [];
    try {
        for (let index = 0; index < 2; index++) {
            let newBody = { ...req.body.body }
            if (index === 0) {
                newBody.accountNumber.value = accountNumber;
            } else {
                newBody.accountNumber.value = accountNumber;
                newBody.requestedShipment.serviceType = serviceType.value
            }

            const response = await axios.post(
                SERVERS.FEDEXP_Production_Server + API_FEDEXP.rate_list,
                newBody,
                config
            );

            if (index === 0 && Array.isArray(response.data?.output?.rateReplyDetails)) {
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
            } else if (index === 1 && Array.isArray(response.data?.output?.rateReplyDetails)) {
                response.data?.output?.rateReplyDetails?.map(service => {
                    service.ratedShipmentDetails.map(item => {
                        if (item.rateType === "ACCOUNT") {
                            rawData.push({
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
            }
        }

        res.status(200).send({
            message: rawData,
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
        }


        const canvas = createCanvas(800, 1200);
        const ctx = canvas.getContext('2d');
        let yOffset = 0;

        for (let i = 0; i < images.length; i++) {
            const base64 = images[i];
            const image = await loadImage(Buffer.from(base64, 'base64'));
            const aspectRatio = image.width / image.height;
            const imageWidth = canvas.width;
            const imageHeight = imageWidth / aspectRatio;
            ctx.drawImage(image, 0, yOffset, imageWidth, imageHeight);
            yOffset += imageHeight;
        }

        // Save the canvas as a PNG image
        const outputPath = path.join(__dirname, '/reports/ups/UPS_labels_report.png');
        const out = fs.createWriteStream(outputPath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => {
            res.status(200).send({
                filename: 'UPS_labels_report.png',
                file: "http://localhost:8080/report_ups",
                data: images,
                error: false
            })
        });

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


// preview file link UPS
app.get('/report_ups', (req, res) => {
    const filePath = path.join(__dirname, '/reports/ups/UPS_labels_report.png');
    res.sendFile(filePath, {
        headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'inline; filename=UPS_labels_report.png'
        }
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// PRINTING labels ups
app.post('/printer', async (req, res) => {

    const arrayBase64 = req.body.printData
    try {

        for (let index = 0; index < arrayBase64.length; index++) {
            const base64 = arrayBase64[index];
            const formData = new FormData();
            formData.append('label', base64);
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
        account: {
            "RequestAction": "Rate",
            "RequestOption": "Rate"
        },
        ShipperNumber: "R006V5",
    }

    const bodyMaker = (indx) => {
        let newBody = { ...body }
        if (indx === 0) {
            newBody.RateRequest.Request = request.shop;
            return newBody
        } else {
            newBody.RateRequest.Request = request.account;
            newBody.RateRequest.Shipment.Shipper.ShipperNumber = request.ShipperNumber;
            return newBody
        }
    }



    const shopRates = [];
    let accountService = {}
    try {

        for (let index = 0; index < 2; index++) {

            const response = await axios.post(
                SERVERS.UPS_Production_Server + API_UPS.rate_list,
                bodyMaker(index),
                config
            );
            if (response?.status === 200 && index === 1 && !(Array.isArray(response.data?.RateResponse?.RatedShipment))) {
                const singleService = {
                    serviceName: getServiceName(response.data.RateResponse.RatedShipment.Service.Code),
                    days: getServiceDays(response.data.RateResponse.RatedShipment.Service.Code),
                    currency: response.data.RateResponse.RatedShipment.TotalCharges.CurrencyCode,
                    rate: response.data.RateResponse.RatedShipment.TotalCharges.MonetaryValue,
                    netWeight: response.data.RateResponse.RatedShipment.BillingWeight.Weight,
                    unit: response.data.RateResponse.RatedShipment.BillingWeight.UnitOfMeasurement.Code,
                }
                accountService = singleService
            } else if ("Fault" in response.data) {
                throw {
                    response: {
                        "message": response?.data?.detail?.Errors?.ErrorDetail?.PrimaryErrorCode?.Description,
                        "name": response?.data?.detail?.Errors?.ErrorDetail?.PrimaryErrorCode?.Code,
                        "status": 500
                    }
                }
            } else if (response?.status === 200 && index === 0 && (Array.isArray(response.data?.RateResponse?.RatedShipment))) {
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
        }

        res.status(200).send({
            message: [accountService],
            allServices: shopRates,
            error: false,
        });

    } catch (error) {
        if (error?.response?.status) res.send({ error: true, message: error?.response?.data?.response?.errors[0]?.message });
        else res.status(500).send({ error: true, message: error.message });
    }
});

// -----------------stamps Routes --------------------- //

// Stamps-Token
app.get(routeStrings.token_stamps, async (req, res) => {


    try {
        const STAMPS_API_BASE_URL = 'https://api.stamps.com';
        const stampsIntegrationId = "fcaa4f74-9bc2-4506-9420-8ebb99b524f1";
        const stampsUsername = "SilkCraft-001";
        const stampsPassword = "October2020!";

        router.get('/example', async (req, res) => {
            // Step 1: Redirect the user to the Stamps.com authentication endpoint
            if (!req.query.code) {
                const queryParams = querystring.stringify({
                    response_type: 'code',
                    client_id: stampsIntegrationId,
                    redirect_uri: 'http://localhost:8080/example', // replace with your redirect URI
                });
                const authorizationUrl = `https://signin.stamps.com/authorize?${queryParams}`;
                return res.redirect(authorizationUrl);
            }

            // Step 2: Handle the authorization code and exchange it for an access token
            const authorizationCode = req.query.code;
            try {
                const tokenResponse = await axios.post(`${STAMPS_API_BASE_URL}/oauth2/v1/token`, {
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                    redirect_uri: 'http://localhost:8080/example', // replace with your redirect URI
                    client_id: stampsIntegrationId,
                    client_secret: YOUR_STAMPS_INTEGRATION_SECRET,
                });

                const accessToken = tokenResponse.data.access_token;

                // Step 3: Make the API request with the access token
                const apiResponse = await axios.get(`${STAMPS_API_BASE_URL}/v1/addresses`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                res.send(apiResponse.data);
            } catch (error) {
                console.error(error);
                res.status(500).send('Error getting access token or making API request');
            }
        });


    } catch (error) {
        console.log("errorCatch", error);
        if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else res.status(500).send({ error: error.message });
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
            SERVERS.STAMPS_Sandbox_Server + API_STAMPS.Validate_Address,
            req.body.body,
            config
        );
        if (response?.status === 200 && (response.data.output.resolvedAddresses[0].attributes.DPV || response.data.output.resolvedAddresses[0].attributes.Matched || response.data.output.resolvedAddresses[0].attributes.Resolved)) {
            res.status(response.status).send({
                message: response.data.output.resolvedAddresses[0].attributes.Resolved,
                error: false
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
    console.log(req.body.body);
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

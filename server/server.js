// require('dotenv').config()
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');
const PDFMerger = require('pdf-merger-js');

const cron = require('node-cron');
const axios = require('axios');
const path = require("path");
const cors = require('cors');
const { SECRETS } = require('./environment/credentials');
const { API_FEDEXP, SERVERS, API_MICROSOFT, API_UPS } = require('./environment/APIs');
const app = express();

// useage
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.static("./build"));
app.use(express.static("./uploads"));
app.use(express.urlencoded({ limit: '200mb', extended: true }));



// ---------------- MiddleWares -------------- //

// ---------------- Routes -------------- //
const routeStrings = {
    // tokens
    token_fed: '/fedexp_token',

    // fedexp
    shipment_fedexp: '/shipment',
    address_validate_fedexp: '/address_validate_fedexp',
    rate_list_fedexp: '/rate_list_fedexp',

    // UPS
    shipment_ups: '/ups_shipment',
    address_validate_ups: '/address_validate_ups',
    rate_list_ups: '/rate_list_ups',

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
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
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
        const arr = req.body.body.requestedShipment.requestedPackageLineItems;
        const allPDFs = [];

        for (let i = 0; i < arr.length; i += 4) {
            const chunk = arr.slice(i, i + 4);
            let newBody = { ...req.body.body }
            newBody.requestedShipment.requestedPackageLineItems = chunk
            const response = await axios.post(
                SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.Create_Shipment,
                newBody,
                config
            );

            if (response?.data?.output?.transactionShipments[0]?.pieceResponses[0]?.packageDocuments[0]?.url) {
                const pdfUrls = ((response.data.output.transactionShipments[0].pieceResponses).map(item => {
                    return item.packageDocuments[0].url;
                }));
                allPDFs.push(...pdfUrls)
            }
        }


        // Create a single PDFMerger instance and reuse it for each PDF
        const merger = new PDFMerger();
        for (const pdfUrl of allPDFs) {
            const { data } = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            await merger.add(data);
        }
        const mergedPdf = await merger.saveAsBuffer();
        const filePath = path.join(__dirname, '/reports/fedexp/fedexp_labels_report.pdf');
        fs.writeFileSync(filePath, mergedPdf);

        res.status(200).send({
            filename: 'fedexp_labels_report.pdf',
            contentType: 'application/pdf',
            file: "http://localhost:8080/report_fedexp"
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

        if (
            response?.status === 200 &&
            (
                response.data.output.resolvedAddresses[0].attributes.DPV ||
                response.data.output.resolvedAddresses[0].attributes.Matched ||
                response.data.output.resolvedAddresses[0].attributes.Resolved
            )
        ) {

            res.status(response.status).send({
                message: response.data.output.resolvedAddresses[0].attributes.Resolved,
                error: false
            });
        }
        else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {
        // console.log(error.response.data);
        if (error?.status) res.send({ code: error.status, message: error.message, error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message)),
            error: true
        });
        else if (error?.arg1?.response?.status) res.send({ code: error.arg1?.response?.status, message: error.arg1.response.data, error: true });
        else res.send({ code: error.status, message: error.message, error: true });
    }
});

// preview file fedexp
app.get('/report_fedexp', (req, res) => {
    const filePath = path.join(__dirname, '/reports/fedexp/fedexp_labels_report.pdf');
    res.sendFile(filePath, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=fedexp_labels_report.pdf'
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
    const rawData = [];

    try {
        const lineItems = req.body.body.requestedShipment.requestedPackageLineItems;
        for (let i = 0; i < lineItems.length; i += 7) {
            const chunk = lineItems.slice(i, i + 7);
            let newBody = { ...req.body.body }
            newBody.requestedShipment.requestedPackageLineItems = chunk;
            const response = await axios.post(
                SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.rate_list,
                newBody,
                config
            );
            if (response?.status === 200 && (response?.data?.output?.quoteDate)) {
                if (Array.isArray(response.data.output.rateReplyDetails[0].ratedShipmentDetails[0].ratedPackages)) {
                    const data = response.data.output.rateReplyDetails[0].ratedShipmentDetails[0].ratedPackages
                    rawData.push(...data)
                } else if ("totalNetCharge" in (response.data.output.rateReplyDetails[0].ratedShipmentDetails[0])) {
                    const data = response.data.output.rateReplyDetails[0].ratedShipmentDetails[0]
                    rawData.push(data)
                }
                else {
                    const data = response.data.output.rateReplyDetails[0].ratedShipmentDetails[0].ratedPackages
                    rawData.push(data)
                }
            }
        }

        const rates = rawData.map(ratedPackage => {
            return {
                serviceName: req.body.body.requestedShipment.serviceType,
                currency: ratedPackage.currency,
                rate: "totalNetCharge" in ratedPackage ? ratedPackage.totalNetCharge : ratedPackage.packageRateDetail.netCharge,
                netWeight: ratedPackage.shipmentRateDetail?.totalBillingWeight?.value,
                unit: ratedPackage.shipmentRateDetail?.totalBillingWeight?.units,
            }
        });

        res.status(200).send({
            message: rates,
            responded: rawData,
            error: false
        });

    } catch (error) {
        // console.log(error);
        if (error?.status) res.send({ code: error.status, message: error.message, error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.errors[0]?.message) || (error?.response?.data?.response?.errors[0]?.message)),
            error: true
        });
        else if (error?.arg1?.response?.status) res.send({ code: error.arg1?.response?.status, message: error.arg1.response.data, error: true });
        else res.send({ code: error.status, message: error.message, error: true });
    }
});














// ---------------------- UPS Routes ------------------- //

// UPS shipment order
app.post(routeStrings.shipment_ups, async (req, res) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AccessLicenseNumber': '4D849373AACE547D',
            'Username': 'parveendhawan',
            'Password': 'praveen#123'
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
                SERVERS.UPS_Sandbox_Server + API_UPS.Create_Shipment,
                newBody,
                config
            );

            if (response?.data?.ShipmentResponse?.ShipmentResults?.PackageResults) {
                if (Array.isArray(response.data.ShipmentResponse.ShipmentResults.PackageResults)) {
                    const new_images = (response.data.ShipmentResponse.ShipmentResults.PackageResults).map((item) => item.ShippingLabel.GraphicImage)
                    images.push(...new_images)
                } else {
                    const new_images = [response.data.ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage]
                    images.push(new_images)
                }
            }
        }


        const doc = new PDFDocument();
        images.forEach((base64, index) => {
            const buffer = Buffer.from(base64, 'base64');
            doc.image(buffer, {
                fit: [500, 500],
                align: 'center',
                valign: 'center',
            })

            if (index < images.length - 1) {
                doc.addPage();
            }
        });
        const outputPath = path.join(__dirname, '/reports/ups/UPS_labels_report.pdf');

        doc.pipe(fs.createWriteStream(outputPath));
        doc.end();

        fs.readFile(outputPath, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const base64 = Buffer.from(data).toString('base64');
            const pdf = {
                filename: 'UPS_labels_report.pdf',
                contentType: 'application/pdf',
                file: "http://localhost:8080/report_ups"
            };

            res.status(200).send(pdf)
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
            'Username': 'parveendhawan',
            'Password': 'praveen#123',
            'AccessLicenseNumber': '4D849373AACE547D',
        }
    };

    const payload = {
        "UPSSecurity": {
            "UsernameToken": {
                'Username': 'parveendhawan',
                'Password': 'praveen#123'
            },
            "ServiceAccessToken": {
                'AccessLicenseNumber': '4D849373AACE547D',
            }
        },
        "XAVRequest": req.body.body
    };
    try {
        const response = await axios.post(
            SERVERS.UPS_Sandbox_Server + API_UPS.Validate_Address,
            payload,
            config
        );
        if (
            response?.status === 200 &&
            (response?.data?.XAVResponse?.Response?.ResponseStatus?.Description === "Success")
        ) {

            res.status(response.status).send({
                message: true,
                error: false
            });
        }
        else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {

        // console.log(error.response.data);
        // res.send(error)
        if (error?.status) res.send({ code: error.status, message: ((error?.response?.data?.errors[0]?.code) || (error?.response?.data?.response?.errors[0]?.message)), error: true });
        else if (error?.response?.status) res.send({
            code: error.response?.status,
            message: ((error?.response?.data?.response?.errors[0]?.message) || (error?.response?.data?.errors[0]?.code)),
            error: true
        });
        else if (error?.arg1?.response?.status) res.send({ code: error.arg1?.response?.status, message: error.arg1.response.data.response.errors[0].message, error: true });
        else res.send({ code: error.status, message: error.message, error: true });
    }
});


// preview file link UPS
app.get('/report_ups', (req, res) => {
    const filePath = path.join(__dirname, '/reports/ups/UPS_labels_report.pdf');
    res.sendFile(filePath, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=UPS_labels_report.pdf'
        }
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// UPS rate list
app.post(routeStrings.rate_list_ups, async (req, res) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'AccessLicenseNumber': '4D849373AACE547D',
            'Username': 'parveendhawan',
            'Password': 'praveen#123',
        }
    };

    const body = {
        "UPSSecurity": {
            "UsernameToken": {
                'Username': 'parveendhawan',
                'Password': 'praveen#123'
            },
            "ServiceAccessToken": {
                'AccessLicenseNumber': '4D849373AACE547D',
            }
        },
        "RateRequest": req.body.body
    };
    const rawData = [];
    try {

        const lineItems = req.body.body.Shipment.Package;
        for (let i = 0; i < lineItems.length; i += 7) {
            const chunk = lineItems.slice(i, i + 7);
            let newBody = { ...body }
            newBody.RateRequest.Shipment.Package = chunk;
            const response = await axios.post(
                "https://onlinetools.ups.com/rest/Rate",
                body,
                config
            );


            if (response?.status === 200 && (response?.data?.RateResponse?.RatedShipment?.RatedPackage)) {
                if (Array.isArray(response?.data?.RateResponse?.RatedShipment?.RatedPackage)) {
                    const new_rawData = response?.data?.RateResponse?.RatedShipment?.RatedPackage
                    rawData.push(...new_rawData)
                } else {
                    const new_rawData = [response?.data?.RateResponse?.RatedShipment?.RatedPackage]
                    rawData.push(new_rawData)
                }

            }
        }

        const rates = rawData.reduce((accumulator, currentItem) => {
            return {
                serviceName: req.body.body.Shipment.Service.Code,
                currency: currentItem.ServiceOptionsCharges.CurrencyCode,
                rate: accumulator.rate + Number(currentItem.TotalCharges.MonetaryValue),

                netWeight: accumulator.netWeight + Number(currentItem.BillingWeight.Weight),
                unit: currentItem.BillingWeight.UnitOfMeasurement.Code,
            };
        }, { rate: 0, netWeight: 0 });


        res.status(200).send({
            message: [rates],
            error: false
        });

    } catch (error) {
        console.log(error);
        if (error?.status) res.send({ error: error.message });
        else if (error?.response?.status) res.send({ error: error.response.data.response.errors[0].message });
        else if (error?.arg1?.response?.status) res.send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
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
        // console.log("error", error.response.data);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
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
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
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

        // console.log(response.data);
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
        // console.log("error", error.response);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
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

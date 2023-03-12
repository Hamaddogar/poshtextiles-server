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
let cache = {};


// cacheHandler
const cacheHandler = async (req, res, next) => {
    const key = req.originalUrl
    if (cache[key]) res.send(cache[key]);
    else next();
};
// ---------------- Routes -------------- //
const routeStrings = {
    // tokens
    token_fed: '/fedexp_token',
    token_micro: '/token_microsoft',

    // fedexp
    shipment_fedexp: '/shipment',
    address_validate_fedexp: '/address_validate_fedexp',

    // UPS
    shipment_ups: '/ups_shipment',
    address_validate_ups: '/address_validate_ups',

    // microsoft
    sale_orders_micro: '/sales',
    history_micro: '/history',

    // HTTP routes
    hello: '/',

    // Socket.io route
    socket: '/socket'
}

// ---------------- Routes -------------- //
// ---------------- FedExp Routes -------------- //

// FedExp-Token
app.get(routeStrings.token_fed, cacheHandler, async (req, res) => {
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
            cache[routeStrings.token_fed] = response.data.access_token
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

// FedExp shipment order
app.post(routeStrings.shipment_fedexp, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.Create_Shipment,
            req.body.body,
            config
        );

        if (response?.data?.output?.transactionShipments[0]?.pieceResponses[0]?.packageDocuments[0]?.url) {

            const pdfUrls = ((response.data.output.transactionShipments[0].pieceResponses).map(item => {
                return item.packageDocuments[0].url;
            }));

            async function mergePdfs(pdfUrls) {
                const merger = new PDFMerger();

                for (const pdfUrl of pdfUrls) {
                    const { data } = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
                    await merger.add(data);
                }

                const mergedPdf = await merger.saveAsBuffer();
                const filePath = path.join(__dirname, '/reports/fedexp/fedexp_labels_report.pdf');
                fs.writeFileSync(filePath, mergedPdf);

                return filePath;
            }

            mergePdfs(pdfUrls).then(respp => {
                const pdf = {
                    filename: 'fedexp_labels_report.pdf',
                    contentType: 'application/pdf',
                    file: "http://localhost:8080/report_fedexp"
                };

                res.status(200).send(pdf)
            })

        }
        else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
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
                response.data.output.resolvedAddresses[0].attributes.DPV &&
                response.data.output.resolvedAddresses[0].attributes.Matched &&
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
        console.log(error.response.data);
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

    try {

        const response = await axios.post(
            SERVERS.UPS_Sandbox_Server + API_UPS.Create_Shipment,
            req.body.body,
            config
        );
        if (response?.data?.ShipmentResponse?.ShipmentResults?.PackageResults) {
            let images = [];
            if (Array.isArray(response.data.ShipmentResponse.ShipmentResults.PackageResults)) {
                images = (response.data.ShipmentResponse.ShipmentResults.PackageResults).map((item) => item.ShippingLabel.GraphicImage)
            } else {
                images = [response.data.ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage]
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
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.data.response.errors[0].message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
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

        console.log(error.response.data);
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






// -----------------Microsoft Routes --------------------- //



// microsoft token
app.get(routeStrings.token_micro, cacheHandler, async (req, res) => {

    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const body = {
        grant_type: SECRETS.GRANT_TYPE_MICROSOFT,
        client_id: SECRETS.CLIENT_ID_MICROSOFT,
        client_secret: SECRETS.CLIENT_SECRET_MICROSOFT,
        scope: SECRETS.SCOPE_MICROSOFT
    };

    try {
        const response = await axios.post(
            API_MICROSOFT.Token,
            new URLSearchParams(body).toString(),
            config
        );
        if (response?.data?.access_token) {
            cache[routeStrings.token_micro] = response.data.access_token
            res.status(response.status).send(response.data.access_token);
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
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
    }
});

app.post(routeStrings.token_micro, async (req, res) => {

    try {
        if (req.body.token) {
            cache[routeStrings.token_micro] = req.body.token
            res.status(200).send({
                error:false,
                message: cache[routeStrings.token_micro],
                code : 200
            });
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
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
    }
});

// microsoft all sales orders
app.post(routeStrings.sale_orders_micro, cacheHandler, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    // console.log( `Bearer ${req.body.token}`);
    try {
        const response = await axios.get(
            SERVERS.MICROSOFT_Sandbox_Server + API_MICROSOFT.Sales_Orders,
            config
        );
        if (response?.data?.value) {
            // cache[routeStrings.sale_orders_micro] = response.data.value;
            res.status(response.status).send(response.data.value);
        } else throw ({
            response: {
                "message": "Server Error!",
                "name": "Error",
                "status": 500
            }
        });

    } catch (error) {
        console.log("error", error.response.data);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
    }
});







// ------------------- Configurations----------------- //
app.get("/setter", async (req, res) => {
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

        if (response?.data?.access_token) cache[routeStrings.token_fed] = response.data.access_token


    } catch (error) {
        console.error(error);
    }
});

// Set up a cron job to run the route every day at 9:00 AM

cron.schedule('*/50 * * * *', () => {
    axios.get('http://localhost:8080/setter');
});







// server configuration
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); })

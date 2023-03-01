// require('dotenv').config()
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');
const { promisify } = require('util');
const { pipeline } = require('stream');
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
let cache = {
    '/token_microsoft': "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYThmMWE1ZjktZjhiOC00MDBjLTg3YTEtYTcwNGJlMmQ3ZGMyLyIsImlhdCI6MTY3NzY0MjM0NCwibmJmIjoxNjc3NjQyMzQ0LCJleHAiOjE2Nzc2NDYyNDQsImFpbyI6IkUyWmdZT0Q5ZGtlMklIQUNlMnAxV1h3czE5Y1hBQT09IiwiYXBwaWQiOiJkYThkYzUzNC1lNjQyLTQ2ZTItOGYyOC01N2JjNzFkODU0YzAiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hOGYxYTVmOS1mOGI4LTQwMGMtODdhMS1hNzA0YmUyZDdkYzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJiMDZjMTliOC01YTAzLTQ0MjQtYWNjMy04OThhODQwYWMwMWYiLCJyaCI6IjAuQVZvQS1hWHhxTGo0REVDSG9hY0V2aTE5d2ozdmJabHNzMU5CaGdlbV9Ud0J1SjlhQUFBLiIsInJvbGVzIjpbIkFQSS5SZWFkV3JpdGUuQWxsIl0sInN1YiI6ImIwNmMxOWI4LTVhMDMtNDQyNC1hY2MzLTg5OGE4NDBhYzAxZiIsInRpZCI6ImE4ZjFhNWY5LWY4YjgtNDAwYy04N2ExLWE3MDRiZTJkN2RjMiIsInV0aSI6IjRvNzAzV2x5MjBXVFNwaDlGOE1ZQUEiLCJ2ZXIiOiIxLjAifQ.FGTEb-dtwYVtR1HyZ1diJOH8EQM_crMgvkSidVKlXdqlK8NU080hLXSNmjWAZTHFwX6RjWFVsobPME5vg13Qpzdptlo8upJOZsnVSguFQEvtwcL_33SRT4vE6grfa7q8TRgaPrqpRZwU8it23hjP8p5-x6ZCg1L_EKyd4YQ9gJc-GaL_73E4Yj3QfO3Wi_FTXcVaQFI1UgEsZM_97zE1SNV1KHCJict6zx5ALNS440vWBqGgDKC8kAnx2y_Ts1jvs8J8V4QpyK7pQFCRIRWgs1KP_t-LnieXuVCVTUHEVbpj4-Ywc9mFJ2hWOrswoIY5akBeJd7D0qterOpO8MeX2Q"
};


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

    // UPS
    shipment_ups: '/ups_shipment',

    // microsoft
    sale_orders_micro: '/sales',
    history_micro: '/history',
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
        // console.log(response, 'fmm');

        if (response?.data?.output?.transactionShipments[0]?.pieceResponses[0]?.packageDocuments[0]?.url) {

            // const links = ((response.data.output.transactionShipments[0].pieceResponses).map(item => {
            //     return item.packageDocuments[0].url;
            // }))

            // const pdfs = [];

            // // Create an array of PDF buffers from the links
            // Promise.all(links.map(link => new Promise((resolve, reject) => {
            //     axios({ url: link, encoding: null }, (error, response, body) => {
            //         if (error) {
            //             reject(error);
            //         } else if (response.statusCode !== 200) {
            //             reject(`HTTP status ${response.statusCode}`);
            //         } else {
            //             resolve(body);
            //         }
            //     });
            // })))
            //     .then(bodies => {
            //         // Combine the PDF buffers into a single PDF
            //         const doc = new PDFDocument();
            //         const stream = doc.pipe(fs.createWriteStream(path.join(__dirname, 'pdfs', 'fedexp_report.pdf')));
            //         bodies.forEach(body => {
            //             const pdf = new PDFDocument({ autoFirstPage: false });
            //             pdf.pipe(stream);
            //             pdf.load(body);
            //             pdf.end();
            //         });
            //         doc.end();
            //         // When the PDF has been saved, send it as a response to the frontend
            //         stream.on('finish', () => {
            //             const filePath = path.join(__dirname, 'pdfs', 'fedexp_report.pdf');
            //             const fileStream = fs.createReadStream(filePath);
            //             fileStream.pipe(res);
            //         });
            //     })
            //     .catch(error => {
            //         console.error(error);
            //         res.status(500).send('Error combining PDFs');
            //     });











































            res.status(response.status).send({ file: response.data.output.transactionShipments[0].pieceResponses[0].packageDocuments[0].url })
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
            const outputPath = path.join(__dirname, '/reports/report.pdf');

            doc.pipe(fs.createWriteStream(outputPath));
            doc.end();

            fs.readFile(outputPath, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const base64 = Buffer.from(data).toString('base64');
                const pdf = {
                    filename: 'report.pdf',
                    contentType: 'application/pdf',
                    file: "http://localhost:8080/report_ups"
                };

                res.send(pdf)
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

// 
// Serve the PDF file at '/download'
app.get('/report_ups', (req, res) => {
    const file = path.join(__dirname, '/reports/report.pdf');
    res.download(file)
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

// microsoft all sales orders
app.post(routeStrings.sale_orders_micro, cacheHandler, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            SERVERS.MICROSOFT_Sandbox_Server + API_MICROSOFT.Sales_Orders,
            config
        );
        if (response?.data?.value) {
            cache[routeStrings.sale_orders_micro] = response.data.value;
            res.status(response.status).send(response.data.value);
        } else throw ({
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
app.listen(PORT, () => { console.log('server is running'); })

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


// FedExp rate_list 
app.post(routeStrings.rate_list_fedexp, async (req, res) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${req.body.token}`,
        }
    };

    const body = {
        "accountNumber": {
            "value": "Your account number"
        },
        "rateRequestControlParameters": {
            "returnTransitTimes": false,
            "servicesNeededOnRateFailure": true,
            "variableOptions": "FREIGHT_GUARANTEE",
            "rateSortOrder": "SERVICENAMETRADITIONAL"
        },
        "requestedShipment": {
            "shipper": {
                "address": {
                    "streetLines": [
                        "1550 Union Blvd",
                        "Suite 302"
                    ],
                    "city": "Beverly Hills",
                    "stateOrProvinceCode": "TN",
                    "postalCode": "65247",
                    "countryCode": "US",
                    "residential": false
                }
            },
            "recipient": {
                "address": {
                    "streetLines": [
                        "1550 Union Blvd",
                        "Suite 302"
                    ],
                    "city": "Beverly Hills",
                    "stateOrProvinceCode": "TN",
                    "postalCode": "65247",
                    "countryCode": "US",
                    "residential": false
                }
            },
            "serviceType": "STANDARD_OVERNIGHT",
            "emailNotificationDetail": {
                "recipients": [
                    {
                        "emailAddress": "string",
                        "notificationEventType": [
                            "ON_DELIVERY"
                        ],
                        "smsDetail": {
                            "phoneNumber": "string",
                            "phoneNumberCountryCode": "string"
                        },
                        "notificationFormatType": "HTML",
                        "emailNotificationRecipientType": "BROKER",
                        "notificationType": "EMAIL",
                        "locale": "string"
                    }
                ],
                "personalMessage": "string",
                "PrintedReference": {
                    "printedReferenceType": "BILL_OF_LADING",
                    "value": "string"
                }
            },
            "preferredCurrency": "USD",
            "rateRequestType": [
                "ACCOUNT",
                "LIST"
            ],
            "shipDateStamp": "2015-03-25T09:30:00",
            "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
            "requestedPackageLineItems": [
                {
                    "subPackagingType": "BAG",
                    "groupPackageCount": 1,
                    "contentRecord": [
                        {
                            "itemNumber": "string",
                            "receivedQuantity": 0,
                            "description": "string",
                            "partNumber": "string"
                        }
                    ],
                    "declaredValue": {
                        "amount": "100",
                        "currency": "USD"
                    },
                    "weight": {
                        "units": "LB",
                        "value": 22
                    },
                    "dimensions": {
                        "length": 10,
                        "width": 8,
                        "height": 2,
                        "units": "IN"
                    },
                    "variableHandlingChargeDetail": {
                        "rateType": "ACCOUNT",
                        "percentValue": 0,
                        "rateLevelType": "BUNDLED_RATE",
                        "fixedValue": {
                            "amount": "100",
                            "currency": "USD"
                        },
                        "rateElementBasis": "NET_CHARGE"
                    },
                    "packageSpecialServices": {
                        "specialServiceTypes": [
                            "DANGEROUS_GOODS"
                        ],
                        "signatureOptionType": [
                            "NO_SIGNATURE_REQUIRED"
                        ],
                        "alcoholDetail": {
                            "alcoholRecipientType": "LICENSEE",
                            "shipperAgreementType": "Retailer"
                        },
                        "dangerousGoodsDetail": {
                            "offeror": "Offeror Name",
                            "accessibility": "ACCESSIBLE",
                            "emergencyContactNumber": "3268545905",
                            "options": [
                                "BATTERY"
                            ],
                            "containers": [
                                {
                                    "offeror": "Offeror Name",
                                    "hazardousCommodities": [
                                        {
                                            "quantity": {
                                                "quantityType": "GROSS",
                                                "amount": 0,
                                                "units": "LB"
                                            },
                                            "innerReceptacles": [
                                                {
                                                    "quantity": {
                                                        "quantityType": "GROSS",
                                                        "amount": 0,
                                                        "units": "LB"
                                                    }
                                                }
                                            ],
                                            "options": {
                                                "labelTextOption": "Override",
                                                "customerSuppliedLabelText": "LabelText"
                                            },
                                            "description": {
                                                "sequenceNumber": 0,
                                                "processingOptions": [
                                                    "INCLUDE_SPECIAL_PROVISIONS"
                                                ],
                                                "subsidiaryClasses": "subsidiaryClass",
                                                "labelText": "labelText",
                                                "technicalName": "technicalName",
                                                "packingDetails": {
                                                    "packingInstructions": "instruction",
                                                    "cargoAircraftOnly": false
                                                },
                                                "authorization": "Authorization Information",
                                                "reportableQuantity": false,
                                                "percentage": 10,
                                                "id": "ID",
                                                "packingGroup": "DEFAULT",
                                                "properShippingName": "ShippingName",
                                                "hazardClass": "hazardClass"
                                            }
                                        }
                                    ],
                                    "numberOfContainers": 10,
                                    "containerType": "Copper Box",
                                    "emergencyContactNumber": {
                                        "areaCode": "202",
                                        "extension": "3245",
                                        "countryCode": "US",
                                        "personalIdentificationNumber": "9545678",
                                        "localNumber": "23456"
                                    },
                                    "packaging": {
                                        "count": 20,
                                        "units": "Liter"
                                    },
                                    "packingType": "ALL_PACKED_IN_ONE",
                                    "radioactiveContainerClass": "EXCEPTED_PACKAGE"
                                }
                            ],
                            "packaging": {
                                "count": 20,
                                "units": "Liter"
                            }
                        },
                        "packageCODDetail": {
                            "codCollectionAmount": {
                                "amount": 12.45,
                                "currency": "USD"
                            },
                            "codCollectionType": "ANY"
                        },
                        "pieceCountVerificationBoxCount": 0,
                        "batteryDetails": [
                            {
                                "material": "LITHIUM_METAL",
                                "regulatorySubType": "IATA_SECTION_II",
                                "packing": "CONTAINED_IN_EQUIPMENT"
                            }
                        ],
                        "dryIceWeight": {
                            "units": "LB",
                            "value": 10
                        }
                    }
                }
            ],
            "documentShipment": false,
            "variableHandlingChargeDetail": {
                "rateType": "ACCOUNT",
                "percentValue": 0,
                "rateLevelType": "BUNDLED_RATE",
                "fixedValue": {
                    "amount": "100",
                    "currency": "USD"
                },
                "rateElementBasis": "NET_CHARGE"
            },
            "packagingType": "YOUR_PACKAGING",
            "totalPackageCount": 3,
            "totalWeight": 87.5,
            "shipmentSpecialServices": {
                "returnShipmentDetail": {
                    "returnType": "PRINT_RETURN_LABEL"
                },
                "deliveryOnInvoiceAcceptanceDetail": {
                    "recipient": {
                        "accountNumber": {
                            "value": 123456789
                        },
                        "address": {
                            "streetLines": [
                                "10 FedEx Parkway",
                                "Suite 30"
                            ],
                            "countryCode": "US"
                        },
                        "contact": {
                            "companyName": "FedEx",
                            "faxNumber": "9013577890",
                            "personName": "John Taylor",
                            "phoneNumber": "9013577890"
                        }
                    }
                },
                "internationalTrafficInArmsRegulationsDetail": {
                    "licenseOrExemptionNumber": "432345"
                },
                "pendingShipmentDetail": {
                    "pendingShipmentType": "EMAIL",
                    "processingOptions": {
                        "options": [
                            "ALLOW_MODIFICATIONS"
                        ]
                    },
                    "recommendedDocumentSpecification": {
                        "types": [
                            "ANTIQUE_STATEMENT_EUROPEAN_UNION"
                        ]
                    },
                    "emailLabelDetail": {
                        "recipients": [
                            {
                                "emailAddress": "string",
                                "optionsRequested": {
                                    "options": [
                                        "PRODUCE_PAPERLESS_SHIPPING_FORMAT"
                                    ]
                                },
                                "role": "SHIPMENT_COMPLETOR",
                                "locale": {
                                    "country": "string",
                                    "language": "string"
                                }
                            }
                        ],
                        "message": "string"
                    },
                    "documentReferences": [
                        {
                            "documentType": "CERTIFICATE_OF_ORIGIN",
                            "customerReference": "string",
                            "description": "ShippingDocumentSpecification",
                            "documentId": "98123"
                        }
                    ],
                    "expirationTimeStamp": "2012-12-31",
                    "shipmentDryIceDetail": {
                        "totalWeight": {
                            "units": "LB",
                            "value": 10
                        },
                        "packageCount": 12
                    }
                },
                "holdAtLocationDetail": {
                    "locationId": "YBZA",
                    "locationContactAndAddress": {
                        "address": {
                            "streetLines": [
                                "10 FedEx Parkway",
                                "Suite 302"
                            ],
                            "city": "Beverly Hills",
                            "stateOrProvinceCode": "CA",
                            "postalCode": "38127",
                            "countryCode": "US",
                            "residential": false
                        },
                        "contact": {
                            "personName": "person name",
                            "emailAddress": "email address",
                            "phoneNumber": "phone number",
                            "phoneExtension": "phone extension",
                            "companyName": "company name",
                            "faxNumber": "fax number"
                        }
                    },
                    "locationType": "FEDEX_ONSITE"
                },
                "shipmentCODDetail": {
                    "addTransportationChargesDetail": {
                        "rateType": "ACCOUNT",
                        "rateLevelType": "BUNDLED_RATE",
                        "chargeLevelType": "CURRENT_PACKAGE",
                        "chargeType": "COD_SURCHARGE"
                    },
                    "codRecipient": {
                        "accountNumber": {
                            "value": 123456789
                        }
                    },
                    "remitToName": "FedEx",
                    "codCollectionType": "ANY",
                    "financialInstitutionContactAndAddress": {
                        "address": {
                            "streetLines": [
                                "10 FedEx Parkway",
                                "Suite 302"
                            ],
                            "city": "Beverly Hills",
                            "stateOrProvinceCode": "CA",
                            "postalCode": "38127",
                            "countryCode": "US",
                            "residential": false
                        },
                        "contact": {
                            "personName": "person name",
                            "emailAddress": "email address",
                            "phoneNumber": "phone number",
                            "phoneExtension": "phone extension",
                            "companyName": "company name",
                            "faxNumber": "fax number"
                        }
                    },
                    "returnReferenceIndicatorType": "INVOICE"
                },
                "shipmentDryIceDetail": {
                    "totalWeight": {
                        "units": "LB",
                        "value": 10
                    },
                    "packageCount": 12
                },
                "internationalControlledExportDetail": {
                    "type": "DEA_036"
                },
                "homeDeliveryPremiumDetail": {
                    "phoneNumber": {
                        "areaCode": "areaCode",
                        "extension": "extension",
                        "countryCode": "countryCode",
                        "personalIdentificationNumber": "personalIdentificationNumber",
                        "localNumber": "localNumber"
                    },
                    "shipTimestamp": "2020-04-24",
                    "homedeliveryPremiumType": "APPOINTMENT"
                },
                "specialServiceTypes": [
                    "BROKER_SELECT_OPTION"
                ]
            },
            "customsClearanceDetail": {
                "commercialInvoice": {
                    "shipmentPurpose": "GIFT"
                },
                "freightOnValue": "CARRIER_RISK",
                "dutiesPayment": {
                    "payor": {
                        "responsibleParty": {
                            "address": {
                                "streetLines": [
                                    "10 FedEx Parkway",
                                    "Suite 302"
                                ],
                                "city": "Beverly Hills",
                                "stateOrProvinceCode": "CA",
                                "postalCode": "90210",
                                "countryCode": "US",
                                "residential": false
                            },
                            "contact": {
                                "personName": "John Taylor",
                                "emailAddress": "sample@company.com",
                                "phoneNumber": "1234567890",
                                "phoneExtension": "phone extension",
                                "companyName": "Fedex",
                                "faxNumber": "fax number"
                            },
                            "accountNumber": {
                                "value": "123456789"
                            }
                        }
                    },
                    "paymentType": "SENDER"
                },
                "commodities": [
                    {
                        "description": "DOCUMENTS",
                        "weight": {
                            "units": "LB",
                            "value": 22
                        },
                        "quantity": 1,
                        "customsValue": {
                            "amount": "100",
                            "currency": "USD"
                        },
                        "unitPrice": {
                            "amount": "100",
                            "currency": "USD"
                        },
                        "numberOfPieces": 1,
                        "countryOfManufacture": "US",
                        "quantityUnits": "PCS",
                        "name": "DOCUMENTS",
                        "harmonizedCode": "080211",
                        "partNumber": "P1"
                    }
                ]
            },
            "groupShipment": true,
            "serviceTypeDetail": {
                "carrierCode": "FDXE",
                "description": "string",
                "serviceName": "string",
                "serviceCategory": "string"
            },
            "smartPostInfoDetail": {
                "ancillaryEndorsement": "ADDRESS_CORRECTION",
                "hubId": "5531",
                "indicia": "MEDIA_MAIL",
                "specialServices": "USPS_DELIVERY_CONFIRMATION"
            },
            "expressFreightDetail": {
                "bookingConfirmationNumber": "string",
                "shippersLoadAndCount": 0
            },
            "groundShipment": false
        },
        "carrierCodes": [
            "FDXE"
        ]
    }
    try {
        const response = await axios.post(
            SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.rate_list,
            req.body.body,
            config
        );

        console.log(response);




        if (
            response?.status === 200 &&
            (response?.data?.RateResponse?.RatedShipment?.RatedPackage)
        ) {

            let rawData = [];
            if (Array.isArray(response?.data?.RateResponse?.RatedShipment?.RatedPackage)) {
                rawData = response?.data?.RateResponse?.RatedShipment?.RatedPackage
            } else {
                rawData = [response?.data?.RateResponse?.RatedShipment?.RatedPackage]
            }

            const rates = rawData.map(ratedPackage => {
                return {
                    serviceName: "FEDEXP",
                    serviceCode: response.data.RateResponse.RatedShipment.Service.Code,
                    rate: ratedPackage.TotalCharges.MonetaryValue,
                }
            });


            res.status(response.status).send({
                message: rates,
                error: false
            });
        }
        else throw ({
            response: {
                "message": response?.data?.Fault?.faultstring,
                "name": "Error",
                "status": 500,
            }
        });
        // if (
        //     response?.status === 200 &&
        //     (
        //         response.data.output.resolvedAddresses[0].attributes.DPV &&
        //         response.data.output.resolvedAddresses[0].attributes.Matched &&
        //         response.data.output.resolvedAddresses[0].attributes.Resolved
        //     )
        // ) {

        //     res.status(response.status).send({
        //         message: response.data.output.resolvedAddresses[0].attributes.Resolved,
        //         error: false
        //     });
        // }
        // else throw ({
        //     response: {
        //         "message": "Server Error!",
        //         "name": "Error",
        //         "status": 500
        //     }
        // });

    } catch (error) {
        console.log(error.response.data);
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

    try {

        const response = await axios.post(
            "https://onlinetools.ups.com/rest/Rate",
            body,
            config
        );
        if (
            response?.status === 200 &&
            (response?.data?.RateResponse?.RatedShipment?.RatedPackage)
        ) {

            let rawData = [];
            if (Array.isArray(response?.data?.RateResponse?.RatedShipment?.RatedPackage)) {
                rawData = response?.data?.RateResponse?.RatedShipment?.RatedPackage
            } else {
                rawData = [response?.data?.RateResponse?.RatedShipment?.RatedPackage]
            }

            const rates = rawData.map(ratedPackage => {
                return {
                    serviceName: "UPS",
                    serviceCode: response.data.RateResponse.RatedShipment.Service.Code,
                    rate: ratedPackage.TotalCharges.MonetaryValue,
                }
            });


            res.status(response.status).send({
                message: rates,
                error: false
            });
        }
        else throw ({
            response: {
                "message": response?.data?.Fault?.faultstring,
                "name": "Error",
                "status": 500,
            }
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
            cache[routeStrings.token_micro] = req.body.token;
            res.status(200).send({
                error: false,
                message: cache[routeStrings.token_micro],
                code: 200
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
    console.log( `Bearer ${req.body.token}`);
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

// microsoft all inventory 
app.post(routeStrings.inventory_micro, cacheHandler, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.get(
            SERVERS.MICROSOFT_Sandbox_Server + API_MICROSOFT.Inventory,
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
        console.log("error", error.response);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
    }
});

// CREATE sale order
app.post(routeStrings.new_order_micro, cacheHandler, async (req, res) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${req.body.token}`,
        }
    };
    try {
        const response = await axios.post(
            API_MICROSOFT.new_Sale_Order,
            req.body.body,
            config
        );

        console.log(response.data);
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
        console.log("error", error.response);
        if (error?.status) res.status(error.status).send({ error: error.message });
        else if (error?.response?.status) res.status(error.response.status).send({ error: error.response.message });
        else if (error?.arg1?.response?.status) res.status(error.arg1.response.status).send({ error: error.arg1.response.message });
        else res.status(500).send({ error: error.message });
    }
});

// CREATE sale order
app.post(routeStrings.new_order_micro, cacheHandler, async (req, res) => {
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

        console.log(response.data);
        res.send(response.data)

    } catch (error) {
        res.status(500).send({ error: error.message });
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

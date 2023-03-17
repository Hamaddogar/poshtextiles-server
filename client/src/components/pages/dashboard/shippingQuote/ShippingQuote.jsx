import { Button, FormControl, Grid, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddressValidateDrawer from './address-drawer'
import RateQuoteDrawer from './ratequote-drawer'
import './quote.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Billfrom from './Billfrom'
import SearchIcon from '@mui/icons-material/Search';
import Shipfrom from './Shipfrom'
import { useDispatch, useSelector } from 'react-redux'
import { BackButton, headInputStyle, styleSlect } from '../reUseAbles/ReuseAbles'
import { createShipment_FEDEXP, createShipment_UPS, requestAccessToken_FEDEXP } from '../../../../utils/FEDEXP_API_HELPERS'
import ShipReportDialog from './ShipReportDialog'
import { rateListFEDEXP, rateListUPS } from '../../../../RTK/Reducers/Reducers'


const ShippingQuote = () => {
    const dispatch = useDispatch();
    const { saleOrderDetails } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const [allowShipment, setAllowShipment] = React.useState(false);
    const [billfrom, setbillfrom] = React.useState(false);
    const [shipfrom, setshipfrom] = React.useState(false);
    const [shipReport, SetShipReport] = React.useState({
        open: false,
        response: null,
        error: null
    });
    const [validatedAddress, setValidatedAddress] = React.useState({
        companyName: saleOrderDetails.shipToName,
        addressLine1: saleOrderDetails.shipToAddress,
        addressLine2: saleOrderDetails.shipToAddress2,
        state: saleOrderDetails.shipToCounty,
        city: saleOrderDetails.shipToCity,
        country: saleOrderDetails.shipToCounty,
        countryCode: saleOrderDetails.shipToCountryRegionCode,
        postalCode: saleOrderDetails.shipToPostCode,
        addressValidated: saleOrderDetails.addressValidated,
        courier: saleOrderDetails?.shippingAgentCode
    });
    const [selections, setSelections] = React.useState({
        printOn: "No Option Avaliable",
        extraServices: "No Option Avaliable",
        carrier: saleOrderDetails?.shippingAgentCode || "No Option Avaliable",
    });

    console.log('saleOrderDetails', saleOrderDetails);

    const handleChange = event => setSelections({
        ...selections,
        [event.target.name]: [event.target.value]
    });
    const handleSubmit = event => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget)
        // // api call
        // console.log('--data', event)
        // console.log('--data', data.get('printOn'))
        // console.log('--data', data.get('customer'))
        // console.log('--data', data.get('shipTooo'))
        SetShipReport({ open: true });

        if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
            const payload_Data = {
                "labelResponseOptions": "URL_ONLY",
                "requestedShipment": {
                    "shipper": {
                        "contact": {
                            "personName": "Muhammad Hamad",
                            "phoneNumber": 1234567890,
                            "companyName": "Posh Textiles"
                        },
                        "address": {
                            "streetLines": [
                                "7670 N.W. 6th Avenue"
                            ],
                            "city": "India",
                            "stateOrProvinceCode": "AR",
                            "postalCode": 72601,
                            "countryCode": "US"
                        }
                    },
                    "recipients": [
                        {
                            "contact": {
                                "personName": saleOrderDetails?.shipToName,
                                "phoneNumber": saleOrderDetails?.edcCustomers[0]?.phoneNo,
                                "companyName": saleOrderDetails?.edcCustomers[0]?.contact
                            },
                            "address": {
                                "streetLines": [
                                    saleOrderDetails?.edcCustomers[0]?.address,
                                    saleOrderDetails?.edcCustomers[0]?.address2
                                ],
                                "city": saleOrderDetails?.edcCustomers[0]?.city,
                                "stateOrProvinceCode": saleOrderDetails?.shipToCounty,
                                "postalCode": saleOrderDetails?.edcCustomers[0]?.postCode,
                                "countryCode": saleOrderDetails?.shipToCountryRegionCode
                            }
                        }
                    ],
                    "shipDatestamp": saleOrderDetails?.shipmentDate,
                    "serviceType": "STANDARD_OVERNIGHT",
                    "packagingType": "FEDEX_SMALL_BOX",
                    "pickupType": "USE_SCHEDULED_PICKUP",
                    "blockInsightVisibility": false,
                    "shippingChargesPayment": {
                        "paymentType": "SENDER"
                    },
                    "shipmentSpecialServices": {
                        "specialServiceTypes": [
                            "FEDEX_ONE_RATE"
                        ]
                    },
                    "labelSpecification": {
                        "imageType": "PDF",
                        "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
                    },
                    "requestedPackageLineItems": ((saleOrderDetails?.edcSalesLines).map((item, index) => {
                        return {
                            "weight": {
                                "value": 10,
                                "units": "LB"
                            },
                            "dimensions": {
                                "length": 12,
                                "width": 8,
                                "height": 6,
                                "units": "IN"
                            },
                            "physicalPackaging": "BOX",
                            "sequenceNumber": index + 1
                        }
                    })),

                },
                "accountNumber": {
                    "value": "740561073"
                }
            }

            requestAccessToken_FEDEXP()
                .then(token => {
                    createShipment_FEDEXP(payload_Data, token)
                        .then(res => {
                            SetShipReport({
                                open: true,
                                response: res,
                                error: null,
                                type: "FEDEX"
                            })
                        })
                        .catch(error => {
                            SetShipReport({
                                open: true,
                                response: null,
                                error: error.statusText,
                                type: "FEDEX"
                            });
                        })
                });

        } else if (saleOrderDetails?.shippingAgentCode === "UPS") {

            const body = {
                "ShipmentRequest": {
                    "Shipment": {
                        "Description": "1206 PTR",
                        "Shipper": {
                            "Name": "Muhammad Hamad",
                            "ShipperNumber": "V78944",
                            "Address": {
                                "AddressLine": "1234 Main St",
                                "City": "Anytown",
                                "StateProvinceCode": "CA",
                                "PostalCode": "90503",
                                "CountryCode": "US"
                            }
                        },
                        "ShipTo": {
                            "Name": saleOrderDetails?.shipToName,
                            "AttentionName": saleOrderDetails?.shipToName,
                            "PostalCode": "90503",
                            "Phone": {
                                "Number": `${saleOrderDetails?.edcCustomers[0]?.phoneNo}`,
                            },
                            "FaxNumber": saleOrderDetails?.edcCustomers[0]?.faxNo,
                            "TaxIdentificationNumber": "456999",
                            "Address": {
                                "AddressLine": saleOrderDetails?.edcCustomers[0]?.address,
                                "City": saleOrderDetails?.edcCustomers[0]?.city,
                                "StateProvinceCode": saleOrderDetails?.shipToCounty,
                                "PostalCode": saleOrderDetails?.edcCustomers[0]?.postCode,
                                "CountryCode": saleOrderDetails?.shipToCountryRegionCode
                            }
                        },
                        "ShipFrom": {
                            "Name": "Muhammad Hamd",
                            "AttentionName": "Muhammad Hamd",
                            "Phone": {
                                "Number": "1234567890"
                            },
                            "FaxNumber": "1234567999",
                            "TaxIdentificationNumber": "456999",
                            "Address": {
                                "AddressLine": "1234 Main St",
                                "City": "Anytown",
                                "StateProvinceCode": "CA",
                                "PostalCode": "90503",
                                "CountryCode": "US"
                            }
                        },
                        "PaymentInformation": {
                            "ShipmentCharge": {
                                "Type": "01",
                                "BillShipper": {
                                    "AccountNumber": "V78944"
                                }
                            }
                        },
                        "Service": {
                            "Code": "01",
                            "Description": "Expedited"
                        },

                        "Package": ((saleOrderDetails?.edcSalesLines).map(item => {
                            return {
                                "Description": item.description,
                                "Packaging": {
                                    "Code": "02"
                                },
                                "PackageWeight": {
                                    "UnitOfMeasurement": {
                                        "Code": "LBS"
                                    },
                                    "Weight": "10"
                                },
                                "PackageServiceOptions": ""
                            }
                        })),
                        "ItemizedChargesRequestedIndicator": "",
                        "RatingMethodRequestedIndicator": "",
                        "TaxInformationIndicator": "",
                        "ShipmentRatingOptions": {
                            "NegotiatedRatesIndicator": ""
                        }
                    },
                    "LabelSpecification": {
                        "LabelImageFormat": {
                            "Code": "PNG"
                        }
                    }
                }
            };

            createShipment_UPS(body)
                .then(res => {
                    if (res.response?.status >= 400) {
                        SetShipReport({
                            open: true,
                            response: null,
                            error: res.response.data.error,
                            type: "UPS"
                        });
                    } else {
                        SetShipReport({
                            open: true,
                            response: res,
                            error: null,
                            type: "UPS"
                        })
                    }
                })
                .catch(error => {
                    SetShipReport({
                        open: true,
                        response: null,
                        error: error.statusText,
                        type: "UPS"
                    });
                })

        } else {
            SetShipReport({
                open: true,
                response: null,
                error: "Only FEDEXP Services"
            });
        };


    };




    // address
    const [drawerStateAddress, setdrawerStateAddress] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setdrawerStateAddress(open);
    };

    // rate
    const [drawerstateRate, setdrawerstateRate] = React.useState(false);

    const toggleDrawerRate = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setdrawerstateRate(open);
        if (open && saleOrderDetails?.shippingAgentCode === "UPS") {


            const body = {
                "Request": {
                    "RequestOption": "Rate"
                },
                "Shipment": {
                    "Shipper": {
                        "Name": "Muhammad Hamad",
                        "ShipperNumber": "V78944",
                        "Address": {
                            "AddressLine": "1234 Main St",
                            "City": "Anytown",
                            "StateProvinceCode": "CA",
                            "PostalCode": "90503",
                            "CountryCode": "US"
                        }
                    },
                    "ShipTo": {
                        "Name": saleOrderDetails?.shipToName,
                        "Address": {
                            "AddressLine": saleOrderDetails?.edcCustomers[0]?.address,
                            "City": saleOrderDetails?.edcCustomers[0]?.city,
                            "StateProvinceCode": saleOrderDetails?.shipToCounty,
                            "PostalCode": saleOrderDetails?.edcCustomers[0]?.postCode,
                            "CountryCode": saleOrderDetails?.shipToCountryRegionCode
                        }
                    },
                    "Service": {
                        "Code": "03",
                        "Description": "Service Description"
                    },
                    "Package": ((saleOrderDetails?.edcSalesLines).map(item => {
                        return {
                            "PackagingType": {
                                "Code": "02",
                                "Description": item.description
                            },
                            "Dimensions": {
                                "UnitOfMeasurement": {
                                    "Code": "IN",
                                    "Description": "Inches"
                                },
                                "Length": "20",
                                "Width": "10",
                                "Height": "5"
                            },
                            "PackageWeight": {
                                "UnitOfMeasurement": {
                                    "Code": "Lbs",
                                    "Description": "Pounds"
                                },
                                "Weight": "10"
                            }
                        }
                    })),
                }
            };

            dispatch(rateListUPS({
                body: body,
                toastPermission: true
            }))










































        } else if (open && saleOrderDetails?.shippingAgentCode === "FEDEX") {

            let body = {
                "accountNumber": {
                    "value": "740561073"
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
                                "7670 N.W. 6th Avenue"
                            ],
                            "city": "India",
                            "stateOrProvinceCode": "AR",
                            "postalCode": 72601,
                            "countryCode": "US"
                        }
                    },
                    "recipient": {
                        "address": {
                            "streetLines": [
                                saleOrderDetails?.edcCustomers[0]?.address,
                                saleOrderDetails?.edcCustomers[0]?.address2
                            ],
                            "city": saleOrderDetails?.edcCustomers[0]?.city,
                            "stateOrProvinceCode": saleOrderDetails?.shipToCounty,
                            "postalCode": saleOrderDetails?.edcCustomers[0]?.postCode,
                            "countryCode": saleOrderDetails?.shipToCountryRegionCode
                        }
                    },
                    "serviceType": "STANDARD_OVERNIGHT",
                    "preferredCurrency": "USD",
                    "rateRequestType": [
                        "ACCOUNT",
                        "LIST"
                    ],
                    "shipDateStamp": "2015-03-25T09:30:00",
                    "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
                    "requestedPackageLineItems":
                        ((saleOrderDetails?.edcSalesLines).map((item, index) => {
                            return {
                                "subPackagingType": "BAG",
                                "groupPackageCount": item.quantity,
                                "contentRecord": [
                                    {
                                        "itemNumber": `${item.lineNo}`,
                                        "description": item.description,
                                    }
                                ],
                                "declaredValue": {
                                    "amount": `${item.lineAmount}`,
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
                                        "amount": `${item.lineAmount}`,
                                        "currency": "USD"
                                    },
                                    "rateElementBasis": `${item.lineAmount}`,
                                },
                            }
                        })),
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
                    "totalPackageCount": (saleOrderDetails?.edcSalesLines).length,
                    "totalWeight": 87.5,
                    "shipmentSpecialServices": {
                        "returnShipmentDetail": {
                            "returnType": "PRINT_RETURN_LABEL"
                        },
                        "deliveryOnInvoiceAcceptanceDetail": {
                            "recipient": {
                                "accountNumber": {
                                    "value": 740561073
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
                                    "personName": saleOrderDetails?.shipToName,
                                    "phoneNumber": saleOrderDetails?.edcCustomers[0]?.phoneNo,
                                    "faxNumber": saleOrderDetails?.edcCustomers[0]?.faxNo
                                }
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
                                        "country": saleOrderDetails?.shipToCountryRegionCode,
                                        "language": "string"
                                    }
                                }
                            ],
                            "message": "No message"
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
                    "commodities": 
                    {
                        "dutiesPayment": {
                            "paymentType": "SENDER",
                            "payor": {
                                "responsibleParty": null
                            }
                        },
                        "commodities":
                            ((saleOrderDetails?.edcSalesLines).map((item, index) => {
                                return {
                                    "description": item.description,
                                    "quantity": item.quantity,
                                    "quantityUnits": item.unitOfMeasureCode,
                                    "weight": {
                                        "units": item.unitOfMeasureCode,
                                        "value": item.quantity,
                                    },
                                    "customsValue": {
                                        "amount": item.lineAmount,
                                        "currency": "USD"
                                    }
                                }
                            }))
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
                "groundShipment": false,
            },
                "carrierCodes": [
                    "FDXE"
                ]
        }

        requestAccessToken_FEDEXP().then(token => {
            dispatch(rateListFEDEXP({
                token: token,
                body: body,
                toastPermission: true
            }))

        })

    }
};

// console.log("order", saleOrderDetails);

return (
    <div>
        <Box component={'form'} onSubmit={handleSubmit}>
            <Billfrom billfrom={billfrom} setbillfrom={setbillfrom} />
            <Shipfrom shipfrom={shipfrom} setshipfrom={setshipfrom} />
            <ShipReportDialog shipReport={shipReport} SetShipReport={SetShipReport} />
            <AddressValidateDrawer allowShipment={allowShipment} setAllowShipment={setAllowShipment} toggleDrawer={toggleDrawer} drawerStateAddress={drawerStateAddress} validatedAddress={validatedAddress} setValidatedAddress={setValidatedAddress} />
            <RateQuoteDrawer service={saleOrderDetails?.shippingAgentCode} toggleDrawerRate={toggleDrawerRate} drawerstateRate={drawerstateRate} />
            <Grid container >

                {/* left section */}
                <Grid item xs={12} md={6} >
                    <Stack sx={{ width: '100%' }} rowGap={2}>
                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Print On : </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="printOn"
                                    value={selections.printOn}
                                    onChange={handleChange}
                                    size='small'
                                    name='printOn'
                                    sx={{ ...styleSlect, maxWidth: '400px', backgroundColor: 'white' }}
                                >
                                    <MenuItem value={selections.printOn} sx={{ fontSize: '12px' }}>{selections.printOn}</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>
                                Ship From &nbsp;&nbsp;
                                <SearchIcon onClick={() => { setshipfrom(true) }} sx={{ cursor: "pointer" }} />
                                :
                            </Typography>

                            <TextField name='shipFrom' fullWidth onClick={() => setbillfrom(true)} placeholder='Posh Textiles Inc.' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <VisibilityIcon sx={{ cursor: 'pointer' }} />
                                    </InputAdornment>
                                )
                            }} />
                        </Stack>

                        <Stack direction={'row'}>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>
                                Ship To &nbsp;&nbsp;
                                <SearchIcon onClick={() => { setshipfrom(true) }} sx={{ cursor: "pointer" }} />
                                :
                            </Typography>

                            <TextField
                                sx={{ ...headInputStyle, maxWidth: '400px' }}
                                defaultValue={saleOrderDetails.shipToCountryRegionCode}
                                size='small'
                                multiline
                                minRows={8}
                                maxRows={8}
                                fullWidth
                                name='shipTo'
                            />

                        </Stack>


                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Carrier : </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="carrier"
                                    value={selections.carrier}
                                    onChange={handleChange}
                                    size='small'
                                    name='carrier'
                                    sx={{ ...styleSlect, maxWidth: '400px', backgroundColor: 'white' }}
                                >
                                    <MenuItem value={selections.carrier} sx={{ fontSize: '12px' }}>{selections.carrier}</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Service : </Typography>
                            <TextField defaultValue={saleOrderDetails?.shippingAgentServiceCode} fullWidth placeholder='Service' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>

                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Phone No : </Typography>
                            <TextField defaultValue={saleOrderDetails?.edcCustomers[0].phoneNo} fullWidth placeholder='Carrier' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>

                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Email Tracking : </Typography>
                            <TextField defaultValue={saleOrderDetails?.edcCustomers[0].eMail} fullWidth placeholder='Email Tracking' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>

                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Ship Date : </Typography>
                            <TextField type="date" defaultValue={saleOrderDetails?.shipmentDate} fullWidth placeholder='Ship Date' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>
                    </Stack>

                </Grid>

                {/* right section */}
                <Grid item xs={12} md={6}>

                    <Stack rowGap={1} sx={saleOrderDetails?.edcWhseShipments.length ? {} : { pointerEvents: `none`, opacity: '.6' }}>
                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>No. of Boxes : </Typography>
                            <TextField type="number" defaultValue={saleOrderDetails?.edcWhseShipments[0]?.NoofBoxes} fullWidth placeholder='No. of Boxes' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>
                        {/* Weight section */}
                        <Stack direction={'row'} alignItems='center' columnGap={1.5}>

                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '99px' }}>Weight : </Typography>

                            <Stack direction={'row'} alignItems='center'>
                                <TextField type="number" defaultValue={saleOrderDetails?.edcWhseShipments[0]?.GrossWeight} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>lbs </Typography>
                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>oz </Typography>
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Auto </Typography>
                            </Stack>

                        </Stack>


                        {/* Dimensions section */}
                        <Stack direction={'row'} alignItems='center' columnGap={1.5}>

                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '99px' }}>Dimensions : </Typography>

                            <Stack direction={'row'} alignItems='center'>
                                <TextField type="number" defaultValue={saleOrderDetails?.edcWhseShipments[0]?.GrossWeight} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"L </Typography>
                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"W</Typography>
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"H </Typography>
                            </Stack>

                        </Stack>


                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Insure for $ : </Typography>
                            <TextField type="number" defaultValue={Number(saleOrderDetails?.edcWhseShipments[0]?.InsuranceAmount)} fullWidth size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>


                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>COD : </Typography>
                            <TextField type="number" defaultValue={Number(saleOrderDetails?.edcWhseShipments[0]?.CodAmount)} fullWidth size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                        </Stack>

                        <Stack direction={'row'} alignItems='center'>
                            <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Extra Service : </Typography>
                            <FormControl fullWidth>
                                <Select
                                    id="extraServices"
                                    value={selections.extraServices}
                                    onChange={handleChange}
                                    size='small'
                                    name='extraServices'
                                    sx={{ ...styleSlect, backgroundColor: '#E0E0E0' }}
                                >
                                    <MenuItem value={selections.extraServices} sx={{ fontSize: '12px' }}>{selections.extraServices}</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                    </Stack>

                </Grid>


                {/* footer actions */}
                <Grid item container mt={.5}>
                    <Grid item xs={6}>
                        <Box>
                            <Button
                                style={{ background: "#4B5AD8", marginTop: "15px", padding: "0px 6px", color: "white" }}
                                onClick={toggleDrawer(true)}>Validate Address</Button>

                            <Box sx={{ marginTop: "10px" }}>
                                <BackButton onClick={() => navigate(-1)} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button style={{ background: "#4B5AD8", marginTop: "15px", padding: "2px 6px", color: "white" }} onClick={toggleDrawerRate(true)}>RATE QUOTE</Button>
                            <Button
                                disabled={!allowShipment || true}
                                type='submit'
                                variant='contained'
                                sx={{ marginLeft: "6px", background: "#4B5AD8", marginTop: "15px", padding: "0px 6px", color: 'white' }}
                            > Ship </Button>
                        </Box>
                    </Grid>

                </Grid>

            </Grid>
        </Box>
    </div>
)
}

export default ShippingQuote

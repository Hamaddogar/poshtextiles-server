
// weight converter

const ydsToOz = YDS_W => (YDS_W * 16 * 16);
const ydsToLbs = YDS_W => (YDS_W / 16);







export const payload_Shipment_Handler = details => {
    if (details.shippingAgentCode === "FEDEX") {
        return {
            "labelResponseOptions": "URL_ONLY",
            "rateRequestTypes": "ACCOUNT",
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
                            "personName": details?.edcCustomers[0]?.name,
                            "phoneNumber": details?.edcCustomers[0]?.phoneNo,
                            "companyName": details?.edcCustomers[0]?.name
                        },
                        "address": {
                            "streetLines": [
                                details?.edcCustomers[0]?.address,
                                details?.edcCustomers[0]?.address2
                            ],
                            "city": details?.edcCustomers[0]?.city,
                            "stateOrProvinceCode": details?.shipToCounty,
                            "postalCode": details?.edcCustomers[0]?.postCode,
                            "countryCode": details?.shipToCountryRegionCode
                        }
                    }
                ],
                "shipDatestamp": details?.shipmentDate,
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
                    "imageType": "PNG",
                    "labelStockType": "PAPER_4X6"
                },
                "requestedPackageLineItems": ((details.edcWhseShipments).map((item, index) => {
                    return {
                        "weight": {
                            "units": details?.edcSalesLines[0]?.unitOfMeasureCode ? "LB" : "LB",
                            "value": item.GrossWeight
                        }
                    }
                })),
            },
            "accountNumber": {
                "value": "740561073"
            }
        }
    } else if (details.shippingAgentCode === "UPS") {
        return {
            "ShipmentRequest": {
                "Shipment": {
                    "Description": details.externalDocumentNo,
                    "Shipper": {
                        "Name": "Muhammad Hamad",
                        "ShipperNumber": "R006V5",
                        "Address": {
                            "AddressLine": "12 Main St",
                            "City": "Kalali",
                            "StateProvinceCode": "CA",
                            "PostalCode": "90503",
                            "CountryCode": "US"
                        }
                    },
                    "ShipTo": {
                        "Name": details?.shipToName,
                        "AttentionName": details?.shipToName,
                        "PostalCode": "90503",
                        "Phone": {
                            "Number": `${details?.edcCustomers[0]?.phoneNo}`,
                        },
                        "FaxNumber": details?.edcCustomers[0]?.faxNo,
                        "Address": {
                            "AddressLine": details?.edcCustomers[0]?.address,
                            "City": details?.edcCustomers[0]?.city,
                            "StateProvinceCode": details?.shipToCounty,
                            "PostalCode": details?.edcCustomers[0]?.postCode,
                            "CountryCode": details?.shipToCountryRegionCode
                        }
                    },
                    "ShipFrom": {
                        "Name": "Muhammad Hamad",
                        "AttentionName": "Muhammad Hamad",
                        "Phone": {
                            "Number": "1234567890"
                        },
                        "FaxNumber": "1234567999",
                        "TaxIdentificationNumber": "456999",
                        "Address": {
                            "AddressLine": "12 Main St",
                            "City": "Kalali",
                            "StateProvinceCode": "CA",
                            "PostalCode": "90503",
                            "CountryCode": "US"
                        }
                    },
                    "PaymentInformation": {
                        "ShipmentCharge": {
                            "Type": "01",
                            "BillShipper": {
                                "AccountNumber": "R006V5"
                            }
                        }
                    },
                    "Service": {
                        "Code": "03",
                        "Description": "Expedited"
                    },

                    "Package": ((details?.edcWhseShipments).map(item => {
                        return {
                            "Description": item.description,
                            "Packaging": {
                                "Code": "02"
                            },
                            "PackageWeight": {
                                "UnitOfMeasurement": {
                                    "Code": details?.edcSalesLines[0]?.unitOfMeasureCode ? "LBS" : "LBS"
                                },
                                "Weight": `${item.GrossWeight}`
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
                    },
                    "LabelStockSize": {
                        "Height": "6",
                        "Width": "4"
                    }
                }
            }
        }
    } else if (details.shippingAgentCode === "STAMPS") {
        alert('working')
    }
};




export const payload_Rates_Handler = (details) => {
    if (details.shippingAgentCode === "FEDEX") {
        return {
            "accountNumber": {
                "value": " "
            },
            "requestedShipment": {
                "shipper": {
                    "address": {
                        "postalCode": 65247,
                        "countryCode": "US"
                    }
                },
                "recipient": {
                    "address": {
                        "postalCode": details?.edcCustomers[0]?.postCode,
                        "countryCode": details?.shipToCountryRegionCode,
                        "residential": true
                    }
                },
                "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
                "rateRequestType": [
                    "LIST",
                    "ACCOUNT"
                ],
                "requestedPackageLineItems":
                    ((details?.edcWhseShipments).map((item, index) => {
                        return {
                            "weight": {
                                "units": `${details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? "LB" : "LB"}`,
                                "value": details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? Math.ceil(item.GrossWeight) : Math.ceil(item.GrossWeight)
                            },
                            "shipmentSpecialServices": {
                                "specialServiceTypes": [
                                    "APPOINTMENT",
                                ]
                            },
                        }
                    }))
            }
        }
    } else if (details.shippingAgentCode === "UPS") {
        return {
            "Shipment": {
                "Shipper": {
                    "Name": "Muhammad Hamad",
                    "Address": {
                        "AddressLine": "12 Main St",
                        "City": "Kalali",
                        "StateProvinceCode": "CA",
                        "PostalCode": "90503",
                        "CountryCode": "US"
                    }
                },
                "ShipTo": {
                    "Name": details?.shipToName,
                    "Address": {
                        "AddressLine": details?.edcCustomers[0]?.address,
                        "City": details?.edcCustomers[0]?.city,
                        "StateProvinceCode": details?.shipToCounty,
                        "PostalCode": details?.edcCustomers[0]?.postCode,
                        "CountryCode": details?.shipToCountryRegionCode
                    }
                },
                "Service": {
                    "Code": "03",
                    "Description": "Strandred Ground",
                },
                "Package": ((details?.edcWhseShipments).map(item => {
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
                            "Length": `${item.edcBoxDetails[0].length}`,
                            "Width": `${item.edcBoxDetails[0].width}`,
                            "Height": `${item.edcBoxDetails[0].height}`
                        },
                        "PackageWeight": {
                            "UnitOfMeasurement": {
                                "Code": `${details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? "LBS" : "LBS"}`,
                                "Description": `${details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? details.edcSalesLines[0].unitOfMeasureCode : "Pounds"}`
                            },
                            "Weight": `${details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? Math.ceil(item.GrossWeight) : Math.ceil(item.GrossWeight)}`
                        }
                    }
                })),
                "ShipmentRatingOptions": {
                    "NegotiatedRatesIndicator": "True"
                }
            }
        };
    } else if (details.shippingAgentCode === "STAMPS") {
        alert('working')
    }
};


export const payload_Address_Handler = (details) => {
    if (details.shippingAgentCode === "FEDEX") {
        return {
            "validateAddressControlParameters": {
                "includeResolutionTokens": true
            },
            "addressesToValidate": [
                {
                    "address": {
                        "streetLines": [
                            details.edcCustomers[0].address,
                            details.edcCustomers[0].address2,
                        ],
                        "city": `${details.edcCustomers[0].city}`,
                        "stateOrProvinceCode": `${details.edcCustomers[0].county}`,
                        "postalCode": `${details.edcCustomers[0].postCode}`,
                        "countryCode": `${details.edcCustomers[0].countryRegionCode}`,
                        "addressVerificationId": `${Math.random()}`,
                    }
                }
            ]
        }
    } else if (details.shippingAgentCode === "UPS") {
        return {
            "XAVRequest": {
                "AddressKeyFormat": {
                    "ConsigneeName": details.edcCustomers[0].name,
                    "AddressLine": [
                        details.edcCustomers[0].address,
                        details.edcCustomers[0].address2,
                    ],
                    "Region": `${details.edcCustomers[0].city},${details.edcCustomers[0].county},${details.edcCustomers[0].postCode}`,
                    "PoliticalDivision1": `${details.edcCustomers[0].county}`,
                    "PostcodePrimaryLow": `${details.edcCustomers[0].postCode.split("-")[0] ? details.edcCustomers[0].postCode.split("-")[0] : " "}`,
                    "PostcodeExtendedLow": `${details.edcCustomers[0].postCode.split("-")[1] ? details.edcCustomers[0].postCode.split("-")[1] : " "}`,
                    "CountryCode": `${details.edcCustomers[0].countryRegionCode}`,
                }
            }
        }
    } else if (details.shippingAgentCode === "STAMPS") {
        alert('working')
    }
};











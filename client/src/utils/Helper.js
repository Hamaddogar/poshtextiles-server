
export const payload_Shipment_Handler = details => {
    if (details.shippingAgentCode === "FEDEX") {
        const payload_Data = {
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
                    "imageType": "PDF",
                    "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
                },
                "requestedPackageLineItems": details?.edcSalesLines,

            },
            "accountNumber": {
                "value": "740561073"
            }
        }
        return payload_Data;
    } else if (details.shippingAgentCode === "UPS") {
        const payload_Data = {
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
                        "Name": details?.shipToName,
                        "AttentionName": details?.shipToName,
                        "PostalCode": "90503",
                        "Phone": {
                            "Number": `${details?.edcCustomers[0]?.phoneNo}`,
                        },
                        "FaxNumber": details?.edcCustomers[0]?.faxNo,
                        "TaxIdentificationNumber": "456999",
                        "Address": {
                            "AddressLine": details?.edcCustomers[0]?.address,
                            "City": details?.edcCustomers[0]?.city,
                            "StateProvinceCode": details?.shipToCounty,
                            "PostalCode": details?.edcCustomers[0]?.postCode,
                            "CountryCode": details?.shipToCountryRegionCode
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

                    "Package": ((details?.edcSalesLines).map(item => {
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
        return payload_Data;
    } else if (details.shippingAgentCode === "STAMPS") {
        alert('working')
    }
};



export const payload_Rates_Handler = details => {
    if (details.shippingAgentCode === "UPS") {
        const payload_Data = {
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
                    "Description": "Service Description"
                },
                "Package": ((details?.edcSalesLines).map(item => {
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
        return payload_Data;
    }
    else if (details.shippingAgentCode === "FEDEX") {
        let payload_Data = {
            "accountNumber": {
                "value": "740561073"
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
                            details?.edcCustomers[0]?.address,
                            details?.edcCustomers[0]?.address2
                        ],
                        "city": details?.edcCustomers[0]?.city,
                        "stateOrProvinceCode": details?.shipToCounty,
                        "postalCode": details?.edcCustomers[0]?.postCode,
                        "countryCode": details?.shipToCountryRegionCode
                    }
                },
                "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
                "serviceType": "FEDEX_2_DAY",
                "rateRequestType": [
                    "LIST"
                ],
                "requestedPackageLineItems": details?.edcSalesLines,
            }
        }

        payload_Data = {
            "accountNumber": {
                "value": "740561073"
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
                        "postalCode": 75063,
                        "countryCode": "US",
                        "residential": true
                    }
                },
                "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
                "serviceType": "GROUND_HOME_DELIVERY",
                "shipmentSpecialServices": {
                    "specialServiceTypes": [
                        "HOME_DELIVERY_PREMIUM"
                    ],
                    "homeDeliveryPremiumDetail": {
                        "homedeliveryPremiumType": "APPOINTMENT"
                    }
                },
                "rateRequestType": [
                    "LIST"
                ],
                "requestedPackageLineItems":
                    ((details?.edcSalesLines).map((item, index) => {
                        return {
                            "weight": {
                                "units": "LB",
                                "value": 10
                            }
                        }
                    }))
            }
        }

        return payload_Data;
    }
    else if (details.shippingAgentCode === "STAMPS") {
        alert('working')
    }
};







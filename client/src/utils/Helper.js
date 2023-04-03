
// weight converter

// const ydsToOz = YDS_W => (YDS_W * 16 * 16);
const ydsToLbs_ounces = YDS_W => (YDS_W / 16);







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
        return {
            "from_address": {
                "name": "Muhammad Hamad",
                "company_name": "poshtextiles",
                "address_line1": "12 Main St",
                "address_line2": "",
                "city": "Kalali",
                "state_province": "CA",
                "postal_code": "90503",
                "country_code": "US",
            },
            "return_address": {
                "name": "Muhammad Hamad",
                "company_name": "poshtextiles",
                "address_line1": "12 Main St",
                "address_line2": "",
                "city": "Kalali",
                "state_province": "CA",
                "postal_code": "90503",
                "country_code": "US",
            },
            "to_address": {

                "name": details?.edcCustomers[0]?.name,
                "company_name": details?.edcCustomers[0]?.searchName,
                "address_line1": details?.edcCustomers[0]?.address,
                "address_line2": details?.edcCustomers[0]?.address2,
                "city": details?.edcCustomers[0]?.city,
                "state_province": details?.shipToCounty,
                "postal_code": details?.edcCustomers[0]?.postCode,
                "country": details?.edcCustomers[0]?.county,
                "country_code": details?.edcCustomers[0]?.county,
                "phone": details?.edcCustomers[0]?.phoneNo,
                "email": details?.edcCustomers[0]?.eMail,
            },
            "service_type": "usps_first_class_mail",
            "packages":
                ((details?.edcWhseShipments).map(item => {
                    return {
                        "packaging_type": "package",
                        "weight_unit": "ounce",
                        "weight": details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? ydsToLbs_ounces(item.GrossWeight) : item.GrossWeight,
                        "length": item.edcBoxDetails[0]?.["length"],
                        "width": item.edcBoxDetails[0]?.["width"],
                        "height": item.edcBoxDetails[0]?.["height"],
                        "dimension_unit": "inch"
                    }
                })),
            "delivery_confirmation_type": "none",
            "insurance": {
                "insurance_provider": "stamps_com",
                "insured_value": {
                    "amount": 0,
                    "currency": "usd"
                }
            },
            "ship_date": "string",
            "is_return_label": true,
            "label_options": {
                "label_size": "4x6",
                "label_format": "png",
                "label_output_type": "base64"
            },
            "is_test_label": true
        }
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
                            "Length": `${item.edcBoxDetails[0]?.["length"]}`,
                            "Width": `${item.edcBoxDetails[0]?.["width"]}`,
                            "Height": `${item.edcBoxDetails[0]?.["height"]}`
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
        return {
            "ship_from": {
                "name": "Muhammad Hamad",
                "company": "poshtextiles",
                "address1": "12 Main St",
                "address2": "",
                "city": "Kalali",
                "state": "CA",
                "zip": "90503",
                "country": "US",
            },
            "ship_to": {
                "name": details?.shipToName,
                "company": "Doe Inc.",
                "address1": details?.edcCustomers[0]?.address,
                "address2": details?.edcCustomers[0]?.address2,
                "city": details?.edcCustomers[0]?.city,
                "state": details?.shipToCounty,
                "zip": details?.edcCustomers[0]?.postCode,
                "country": details?.edcCustomers[0]?.county,
                "phone": details?.edcCustomers[0]?.phoneNo,
                "email": details?.edcCustomers[0]?.eMail,
            },
            "packages":
                ((details?.edcWhseShipments).map(item => {
                    return {
                        "weight": item.GrossWeight,
                        "length": item.edcBoxDetails[0]?.["length"],
                        "width": item.edcBoxDetails[0]?.["width"],
                        "height": item.edcBoxDetails[0]?.["height"]
                    }
                })),
        }

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
        return [
            {
                "company_name": details.edcCustomers[0].searchName,
                "name": details.edcCustomers[0].name,
                "address_line1": details.edcCustomers[0].address,
                "address_line2": details.edcCustomers[0].address2,
                "address_line3": " ",
                "city": details.edcCustomers[0].city,
                "state_province": details.edcCustomers[0].name,
                "postal_code": details.edcCustomers[0].postCode,
                "country_code": details.edcCustomers[0].countryRegionCode,
                "phone": details.edcCustomers[0].phoneNo,
                "email": details.edcCustomers[0].eMail,
            }
        ]
    }
};












// weight converter

// const ydsToOz = YDS_W => (YDS_W * 16 * 16);
const ydsToLbs_ounces = YDS_W => YDS_W > 0 ? (YDS_W / 16) : 1;
// function ydsToLbs(yds) {
//     const lbsPerYd = 0.593;
//     return yds * lbsPerYd;
//   }

function addDaysToDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 12);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // return dateString
}


const labelSize = (service, size) => {
    switch (service) {
        case "FEDEX":
            if (size === "s1") { return "PAPER_85X11_TOP_HALF_LABEL" }
            else if (size === "s2") { return "PAPER_4X9" }
            else if (size === "s3") { return "PAPER_4X6" }
            break;
        case "STAMPS":
            if (size === "s1") { return "letter" }
            else if (size === "s2") { return "letter" }
            else if (size === "s3") { return "4x6" }
            break;
        case "UPS":
            if (size === "s1") { return { "Height": "11", "Width": "8" } }
            else if (size === "s2") { return { "Height": "9", "Width": "4" } }
            else if (size === "s3") { return { "Height": "6", "Width": "4" } }
            break;

        default:
            if (size === "1") { return "PAPER_85X11_TOP_HALF_LABEL" }
            else if (size === "2") { return "PAPER_4X9" }
            else if (size === "3") { return "PAPER_4X6" }
            break;
    }
}



export const payload_Shipment_Handler = (details, shipFrom, printOn) => {
    if (details.shippingAgentCode === "FEDEX") {
        return {
            "labelResponseOptions": "URL_ONLY",
            "rateRequestTypes": "ACCOUNT",
            "requestedShipment": {
                "shipper": {
                    "contact": {
                        "personName": shipFrom.name,
                        "phoneNumber": shipFrom.phoneNo,
                        "companyName": shipFrom.contact
                    },
                    "address": {
                        "streetLines": [
                            shipFrom.address,
                            shipFrom.address2,
                        ],
                        "city": shipFrom.city,
                        "stateOrProvinceCode": shipFrom.county,
                        "postalCode": shipFrom.postCode,
                        "countryCode": shipFrom.countryRegionCode
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
                            "countryCode": details?.edcCustomers[0]?.countryRegionCode
                        }
                    }
                ],
                "shipDatestamp": details?.shipmentDate,
                "serviceType": "FEDEX_GROUND",
                "packagingType": "YOUR_PACKAGING",
                "pickupType": "USE_SCHEDULED_PICKUP",
                "blockInsightVisibility": false,
                "shippingChargesPayment": {
                    "paymentType": "SENDER"
                },
                "labelSpecification": {
                    "imageType": "PNG",
                    "labelStockType": labelSize("FEDEX", printOn)
                },
                "requestedPackageLineItems": ((details?.edcSalesLines).map((item, index) => {
                    return {
                        "weight": {
                            "units": item.unitOfMeasureCode ? "LB" : "LB",
                            "value": details.edcWhseShipments?.[0]?.GrossWeight > 0 ? details.edcWhseShipments?.[0]?.GrossWeight : 1
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
                        "Name": shipFrom.name,
                        "ShipperNumber": shipFrom.upsAccount,
                        "Address": {
                            "AddressLine": shipFrom.address,
                            "City": shipFrom.city,
                            "StateProvinceCode": shipFrom.county,
                            "PostalCode": shipFrom.postCode,
                            "CountryCode": shipFrom.countryRegionCode
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
                            "CountryCode": details?.edcCustomers[0]?.countryRegionCode
                        }
                    },
                    "ShipFrom": {
                        "Name": shipFrom.name,
                        "AttentionName": shipFrom.contact,
                        "Phone": {
                            "Number": shipFrom.phoneNo
                        },
                        "FaxNumber": shipFrom.faxNo,
                        "TaxIdentificationNumber": "456999",
                        "Address": {
                            "AddressLine": shipFrom.address,
                            "City": shipFrom.city,
                            "StateProvinceCode": shipFrom.county,
                            "PostalCode": shipFrom.postCode,
                            "CountryCode": shipFrom.countryRegionCode
                        }
                    },
                    "PaymentInformation": {
                        "ShipmentCharge": {
                            "Type": "01",
                            "BillShipper": {
                                "AccountNumber": shipFrom.upsAccount
                            }
                        }
                    },
                    "Service": {
                        "Code": details?.shippingAgentServiceCode ? details?.shippingAgentServiceCode : "03",
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
                                    "Code": item.unitOfMeasureCode ? "LBS" : "LBS"
                                },
                                "Weight": `${details?.edcWhseShipments?.[0]?.GrossWeight > 0 ? details?.edcWhseShipments?.[0]?.GrossWeight : 1}`
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
                    "LabelStockSize": labelSize("UPS", printOn)
                }
            }
        }
    } else if (details.shippingAgentCode === "STAMPS") {
        return {
            "from_address": {
                "name": shipFrom.name,
                "company_name": shipFrom.conntact,
                "address_line1": shipFrom.address,
                "address_line2": shipFrom.address2,
                "city": shipFrom.city,
                "state_province": shipFrom.county,
                "postal_code": shipFrom.postCode,
                "country_code": shipFrom.countryRegionCode,
            },
            "return_address": {
                "name": shipFrom.name,
                "company_name": shipFrom.conntact,
                "address_line1": shipFrom.address,
                "address_line2": shipFrom.address2,
                "city": shipFrom.city,
                "state_province": shipFrom.county,
                "postal_code": shipFrom.postCode,
                "country_code": shipFrom.countryRegionCode,
            },
            "to_address": {
                "name": details?.edcCustomers[0]?.name,
                "company_name": details?.edcCustomers[0]?.searchName,
                "address_line1": details?.edcCustomers[0]?.address,
                "address_line2": details?.edcCustomers[0]?.address2,
                "city": details?.edcCustomers[0]?.city,
                "state_province": details?.shipToCounty,
                "postal_code": details?.edcCustomers[0]?.postCode,
                "country": details?.edcCustomers[0]?.countryRegionCode,
                "country_code": details?.edcCustomers[0]?.countryRegionCode,
                "phone": details?.edcCustomers[0]?.phoneNo,
                "email": details?.edcCustomers[0]?.eMail,
            },
            "service_type": details?.shippingAgentServiceCode && false ? details?.shippingAgentServiceCode : "usps_first_class_mail",
            "package":
                ((details?.edcSalesLines).map((item, indx) => {
                    return {
                        "packaging_type": "package",
                        "weight_unit": "ounce",
                        // "weight": details?.edcSalesLines[0]?.unitOfMeasureCode === "YDS" ? ydsToLbs_ounces(details.edcWhseShipments?.[0].GrossWeight+indx) : (details.edcWhseShipments?.[0].GrossWeight+indx),
                        "weight": indx + 1,
                        "length": details.edcWhseShipments?.[0].edcBoxDetails[0]?.["length"],
                        "width": details.edcWhseShipments?.[0].edcBoxDetails[0]?.["width"],
                        "height": details.edcWhseShipments?.[0].edcBoxDetails[0]?.["height"],
                        "dimension_unit": "inch"
                    }
                })),
            "ship_date": addDaysToDate(details?.shipmentDate),
            "is_return_label": true,
            "label_options": {
                "label_size": labelSize("STAMPS", printOn),
                "label_format": "png",
                "label_output_type": "base64"
            },
            "is_test_label": false,
        }
    }
};




export const payload_Rates_Handler = (details, shipFrom) => {
    if (details.shippingAgentCode === "FEDEX") {
        return {
            "accountNumber": {
                "value": " "
            },
            "requestedShipment": {
                "shipper": {
                    "address": {
                        "city": shipFrom.city,
                        "stateOrProvinceCode": shipFrom.county,
                        "postalCode": shipFrom.postCode,
                        "countryCode": shipFrom.countryRegionCode
                    }
                },

                "recipient": {
                    "address": {
                        "postalCode": details?.edcCustomers[0]?.postCode,
                        "countryCode": details.edcCustomers[0].countryRegionCode,
                        "residential": true
                    }
                },
                "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
                "serviceType": "GROUND_HOME_DELIVERY",
                "rateRequestType": [
                    "LIST",
                    "ACCOUNT"
                ],
                "requestedPackageLineItems":
                    ((details?.edcSalesLines).map((item, index) => {
                        return {
                            "weight": {
                                "units": `${item.unitOfMeasureCode === "YDS" ? "LB" : "LB"}`,
                                "value": item.unitOfMeasureCode === "YDS" ? (details?.edcWhseShipments?.[0]?.GrossWeight + 5) : (details?.edcSalesLines?.[0]?.GrossWeight + 5)
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
                    "Name": shipFrom.name,
                    "ShipperNumber": shipFrom.upsAccount,
                    "Address": {
                        "AddressLine": shipFrom.address,
                        "City": shipFrom.city,
                        "StateProvinceCode": shipFrom.county,
                        "PostalCode": shipFrom.postCode,
                        "CountryCode": shipFrom.countryRegionCode
                    }
                },
                "ShipTo": {
                    "Name": details?.shipToName,
                    "Address": {
                        "AddressLine": details?.edcCustomers[0]?.address,
                        "City": details?.edcCustomers[0]?.city,
                        "StateProvinceCode": details?.shipToCounty,
                        "PostalCode": details?.edcCustomers[0]?.postCode,
                        "CountryCode": details?.edcCustomers[0]?.countryRegionCode
                    }
                },
                "Service": {
                    "Code": "03",
                    "Description": details?.shippingAgentServiceCode ? details?.shippingAgentServiceCode : "Strandred Ground",
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
                            "Length": `${details.edcWhseShipments?.[0]?.edcBoxDetails[0]?.["length"]}`,
                            "Width": `${details.edcWhseShipments?.[0]?.edcBoxDetails[0]?.["width"]}`,
                            "Height": `${details.edcWhseShipments?.[0]?.edcBoxDetails[0]?.["height"]}`
                        },
                        "PackageWeight": {
                            "UnitOfMeasurement": {
                                "Code": `${item.unitOfMeasureCode === "YDS" ? "LBS" : "LBS"}`,
                                "Description": `${item.unitOfMeasureCode === "YDS" ? item.unitOfMeasureCode : "Pounds"}`
                            },
                            "Weight": `${item.unitOfMeasureCode === "YDS" ? item.GrossWeight + 5 : item.GrossWeight + 5}`
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
            "from_address": {
                "name": shipFrom.name,
                "company_name": shipFrom.conntact,
                "address_line1": shipFrom.address,
                "address_line2": shipFrom.address2,
                "city": shipFrom.city,
                "state_province": shipFrom.county,
                "postal_code": shipFrom.postCode,
                "country_code": shipFrom.countryRegionCode,
            },
            "to_address": {
                "name": details?.edcCustomers[0]?.name,
                "company_name": details?.edcCustomers[0]?.searchName,
                "address_line1": details?.edcCustomers[0]?.address,
                "address_line2": details?.edcCustomers[0]?.address2,
                "city": details?.edcCustomers[0]?.city,
                "state_province": details?.shipToCounty,
                "postal_code": details?.edcCustomers[0]?.postCode,
                "country": details?.edcCustomers[0]?.countryRegionCode,
                "country_code": details?.edcCustomers[0]?.countryRegionCode,
                "phone": details?.edcCustomers[0]?.phoneNo,
                "email": details?.edcCustomers[0]?.eMail,
            },

            "packages":
                ((details?.edcSalesLines).map(item => {
                    return {
                        "packaging_type": "package",
                        "weight_unit": "ounce",
                        "weight": item.unitOfMeasureCode === "YDS" ? ydsToLbs_ounces(item.GrossWeight) : item.GrossWeight,
                        "length": details.edcWhseShipments?.[0]?.edcBoxDetails[0]?.["length"],
                        "width": details.edcWhseShipments?.[0]?.edcBoxDetails[0]?.["width"],
                        "height": details.edcWhseShipments?.[0]?.edcBoxDetails[0]?.["height"],
                        "dimension_unit": "inch"
                    }
                })),
            "ship_date": addDaysToDate(details?.shipmentDate),
            "is_return_label": true,
            "label_options": {
                "label_size": "4x6",
                "label_format": "png",
                "label_output_type": "base64"
            },
            "is_test_label": false,
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











export const track_Multiple_Data = {
    shortData: {
        "masterTrackingNumberInfo": {
            "trackingNumberInfo": {
                "trackingNumber": "123456789012"
            }
        },
        "associatedType": "STANDARD_MPS"
    },
    fullData: {
        "includeDetailedScans": true,
        "associatedType": "STANDARD_MPS",
        "masterTrackingNumberInfo": {
            "shipDateEnd": "2018-11-03",
            "shipDateBegin": "2018-11-01",
            "trackingNumberInfo": {
                "trackingNumberUniqueId": "245822~123456789012~FDEG",
                "carrierCode": "FDXE",
                "trackingNumber": "858488600850"
            }
        },
        "pagingDetails": {
            "resultsPerPage": 56,
            "pagingToken": "38903279038"
        }
    }
};


//  for shipment 
export const create_Shipment_Data = {
    workingData: {
        "labelResponseOptions": "URL_ONLY",
        "requestedShipment": {
            "shipper": {
                "contact": {
                    "personName": "SHIPPER NAME",
                    "phoneNumber": 1234567890,
                    "companyName": "Shipper Company Name"
                },
                "address": {
                    "streetLines": [
                        "SHIPPER STREET LINE 1"
                    ],
                    "city": "HARRISON",
                    "stateOrProvinceCode": "AR",
                    "postalCode": 72601,
                    "countryCode": "US"
                }
            },
            "recipients": [
                {
                    "contact": {
                        "personName": "RECIPIENT NAME",
                        "phoneNumber": 1234567890,
                        "companyName": "Recipient Company Name"
                    },
                    "address": {
                        "streetLines": [
                            "RECIPIENT STREET LINE 1",
                            "RECIPIENT STREET LINE 2"
                        ],
                        "city": "Collierville",
                        "stateOrProvinceCode": "TN",
                        "postalCode": 38017,
                        "countryCode": "US"
                    }
                }
            ],
            "shipDatestamp": "2020-12-30",
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
            "requestedPackageLineItems": [
                {}
            ]
        },
        "accountNumber": {
            "value": "740561073"
        }
    },
    fullData: {
        "mergeLabelDocOption": "LABELS_AND_DOCS",
        "requestedShipment": {
            "shipDatestamp": "2019-10-14",
            "totalDeclaredValue": {
                "amount": 12.45,
                "currency": "USD"
            },
            "shipper": {
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
                    "phoneExtension": "91",
                    "phoneNumber": "XXXX567890",
                    "companyName": "Fedex"
                },
                "tins": [
                    {
                        "number": "XXX567",
                        "tinType": "FEDERAL",
                        "usage": "usage",
                        "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                        "expirationDate": "2000-01-23T04:56:07.000+00:00"
                    }
                ]
            },
            "soldTo": {
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
                    "phoneExtension": "91",
                    "phoneNumber": "1234567890",
                    "companyName": "Fedex"
                },
                "tins": [
                    {
                        "number": "123567",
                        "tinType": "FEDERAL",
                        "usage": "usage",
                        "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                        "expirationDate": "2000-01-23T04:56:07.000+00:00"
                    }
                ],
                "accountNumber": {
                    "value": "740561073"
                }
            },
            "recipients": [
                {
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
                        "phoneExtension": "000",
                        "phoneNumber": "XXXX345671",
                        "companyName": "FedEx"
                    },
                    "tins": [
                        {
                            "number": "123567",
                            "tinType": "FEDERAL",
                            "usage": "usage",
                            "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                            "expirationDate": "2000-01-23T04:56:07.000+00:00"
                        }
                    ],
                    "deliveryInstructions": "Delivery Instructions"
                }
            ],
            "recipientLocationNumber": "1234567",
            "pickupType": "USE_SCHEDULED_PICKUP",
            "serviceType": "PRIORITY_OVERNIGHT",
            "packagingType": "YOUR_PACKAGING",
            "totalWeight": 20.6,
            "origin": {
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
            "shippingChargesPayment": {
                "paymentType": "SENDER",
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
                            "phoneNumber": "XXXX567890",
                            "phoneExtension": "phone extension",
                            "companyName": "Fedex",
                            "faxNumber": "fax number"
                        },
                        "accountNumber": {
                            "value": "740561073"
                        }
                    }
                }
            },
            "shipmentSpecialServices": {
                "specialServiceTypes": [
                    "THIRD_PARTY_CONSIGNEE",
                    "PROTECTION_FROM_FREEZING"
                ],
                "etdDetail": {
                    "attributes": [
                        "POST_SHIPMENT_UPLOAD_REQUESTED"
                    ],
                    "attachedDocuments": [
                        {
                            "documentType": "PRO_FORMA_INVOICE",
                            "documentReference": "DocumentReference",
                            "description": "PRO FORMA INVOICE",
                            "documentId": "090927d680038c61"
                        }
                    ],
                    "requestedDocumentTypes": [
                        "VICS_BILL_OF_LADING",
                        "GENERAL_AGENCY_AGREEMENT"
                    ]
                },
                "returnShipmentDetail": {
                    "returnEmailDetail": {
                        "merchantPhoneNumber": "19012635656",
                        "allowedSpecialService": [
                            "SATURDAY_DELIVERY"
                        ]
                    },
                    "rma": {
                        "reason": "Wrong Size or Color"
                    },
                    "returnAssociationDetail": {
                        "shipDatestamp": "2019-10-01",
                        "trackingNumber": "123456789"
                    },
                    "returnType": "PRINT_RETURN_LABEL"
                },
                "deliveryOnInvoiceAcceptanceDetail": {
                    "recipient": {
                        "address": {
                            "streetLines": [
                                "23, RUE JOSEPH-DE MA",
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
                            "phoneExtension": "000",
                            "phoneNumber": "1234567890",
                            "companyName": "Fedex"
                        },
                        "tins": [
                            {
                                "number": "123567",
                                "tinType": "FEDERAL",
                                "usage": "usage",
                                "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                "expirationDate": "2000-01-23T04:56:07.000+00:00"
                            }
                        ],
                        "deliveryInstructions": "Delivery Instructions"
                    }
                },
                "internationalTrafficInArmsRegulationsDetail": {
                    "licenseOrExemptionNumber": "9871234"
                },
                "pendingShipmentDetail": {
                    "pendingShipmentType": "EMAIL",
                    "processingOptions": {
                        "options": [
                            "ALLOW_MODIFICATIONS"
                        ]
                    },
                    "recommendedDocumentSpecification": {
                        "types": "ANTIQUE_STATEMENT_EUROPEAN_UNION"
                    },
                    "emailLabelDetail": {
                        "recipients": [
                            {
                                "emailAddress": "neena@fedex.com",
                                "optionsRequested": {
                                    "options": [
                                        "PRODUCE_PAPERLESS_SHIPPING_FORMAT",
                                        "SUPPRESS_ACCESS_EMAILS"
                                    ]
                                },
                                "role": "SHIPMENT_COMPLETOR",
                                "locale": "en_US"
                            }
                        ],
                        "message": "your optional message"
                    },
                    "attachedDocuments": [
                        {
                            "documentType": "PRO_FORMA_INVOICE",
                            "documentReference": "DocumentReference",
                            "description": "PRO FORMA INVOICE",
                            "documentId": "090927d680038c61"
                        }
                    ],
                    "expirationTimeStamp": "2020-01-01"
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
                            "phoneExtension": "000",
                            "phoneNumber": "XXXX345671",
                            "companyName": "Fedex"
                        },
                        "accountNumber": {
                            "value": "740561073"
                        },
                        "tins": [
                            {
                                "number": "123567",
                                "tinType": "FEDERAL",
                                "usage": "usage",
                                "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                "expirationDate": "2000-01-23T04:56:07.000+00:00"
                            }
                        ]
                    },
                    "remitToName": "remitToName",
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
                    "codCollectionAmount": {
                        "amount": 12.45,
                        "currency": "USD"
                    },
                    "returnReferenceIndicatorType": "INVOICE",
                    "shipmentCodAmount": {
                        "amount": 12.45,
                        "currency": "USD"
                    }
                },
                "shipmentDryIceDetail": {
                    "totalWeight": {
                        "units": "LB",
                        "value": 10
                    },
                    "packageCount": 12
                },
                "internationalControlledExportDetail": {
                    "licenseOrPermitExpirationDate": "2019-12-03",
                    "licenseOrPermitNumber": "11",
                    "entryNumber": "125",
                    "foreignTradeZoneCode": "US",
                    "type": "WAREHOUSE_WITHDRAWAL"
                },
                "homeDeliveryPremiumDetail": {
                    "phoneNumber": {
                        "areaCode": "901",
                        "localNumber": "3575012",
                        "extension": "200",
                        "personalIdentificationNumber": "98712345"
                    },
                    "deliveryDate": "2019-06-26",
                    "homedeliveryPremiumType": "APPOINTMENT"
                }
            },
            "emailNotificationDetail": {
                "aggregationType": "PER_PACKAGE",
                "emailNotificationRecipients": [
                    {
                        "name": "Joe Smith",
                        "emailNotificationRecipientType": "SHIPPER",
                        "emailAddress": "jsmith3@aol.com",
                        "notificationFormatType": "TEXT",
                        "notificationType": "EMAIL",
                        "locale": "en_US",
                        "notificationEventType": [
                            "ON_PICKUP_DRIVER_ARRIVED",
                            "ON_SHIPMENT"
                        ]
                    }
                ],
                "personalMessage": "your personal message here"
            },
            "expressFreightDetail": {
                "bookingConfirmationNumber": "123456789812",
                "shippersLoadAndCount": 123,
                "packingListEnclosed": true
            },
            "variableHandlingChargeDetail": {
                "rateType": "PREFERRED_CURRENCY",
                "percentValue": 12.45,
                "rateLevelType": "INDIVIDUAL_PACKAGE_RATE",
                "fixedValue": {
                    "amount": 24.45,
                    "currency": "USD"
                },
                "rateElementBasis": "NET_CHARGE_EXCLUDING_TAXES"
            },
            "customsClearanceDetail": {
                "regulatoryControls": "NOT_IN_FREE_CIRCULATION",
                "brokers": [
                    {
                        "broker": {
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
                                "phoneExtension": 91,
                                "companyName": "Fedex",
                                "faxNumber": 1234567
                            },
                            "accountNumber": {
                                "value": "740561073"
                            },
                            "tins": [
                                {
                                    "number": "number",
                                    "tinType": "FEDERAL",
                                    "usage": "usage",
                                    "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                    "expirationDate": "2000-01-23T04:56:07.000+00:00"
                                }
                            ],
                            "deliveryInstructions": "deliveryInstructions"
                        },
                        "type": "IMPORT"
                    }
                ],
                "commercialInvoice": {
                    "originatorName": "originator Name",
                    "comments": [
                        "optional comments for the commercial invoice"
                    ],
                    "customerReferences": [
                        {
                            "customerReferenceType": "INVOICE_NUMBER",
                            "value": "3686"
                        }
                    ],
                    "taxesOrMiscellaneousCharge": {
                        "amount": 12.45,
                        "currency": "USD"
                    },
                    "taxesOrMiscellaneousChargeType": "COMMISSIONS",
                    "freightCharge": {
                        "amount": 12.45,
                        "currency": "USD"
                    },
                    "packingCosts": {
                        "amount": 12.45,
                        "currency": "USD"
                    },
                    "handlingCosts": {
                        "amount": 12.45,
                        "currency": "USD"
                    },
                    "declarationStatement": "declarationStatement",
                    "termsOfSale": "FCA",
                    "specialInstructions": "specialInstructions\"",
                    "shipmentPurpose": "REPAIR_AND_RETURN",
                    "emailNotificationDetail": {
                        "emailAddress": "neena@fedex.com",
                        "type": "EMAILED",
                        "recipientType": "SHIPPER"
                    }
                },
                "freightOnValue": "OWN_RISK",
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
                                "postalCode": "38127",
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
                                "value": "740561073"
                            },
                            "tins": [
                                {
                                    "number": "number",
                                    "tinType": "FEDERAL",
                                    "usage": "usage",
                                    "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                    "expirationDate": "2000-01-23T04:56:07.000+00:00"
                                },
                                {
                                    "number": "number",
                                    "tinType": "FEDERAL",
                                    "usage": "usage",
                                    "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                    "expirationDate": "2000-01-23T04:56:07.000+00:00"
                                }
                            ]
                        }
                    },
                    "billingDetails": {
                        "billingCode": "billingCode",
                        "billingType": "billingType",
                        "aliasId": "aliasId",
                        "accountNickname": "accountNickname",
                        "accountNumber": "740561073",
                        "accountNumberCountryCode": "US"
                    },
                    "paymentType": "SENDER"
                },
                "commodities": [
                    {
                        "unitPrice": {
                            "amount": 12.45,
                            "currency": "USD"
                        },
                        "additionalMeasures": [
                            {
                                "quantity": 12.45,
                                "units": "KG"
                            }
                        ],
                        "numberOfPieces": 12,
                        "quantity": 125,
                        "quantityUnits": "Ea",
                        "customsValue": {
                            "amount": "1556.25",
                            "currency": "USD"
                        },
                        "countryOfManufacture": "US",
                        "cIMarksAndNumbers": "87123",
                        "harmonizedCode": "0613",
                        "description": "description",
                        "name": "non-threaded rivets",
                        "weight": {
                            "units": "KG",
                            "value": 68
                        },
                        "exportLicenseNumber": "26456",
                        "exportLicenseExpirationDate": "2023-02-14T19:55:35Z",
                        "partNumber": "167",
                        "purpose": "BUSINESS",
                        "usmcaDetail": {
                            "originCriterion": "A"
                        }
                    }
                ],
                "isDocumentOnly": true,
                "recipientCustomsId": {
                    "type": "PASSPORT",
                    "value": "123"
                },
                "customsOption": {
                    "description": "Description",
                    "type": "COURTESY_RETURN_LABEL"
                },
                "importerOfRecord": {
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
                        "phoneExtension": "000",
                        "phoneNumber": "XXXX345671",
                        "companyName": "Fedex"
                    },
                    "accountNumber": {
                        "value": "740561073"
                    },
                    "tins": [
                        {
                            "number": "123567",
                            "tinType": "FEDERAL",
                            "usage": "usage",
                            "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                            "expirationDate": "2000-01-23T04:56:07.000+00:00"
                        }
                    ]
                },
                "generatedDocumentLocale": "en_US",
                "exportDetail": {
                    "destinationControlDetail": {
                        "endUser": "dest country user",
                        "statementTypes": "DEPARTMENT_OF_COMMERCE",
                        "destinationCountries": [
                            "USA",
                            "India"
                        ]
                    },
                    "b13AFilingOption": "NOT_REQUIRED",
                    "exportComplianceStatement": "12345678901234567",
                    "permitNumber": "12345"
                },
                "totalCustomsValue": {
                    "amount": 12.45,
                    "currency": "USD"
                },
                "partiesToTransactionAreRelated": true,
                "declarationStatementDetail": {
                    "usmcaLowValueStatementDetail": {
                        "countryOfOriginLowValueDocumentRequested": true,
                        "customsRole": "EXPORTER"
                    }
                },
                "insuranceCharge": {
                    "amount": 12.45,
                    "currency": "USD"
                }
            },
            "smartPostInfoDetail": {
                "ancillaryEndorsement": "RETURN_SERVICE",
                "hubId": "5015",
                "indicia": "PRESORTED_STANDARD",
                "specialServices": "USPS_DELIVERY_CONFIRMATION"
            },
            "blockInsightVisibility": true,
            "labelSpecification": {
                "labelFormatType": "COMMON2D",
                "labelOrder": "SHIPPING_LABEL_FIRST",
                "customerSpecifiedDetail": {
                    "maskedData": [
                        "CUSTOMS_VALUE",
                        "TOTAL_WEIGHT"
                    ],
                    "regulatoryLabels": [
                        {
                            "generationOptions": "CONTENT_ON_SHIPPING_LABEL_ONLY",
                            "type": "ALCOHOL_SHIPMENT_LABEL"
                        }
                    ],
                    "additionalLabels": [
                        {
                            "type": "CONSIGNEE",
                            "count": 1
                        }
                    ],
                    "docTabContent": {
                        "docTabContentType": "BARCODED",
                        "zone001": {
                            "docTabZoneSpecifications": [
                                {
                                    "zoneNumber": 0,
                                    "header": "string",
                                    "dataField": "string",
                                    "literalValue": "string",
                                    "justification": "RIGHT"
                                }
                            ]
                        },
                        "barcoded": {
                            "symbology": "UCC128",
                            "specification": {
                                "zoneNumber": 0,
                                "header": "string",
                                "dataField": "string",
                                "literalValue": "string",
                                "justification": "RIGHT"
                            }
                        }
                    }
                },
                "printedLabelOrigin": {
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
                "labelStockType": "PAPER_85X11_TOP_HALF_LABEL",
                "labelRotation": "UPSIDE_DOWN",
                "imageType": "PDF",
                "labelPrintingOrientation": "TOP_EDGE_OF_TEXT_FIRST",
                "returnedDispositionDetail": true
            },
            "shippingDocumentSpecification": {
                "generalAgencyAgreementDetail": {
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US",
                        "docType": "PDF"
                    }
                },
                "returnInstructionsDetail": {
                    "customText": "This is additional text printed on Return instr",
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US\"",
                        "docType": "PNG"
                    }
                },
                "op900Detail": {
                    "customerImageUsages": [
                        {
                            "id": "IMAGE_5",
                            "type": "SIGNATURE",
                            "providedImageType": "SIGNATURE"
                        }
                    ],
                    "signatureName": "Signature Name",
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US",
                        "docType": "PDF"
                    }
                },
                "usmcaCertificationOfOriginDetail": {
                    "customerImageUsages": [
                        {
                            "id": "IMAGE_5",
                            "type": "SIGNATURE",
                            "providedImageType": "SIGNATURE"
                        }
                    ],
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US",
                        "docType": "PDF"
                    },
                    "certifierSpecification": "EXPORTER",
                    "importerSpecification": "UNKNOWN",
                    "producerSpecification": "SAME_AS_EXPORTER",
                    "producer": {
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
                            "phoneExtension": "000",
                            "phoneNumber": "XXXX345671",
                            "companyName": "Fedex"
                        },
                        "accountNumber": {
                            "value": "740561073"
                        },
                        "tins": [
                            {
                                "number": "123567",
                                "tinType": "FEDERAL",
                                "usage": "usage",
                                "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                "expirationDate": "2000-01-23T04:56:07.000+00:00"
                            }
                        ]
                    },
                    "blanketPeriod": {
                        "begins": "22-01-2020",
                        "ends": "2-01-2020"
                    },
                    "certifierJobTitle": "Manager"
                },
                "usmcaCommercialInvoiceCertificationOfOriginDetail": {
                    "customerImageUsages": [
                        {
                            "id": "IMAGE_5",
                            "type": "SIGNATURE",
                            "providedImageType": "SIGNATURE"
                        }
                    ],
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US",
                        "docType": "PDF"
                    },
                    "certifierSpecification": "EXPORTER",
                    "importerSpecification": "UNKNOWN",
                    "producerSpecification": "SAME_AS_EXPORTER",
                    "producer": {
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
                            "phoneExtension": "000",
                            "phoneNumber": "XXXX345671",
                            "companyName": "Fedex"
                        },
                        "accountNumber": {
                            "value": "740561073"
                        },
                        "tins": [
                            {
                                "number": "123567",
                                "tinType": "FEDERAL",
                                "usage": "usage",
                                "effectiveDate": "2000-01-23T04:56:07.000+00:00",
                                "expirationDate": "2000-01-23T04:56:07.000+00:00"
                            }
                        ]
                    },
                    "certifierJobTitle": "Manager"
                },
                "shippingDocumentTypes": [
                    "RETURN_INSTRUCTIONS"
                ],
                "certificateOfOrigin": {
                    "customerImageUsages": [
                        {
                            "id": "IMAGE_5",
                            "type": "SIGNATURE",
                            "providedImageType": "SIGNATURE"
                        }
                    ],
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US",
                        "docType": "PDF"
                    }
                },
                "commercialInvoiceDetail": {
                    "customerImageUsages": [
                        {
                            "id": "IMAGE_5",
                            "type": "SIGNATURE",
                            "providedImageType": "SIGNATURE"
                        }
                    ],
                    "documentFormat": {
                        "provideInstructions": true,
                        "optionsRequested": {
                            "options": [
                                "SUPPRESS_ADDITIONAL_LANGUAGES",
                                "SHIPPING_LABEL_LAST"
                            ]
                        },
                        "stockType": "PAPER_LETTER",
                        "dispositions": [
                            {
                                "eMailDetail": {
                                    "eMailRecipients": [
                                        {
                                            "emailAddress": "email@fedex.com",
                                            "recipientType": "THIRD_PARTY"
                                        }
                                    ],
                                    "locale": "en_US",
                                    "grouping": "NONE"
                                },
                                "dispositionType": "CONFIRMED"
                            }
                        ],
                        "locale": "en_US",
                        "docType": "PDF"
                    }
                }
            },
            "rateRequestType": [
                "LIST",
                "PREFERRED"
            ],
            "preferredCurrency": "USD",
            "totalPackageCount": 25,
            "masterTrackingId": {
                "formId": "0201",
                "trackingIdType": "EXPRESS",
                "uspsApplicationId": "92",
                "trackingNumber": "49092000070120032835"
            },
            "requestedPackageLineItems": [
                {
                    "sequenceNumber": "1",
                    "subPackagingType": "BUCKET",
                    "customerReferences": [
                        {
                            "customerReferenceType": "INVOICE_NUMBER",
                            "value": "3686"
                        }
                    ],
                    "declaredValue": {
                        "amount": 12.45,
                        "currency": "USD"
                    },
                    "weight": {
                        "units": "KG",
                        "value": 68
                    },
                    "dimensions": {
                        "length": 100,
                        "width": 50,
                        "height": 30,
                        "units": "CM"
                    },
                    "groupPackageCount": 2,
                    "itemDescriptionForClearance": "description",
                    "contentRecord": [
                        {
                            "itemNumber": "2876",
                            "receivedQuantity": 256,
                            "description": "Description",
                            "partNumber": "456"
                        }
                    ],
                    "itemDescription": "item description for the package",
                    "variableHandlingChargeDetail": {
                        "rateType": "PREFERRED_CURRENCY",
                        "percentValue": 12.45,
                        "rateLevelType": "INDIVIDUAL_PACKAGE_RATE",
                        "fixedValue": {
                            "amount": 24.45,
                            "currency": "USD"
                        },
                        "rateElementBasis": "NET_CHARGE_EXCLUDING_TAXES"
                    },
                    "packageSpecialServices": {
                        "specialServiceTypes": [
                            "ALCOHOL",
                            "NON_STANDARD_CONTAINER"
                        ],
                        "signatureOptionType": "ADULT",
                        "priorityAlertDetail": {
                            "enhancementTypes": [
                                "PRIORITY_ALERT_PLUS"
                            ],
                            "content": [
                                "string"
                            ]
                        },
                        "signatureOptionDetail": {
                            "signatureReleaseNumber": "23456"
                        },
                        "alcoholDetail": {
                            "alcoholRecipientType": "LICENSEE",
                            "shipperAgreementType": "Retailer"
                        },
                        "dangerousGoodsDetail": {
                            "cargoAircraftOnly": false,
                            "accessibility": "INACCESSIBLE",
                            "options": [
                                "LIMITED_QUANTITIES_COMMODITIES",
                                "ORM_D"
                            ]
                        },
                        "packageCODDetail": {
                            "codCollectionAmount": {
                                "amount": 12.45,
                                "currency": "USD"
                            }
                        },
                        "pieceCountVerificationBoxCount": 0,
                        "batteryDetails": [
                            {
                                "batteryPackingType": "CONTAINED_IN_EQUIPMENT",
                                "batteryRegulatoryType": "IATA_SECTION_II",
                                "batteryMaterialType": "LITHIUM_METAL"
                            }
                        ],
                        "dryIceWeight": {
                            "units": "KG",
                            "value": 68
                        }
                    },
                    "trackingNumber": "756477399"
                }
            ]
        },
        "labelResponseOptions": "LABEL",
        "accountNumber": {
            "value": "740561073"
        },
        "shipAction": "CONFIRM",
        "processingOptionType": "ALLOW_ASYNCHRONOUS",
        "oneLabelAtATime": true
    },
    myData: {
        "@odata.etag": "W/\"JzE5Ozg4ODEwNjU0MjY2MTc5OTQyNjExOzAwOyc=\"",
        "SystemId": "b4f1ea0d-5960-ed11-8c34-000d3a05b6ae",
        "no": "SO34563",
        "sellToContactNo": "CT207815",
        "sellToContact": "JACQUE (SHIPMENT & ORDER)",
        "shippingAgentCode": "FEDEX",
        "shipToPostCode": "33487",
        "shipToContact": "JACQUE",
        "shipToAddress": "7670 N.W. 6th Avenue",
        "shipToAddress2": "",
        "shipToCity": "Boca Raton",
        "shipToCounty": "FL",
        "shipToCountryRegionCode": "US",
        "shipToEmail": "",
        "ShipToPhoneNo": "561 997 0800",
        "shippingAgentServiceCode": "GROUND",
        "shipmentMethodCode": "EXW",
        "shipToName": "NORBAR FABRICS",
        "externalDocumentNo": "TEST 11-09-2022",
        "locationCode": "SYOSSET",
        "sellToPhoneNo": "(561) 997 0800",
        "status": "Released",
        "amount": 414.38,
        "shipmentDate": "2022-11-09",
        "sellToEMail": "JACQUE@NORBARFABRICS.COM",
        "trackingNo": "",
        "addressValidated": true,
        "residential": false,
        "edcSalesLines": [
            {
                "@odata.etag": "W/\"JzIwOzE0OTMxNTEzNTczNzE1NzkyMTk3MTswMDsn\"",
                "systemId": "2b10d620-5960-ed11-8c34-000d3a05b6ae",
                "documentNo": "SO34563",
                "lineNo": 10000,
                "type": "Item",
                "no": "I10123-035",
                "description": "AVIANA-FOG",
                "description2": "",
                "unitOfMeasureCode": "YDS",
                "unitPrice": 7.5,
                "itemCategoryCode": "AVIANA",
                "quantity": 55.25,
                "outstandingQuantity": 55.25,
                "promisedDeliveryDate": "0001-01-01",
                "requestedDeliveryDate": "0001-01-01",
                "lineAmount": 414.38,
                "lineDiscountAmount": 0,
                "amountIncludingVAT": 414.38
            }
        ],
        "edcWhseShipments": [
            {
                "@odata.etag": "W/\"JzE5OzU1OTAxMDM0ODMwNzY2ODk2MDcxOzAwOyc=\"",
                "orderNo": "SO34563",
                "whseShipNo": "SH042013",
                "CodAmount": 0,
                "CashOnDelivery": false,
                "CharegesPayBy": "RECEIVER",
                "GrossWeight": 1,
                "InsuranceAmount": 0,
                "ShippingAccountNo": "011706460",
                "SignatureRequired": false,
                "ThirdParty": false,
                "ThirdPartyAccountNo": "",
                "BoxCode": "DEFAULT2",
                "NoofBoxes": 1
            }
        ],
        "edcCustomers": [
            {
                "@odata.etag": "W/\"JzIwOzE2NzYwNDQ3MzcxMDUwOTg0OTIyMTswMDsn\"",
                "systemId": "d98b56dc-9dde-ec11-b2d3-00155d019d14",
                "no": "C00653",
                "name": "NORBAR FABRICS",
                "name2": "J-NB",
                "searchName": "NORBAR FABRICS",
                "address": "7670 NW 6TH AVE",
                "address2": "",
                "city": "BOCA RATON",
                "postCode": "33487",
                "county": "FL",
                "countryRegionCode": "US",
                "currencyCode": "",
                "eMail": "JACQUE@NORBARFABRICS.COM",
                "faxNo": "(561) 997 0801",
                "mobilePhoneNo": "",
                "vatRegistrationNo": "",
                "territoryCode": "",
                "salespersonCode": "SP0012",
                "phoneNo": "(561) 997 0800",
                "homePage": "",
                "creditLimitLCY": 100000,
                "contact": "JACQUE (SHIPMENT & ORDER)",
                "contactID": "00000000-0000-0000-0000-000000000000",
                "balanceLCY": 42478.07,
                "paymentTermsCode": "60",
                "customerPriceGroup": "H-JOBBER",
                "paymentMethodCode": "CHECK",
                "locationCode": "SYOSSET",
                "apiSync": false
            }
        ]
    }
};


const URL = "https://api.mercadopago.com/instore/qr/buyer/test/collectors/{COLLECTOR_ID}/stores/{EXTERNAL_STORE_ID}/pos/{EXTERNAL_POS_ID}/orders?access_token={ACCESS_TOKEN}";

const QRC_VERSIONS = [
        {
            id: "new_flow_sandbox",
            displayName: "Nuevo flujo (SANDBOX)",
            url: "https://api.mercadopago.com/instore/qr/buyer/sandbox/collectors/{COLLECTOR_ID}/stores/{EXTERNAL_STORE_ID}/pos/{EXTERNAL_POS_ID}/orders?access_token={ACCESS_TOKEN}",
            body: JSON.stringify({
                "external_reference": "{EXTERNAL_REFERENCE}",
                "items": [
                    {
                        "unit_price": "{PAYMENT_AMOUNT}",
                        "total_amount": "{PAYMENT_AMOUNT}",
                        "description": "{ITEM_DESCRIPTION}",
                        "title": "{ITEM_DESCRIPTION}",
                        "quantity": 1,
                        "unit_measure": "test_item_unit_measure",
                    }
                ],
                "title": "{ORDER_TITLE}",
                "description": "{ORDER_DESCRIPTION}",
                "total_amount": "{TOTAL_AMOUNT}",
                "payment_token": "{QR_CONTENT}",
                "cash_out": {
                    "amount": "{CASHOUT_AMOUNT}"
                },

                }),
            allowExtraCash: true
        },
        {
            id: "new_flow_test",
            displayName: "Nuevo flujo (Test)",
            url: "https://api.mercadopago.com/instore/qr/buyer/test/collectors/{COLLECTOR_ID}/stores/{EXTERNAL_STORE_ID}/pos/{EXTERNAL_POS_ID}/orders?access_token={ACCESS_TOKEN}",
            body: JSON.stringify({
                "external_reference": "{EXTERNAL_REFERENCE}",
                "items": [
                    {
                        "unit_price": "{PAYMENT_AMOUNT}",
                        "total_amount": "{PAYMENT_AMOUNT}",
                        "description": "{ITEM_DESCRIPTION}",
                        "title": "{ITEM_DESCRIPTION}",
                        "quantity": 1,
                        "unit_measure": "test_item_unit_measure",
                    }
                ],
                "title": "{ORDER_TITLE}",
                "description": "{ORDER_DESCRIPTION}",
                "total_amount": "{TOTAL_AMOUNT}",
                "payment_token": "{QR_CONTENT}",
                "cash_out": {
                    "amount": "{CASHOUT_AMOUNT}"
                },

                }),
            allowExtraCash: true
        }, 
        {
            id: "QRC",
            displayName: "Nuevo flujo (Prod)",
            url: "https://api.mercadopago.com/instore/qr/buyer/collectors/{COLLECTOR_ID}/stores/{EXTERNAL_STORE_ID}/pos/{EXTERNAL_POS_ID}/orders?access_token={ACCESS_TOKEN}",
            body: JSON.stringify({
                "external_reference": "{EXTERNAL_REFERENCE}",
                "items": [
                    {
                        "unit_price": "{PAYMENT_AMOUNT_1}",
                        "total_amount": "{PAYMENT_AMOUNT_1}",
                        "description": "{ITEM_DESCRIPTION_1}",
                        "title": "{ITEM_DESCRIPTION_1}",
                        "quantity": 1,
                        "unit_measure": "test_item_unit_measure",
                    },
                    {
                        "unit_price": "{PAYMENT_AMOUNT_2}",
                        "total_amount": "{PAYMENT_AMOUNT_2}",
                        "description": "{ITEM_DESCRIPTION_2}",
                        "title": "{ITEM_DESCRIPTION_2}",
                        "quantity": 1,
                        "unit_measure": "test_item_unit_measure",
                    }
                ],
                "title": "{ORDER_TITLE}",
                "description": "{ORDER_DESCRIPTION}",
                "total_amount": "{TOTAL_AMOUNT}",
                "payment_token": "{QR_CONTENT}",
                "cash_out": {
                    "amount": "{CASHOUT_AMOUNT}"
                },

                }),
            allowExtraCash: false
        },
        {
            id: "old_flow_test",
            displayName: "Flujo viejo (Test)",
            url: "https://api.mercadopago.com/instore/middleware/test/advanced_payments?access_token={ACCESS_TOKEN}",
            body: JSON.stringify({
                    "binary_mode": true,
                    "disbursements": [
                            {
                                "collector_id": "{COLLECTOR_ID}"
                            }
                        ],
                    "payer": {
                        "token": "{QR_CONTENT}"
                    },
                    "external_pos_id": "{EXTERNAL_POS_ID}",
                    "wallet_payment": {
                        "description": "{ITEM_DESCRIPTION}",
                        "external_reference": "{EXTERNAL_REFERENCE}",
                        "transaction_amount": "{PAYMENT_AMOUNT}"
                    }
                }),
            allowExtraCash: false
        }, 
        {
            id: "old_flow_prod",
            displayName: "Flujo viejo (Prod)",
            url: "https://api.mercadopago.com/instore/middleware/advanced_payments?access_token={ACCESS_TOKEN}",
            body: JSON.stringify({
                    "binary_mode": true,
                    "disbursements": [
                            {
                                "collector_id": "{COLLECTOR_ID}"
                            }
                        ],
                    "payer": {
                        "token": "{QR_CONTENT}"
                    },
                    "external_pos_id": "{EXTERNAL_POS_ID}",
                    "wallet_payment": {
                        "description": "{ITEM_DESCRIPTION}",
                        "external_reference": "{EXTERNAL_REFERENCE}",
                        "transaction_amount": "{PAYMENT_AMOUNT}"
                    }
                }),
            allowExtraCash: false
        }
    ];

const COLLECTORS = [
        {
            displayName: "MLM",
            id: "543074053",
            externalStoreId: "STORE01",
            externalPosId: "STORE01POS01",
            accessToken:"APP_USR-99099799241242-040621-cf36d128f6382f4b394c7550b3e641c6-543074053"
        }, 
        {
            displayName: "MLA",
            id: "493533927",
            externalStoreId: "STORE01",
            externalPosId: "STORE01POS01",
            accessToken:"APP_USR-2976629315334345-120513-c94af40d45e971069c101fec309641d8-493533927"
        }
    ];
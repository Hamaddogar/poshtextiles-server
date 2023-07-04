import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "./table";


const CLIENT_ID = 'my778N8oCwaKq0dSPT1soKY9807OpicK';
const CLIENT_SECRET = 'd_uNVV_XwW8K2wwO7UrEkMIuiokqPLANSUnr6JNP1CcXUbrtgQoTsBSnOJi0ttGF';
const REDIRECT_URI = 'http://localhost:3000/auth_stamps';
const TOKEN_ENDPOINT = 'https://signin.testing.stampsendicia.com/oauth/token';
// const stampsUsername = "poshtext-01";
// const stampsPassword = "April2023!";


// Access Token 
export const request_AccessToken_FEDEXP = async () => {
    try {
        const response = await axios.get(APIS.token_fed);
        return response.data;
    } catch (error) {
        return error
    }
};

// Microsoft
export const request_AccessToken_MICROSOFT = async () => {
    try {
        const response = await axios.post(APIS.token_micro);
        return response.data;
    } catch (error) {
        return error
    }
};

// STAMPS
export const request_AccessToken_STAMPS = async () => {

    try {
        const response = await axios.get(APIS.token_stamps)
        const authWindow = window.open(response.data, '_blank')

        // Wait for code URL to appear
        const codePromise = new Promise((resolve) => {
            const interval = setInterval(() => {
                if (authWindow && authWindow.location.pathname === '/auth_stamps' && authWindow.location.search.includes('code=')) {
                    clearInterval(interval)
                    resolve(authWindow.location.search)
                }
            }, 1000)
        })

        const codeUrl = await codePromise
        const code = new URLSearchParams(codeUrl).get('code')

        // Call API to get token with code
        const tokenResponse = await axios.post(TOKEN_ENDPOINT, {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        });
        // Close the auth window
        authWindow.close()
        await funds_STAMPS(tokenResponse.data.access_token)
        return { token: tokenResponse.data.access_token ? tokenResponse.data.access_token : null, code: code }
    } catch (error) {
        return error
    }
};

export const funds_STAMPS = async (token) => {
    try {
        const response = await axios.post(APIS.funds_STAMP, { token })
        return response.data
    } catch (error) {
        return error
    }
};

// request_AccessToken_STAMPS_server
export const request_AccessToken_STAMPS_server = async () => {
    try {
        const response = await axios.get(APIS.token_stamps)
        return { token: response.data.access_token ? response.data.access_token : null }
    } catch (error) {
        return error
    }
};

// --------------------- create shipment and LABELS --------------------- //

// create shipment FEDEXP
export const create_Shipment_FEDEXP = async (body, token) => {
    try {
        const response = await axios.post(
            APIS.create_shipment,
            {
                token: token,
                body: body,
            });

        return response;
    } catch (error) {
        return error
    }
};

// create shipment UPS
export const createShipment_UPS = async (body) => {
    try {
        const response = await axios.post(
            APIS.create_Shipment_UPS,
            {
                body: body,
            });
        if (response.status >= 400) {
            throw (response)
        } else {
            return response
        }
    } catch (error) {
        return error
    }
};

// create shipment STAMPS
export const create_Shipment_STAMPS = async (token, body) => {
    try {
        const response = await axios.post(
            APIS.create_shipment_stamps,
            {
                token: token,
                body: body,
            });

        return response;
    } catch (error) {
        return error
    }
};


// ---------------------rate list --------------------- //

// UPS
export const rate_List_UPS = async ({ body, toastPermission }) => {
    try {
        const data = await toast.promise(
            axios.post(APIS.rate_list_ups, { body }),
            toastPermission ? { pending: 'Loading Please Wait...', success: 'Response Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
}

// fedexp
export const rate_List_FEDEX = async ({ body, toastPermission, token }) => {
    try {
        const data = await toast.promise(
            axios.post(APIS.rate_list_fedexp, { body, token }),
            toastPermission ? { pending: 'Loading Please Wait...', success: 'Response Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
}

// 4STAMPS
export const rate_List_STAMPS = async (token, body) => {
    try {
        const data = await toast.promise(
            axios.post(APIS.rate_list_stamps, { token, body }),
            { pending: 'Loading Please Wait...', success: 'Response Loaded', error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
};


// --------------------- validate Address --------------------- //
//  fedex
export const validate_Address_FEDEX = async (token, body) => {
    try {
        const response = await axios.post(APIS.check_address_fedexp, { token, body });
        if (response.status >= 400) {
            throw (response)
        } else {
            return response.data
        }
    } catch (error) {
        return error
    }
};

//  UPS
export const validate_Address_UPS = async (body) => {
    try {
        const response = await axios.post(APIS.check_address_ups, { body: body });
        if (response.status >= 400) {
            throw (response)
        } else {
            return response.data
        }
    } catch (error) {
        return error
    }
};

// STAMPS
export const validate_Address_STAMPS = async (token, body) => {
    try {
        const response = await axios.post(APIS.check_address_stamps, { token, body });
        if (response.status >= 400) {
            throw (response)
        } else {
            return response.data
        }
    } catch (error) {
        return error
    }
};


// --------------------- Printing Labels --------------------- //
// UPS + FEDEX +stamps
export const print_Labels = async (base64) => {
    try {
        const response = await axios.post(APIS.printer, { printData: base64 });
        if (response.status >= 400) {
            throw (response)

        } else {
            return response
        }
    } catch (error) {
        return error
    }
};


// create new Order Microsoft
export const create_New_SaleOrder = async ({ token, body, toastPermission }) => {
    try {
        const data = await toast.promise(
            axios.post(APIS.new_order_micro, { token, body }),
            toastPermission ? { pending: 'Loading Please Wait...', success: "Great news! New order created", error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
}

// CSV DATA Comapre 
export const create_New_CSV_SaleOrder = async (token, body) => {
    try {
        const data = await toast.promise(
            axios.post(APIS.csv_order_micro, { token, body }),
            { pending: 'Loading Please Wait...', success: "Great news! New order created", error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
}

// Payment Billto Custer Auth.net
export const customers_Getter = async (token) => {
    try {
        const data = await toast.promise(
            axios.post(APIS.customers_micro, { token }),
            { pending: 'Loading Please Wait...', success: "Great news! Loaded Customer", error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
}

// Create new WH Shipment
export const create_New_Shipment = async (token, body) => {
    try {
        const data = await axios.post(APIS.create_Shipment_micro, { token, body });
        return data.data;
    } catch (error) {
        return error
    }
}

// check_Pick_Details
export const check_Pick_Details = async (token, pickCode) => {
    try {
        const data = await axios.post(APIS.pick_details_micro, { token, pickCode });
        return data.data;
    } catch (error) {
        return error
    }
}

// request_pick_micro
export const request_New_Pick = async (token, body) => {
    try {
        const data = await axios.post(APIS.request_pick_micro, { token, body });
        return data.data;
    } catch (error) {
        return error
    }
}

// pickingPageDealer
export const pickingPageDealer = async ({ token, picks }) => {
    try {
        const data = await axios.post(APIS.pickingPage_micro, { token, picks })
        return data.data;
    } catch (error) {
        return error
    }
}

// PACKING
export const createPacking = async ({ token, body }) => {
    try {
        const data = await axios.post(APIS.createPaking_micro, { token, body })
        return data.data;
    } catch (error) {
        return error
    }
};
// PACKING-REGISTER
export const registerPacking = async ({ token, pkCode }) => {
    try {
        const data = await axios.post(APIS.registerPacking_micro, { token, pkCode })
        return data.data;
    } catch (error) {
        return error
    }
}
// item.itemNo, item.locationCode

// pickingPageDealer
export const getLots = async ({ token, item, locationCode }) => {
    try {
        const data = await axios.post(APIS.gets_lots_detail_micro, { token, item, locationCode })
        return data.data;
    } catch (error) {
        return error
    }
}

// GET-PACKING
export const getPacking = async ({ token, code }) => {
    try {
        const data = await axios.post(APIS.getPacking_micro, { token, code })
        return data.data;
    } catch (error) {
        return error
    }
}
// POST-PACKING
export const postPacking = async ({ token, code }) => {
    try {
        const data = await axios.post(APIS.postPacking_micro, { token, code })
        return data.data;
    } catch (error) {
        return error
    }
}

// patchDetails
export const patchPicking = async ({ token, sysID, body }) => {
    try {
        const data = await axios.post(APIS.patchPicking_micro, { token, sysID, body })
        return data.data;
    } catch (error) {
        return error
    }
}
// --------------------- Authorise Net --------------------- //
// auth_net_charge :"/charge_card",
export const chargeCard = async ({ amount, cardNumber, expirationDate, cvv }) => {
    try {
        const data = await axios.post(APIS.auth_net_charge, { amount, cardNumber, expirationDate, cvv })
        return data.data;
    } catch (error) {
        return error
    }
}
import axios from "axios";
import { toast } from "react-toastify";
import { loginRequest } from "./authConfig";
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
export const request_AccessToken_MICROSOFT = async (instance, accounts) => {
    return instance
        .acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
        .then((response) => response.accessToken)
};

// STTAMPS
export const request_AccessToken_STAMPS = async () => {

    try {
        const response = await axios.get("http://localhost:8080/auth")
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
        const response = await axios.post("http://localhost:8080/auth_stamps", { token })
        console.log("balance", response.data);
        return response.data
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
            toastPermission ? { pending: 'Loading Please Wait...', success: 'Response Loaded', error: 'Something Went Wrong' } : { error: 'Something Went Wrong' },
            { autoClose: 1500, hideProgressBar: true }
        );
        return data.data;
    } catch (error) {
        return error
    }
}


import axios from "axios";
import { toast } from "react-toastify";
import { loginRequest } from "./authConfig";
import { APIS } from "./table";



// Access Token 
export const request_AccessToken_FEDEXP = async () => {
    try {
        const response = await axios.get(APIS.token_fed);
        return response.data;
    } catch (error) {
        return error
    }
};


// 
export const request_AccessToken_MICROSOFT = async (instance, accounts) => {
    return instance
        .acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
        .then((response) => response.accessToken)
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


// --------------------- Printing Labels --------------------- //
// UPS + FEDEX
export const print_Labels = async (base64) => {
    try {
        const response = await axios.post(APIS.printUPS, { printData: base64 });
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


import axios from "axios";
import { toast } from "react-toastify";
import { loginRequest } from "./authConfig";
import { APIS } from "./table";



// Access Token 
export const requestAccessToken_FEDEXP = async () => {
    try {
        const response = await axios.get('http://localhost:8080/fedexp_token');
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve access token');
    }
};


// 
export const requestAccessToken_MICROSOFT = async (instance, accounts) => {
    return instance
        .acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
        .then((response) => response.accessToken)
};


// create shipment FEDEXP
export const createShipment_FEDEXP = async (body, token) => {
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
            APIS.create_shipment_ups,
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

export const rateListUPS = async ({ body, toastPermission }) => {
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
export const rateListFEDEXP = async ({ body, toastPermission, token }) => {
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
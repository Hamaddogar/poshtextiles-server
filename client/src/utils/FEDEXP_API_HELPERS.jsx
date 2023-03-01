import axios from "axios";
import { API, CORS_Proxy, FEDEXP_Sandbox_Server } from "./confidential";
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
export const requestAccessToken_MICROSOFT = async () => {
    try {
        const response = await axios.get('http://localhost:8080/token_microsoft');
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve access token');
    }
};



// Track Pasrsels Multiple 
export const getMultiplePackageTrackingInfo_FEDEXP = async (body, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${token}`,
        }
    };

    try {
        const response = await axios.post(
            CORS_Proxy + FEDEXP_Sandbox_Server + API.fedexp.track_Multiple,
            body,
            config
        );

        return response.data;
    } catch (error) {
        return error;
    }
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
            if (response.status >=400) {
                throw (response)
            } else {
                return response
            }
    } catch (error) {
        return error
    }
};

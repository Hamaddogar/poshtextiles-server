import axios from "axios";
import { API, CORS_Proxy, FEDEXP_Sandbox_Server } from "./confidential";



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


// create shipment tag
export const createShipment_FEDEXP = async (body, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-locale": "en_US",
            "Authorization": `Bearer ${token}`,
        }
    };

    try {
        const response = await axios.post(
            CORS_Proxy + FEDEXP_Sandbox_Server + API.fedexp.create_Shipment,
            body,
            config
        );
        return response.data;
    } catch (error) {
        return error
    }
};


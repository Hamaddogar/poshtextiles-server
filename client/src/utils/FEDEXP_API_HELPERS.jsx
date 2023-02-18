import axios from "axios";
import { API, FEDEXP_CLIENT_ID, FEDEXP_CLIENT_SECRET, CORS_Proxy, FEDEXP_Sandbox_Server } from "./confidential";



// Access Token 
export const requestAccessToken_FEDEXP = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    const body = {
        grant_type: 'client_credentials',
        client_id: FEDEXP_CLIENT_ID,
        client_secret: FEDEXP_CLIENT_SECRET
    };

    try {
        const response = await axios.post(
            CORS_Proxy + FEDEXP_Sandbox_Server + API.fedexp.token,
            new URLSearchParams(body).toString(),
            config
        );

        const { access_token } = response.data;
        return access_token;
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


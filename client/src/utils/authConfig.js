import { LogLevel } from "@azure/msal-browser";
import { MICROSOFT_AUTHORITY, MICROSOFT_CLIENT_ID } from "./confidential";

export const msalConfig = {
    auth: {
        clientId: MICROSOFT_CLIENT_ID,
        authority: MICROSOFT_AUTHORITY,
        redirectUri: "http://localhost:3000/",
        // redirectUri: "http://localhost:8080/",
        // redirectUri: "https://poshtextiles.netlify.app/",
        // redirectUri: "https://silktex.com/",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        // console.error(message);
                        return;
                    case LogLevel.Info:
                        // console.info(message);
                        return;
                    case LogLevel.Verbose:
                        // console.debug(message);
                        return;
                    case LogLevel.Warning:
                        // console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};
export const loginRequest = {
    scopes: ["https://api.businesscentral.dynamics.com/.default"]
    // scopes: ["User.Read"]
};

// require('dotenv').config()
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const path = require("path");
const cors = require('cors');
const { SECRETS } = require('./environment/credentials');
const { API_FEDEXP, SERVERS, API_MICROSOFT } = require('./environment/APIs');
const app = express();

// useage
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.static("./build"));
app.use(express.static("./uploads"));
app.use(express.urlencoded({ limit: '200mb', extended: true }));



// ---------------- MiddleWares -------------- //
const cache = {};


// cacheHandler
const cacheHandler = async (req, res, next) => {
    const key = req.originalUrl
    if (cache[key]) res.send(cache[key]);
    else next();
};
// ---------------- Routes -------------- //
const routeStrings = {
    token_fed: '/fedexp_token',
    token_micro: '/token_microsoft',

    sale_orders_micro: '/sales',
    history_micro: '/history',
}

// ---------------- Routes -------------- //

// FedExp-Token
app.get(routeStrings.token_fed, cacheHandler, async (req, res) => {
    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const body = {
        grant_type: SECRETS.GRANT_TYPE_FEDEXP,
        client_id: SECRETS.CLIENT_ID_FEDEXP,
        client_secret: SECRETS.CLIENT_SECRET_FEDEXP
    };

    try {
        const response = await axios.post(
            SERVERS.FEDEXP_Sandbox_Server + API_FEDEXP.Token,
            new URLSearchParams(body).toString(),
            config
        );

        if (response?.data?.access_token) {
            cache[routeStrings.token_fed] = response.data.access_token
            res.status(response.status).send(response.data.access_token);
        }
        else {
            throw new Error('Server Error');
        }


    } catch (error) {
        res.send(error)
    }
});

// microsoft token
app.get(routeStrings.token_micro, cacheHandler, async (req, res) => {

    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const body = {
        grant_type: SECRETS.GRANT_TYPE_MICROSOFT,
        client_id: SECRETS.CLIENT_ID_MICROSOFT,
        client_secret: SECRETS.CLIENT_SECRET_MICROSOFT,
        scope: SECRETS.SCOPE_MICROSOFT
    };

    try {
        const response = await axios.post(
            API_MICROSOFT.Token,
            new URLSearchParams(body).toString(),
            config
        );
        if (response?.data?.access_token) {
            cache[routeStrings.token_micro] = response.data.access_token
            res.status(response.status).send(response.data.access_token);
        }
        else {
            throw new Error('Server Error');
        }


    } catch (error) {
        res.send(error)
    }
});


app.get(routeStrings.sale_orders_micro, async (req, res) => {
    const ttk = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYThmMWE1ZjktZjhiOC00MDBjLTg3YTEtYTcwNGJlMmQ3ZGMyLyIsImlhdCI6MTY3NjcxOTgwMSwibmJmIjoxNjc2NzE5ODAxLCJleHAiOjE2NzY3MjM3MDEsImFpbyI6IkUyWmdZTWg0c3JyNWlkQ1VwZnN6MWFZVk1uODdCZ0E9IiwiYXBwaWQiOiJkYThkYzUzNC1lNjQyLTQ2ZTItOGYyOC01N2JjNzFkODU0YzAiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hOGYxYTVmOS1mOGI4LTQwMGMtODdhMS1hNzA0YmUyZDdkYzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJiMDZjMTliOC01YTAzLTQ0MjQtYWNjMy04OThhODQwYWMwMWYiLCJyaCI6IjAuQVZvQS1hWHhxTGo0REVDSG9hY0V2aTE5d2ozdmJabHNzMU5CaGdlbV9Ud0J1SjlhQUFBLiIsInJvbGVzIjpbIkFQSS5SZWFkV3JpdGUuQWxsIl0sInN1YiI6ImIwNmMxOWI4LTVhMDMtNDQyNC1hY2MzLTg5OGE4NDBhYzAxZiIsInRpZCI6ImE4ZjFhNWY5LWY4YjgtNDAwYy04N2ExLWE3MDRiZTJkN2RjMiIsInV0aSI6IlRSUkx1SUJ2WGtxTXc1b2RSdDg2QUEiLCJ2ZXIiOiIxLjAifQ.ofsBQ_Ru7b0lFZpzOPpcywA_FAtSR7plLBQ3Cfb3XF825biN9SU2I3eFSOL_Nc03mF5jp2sG4SY3ypB0zyqLavO6OA9sZvMe3OnxRuh5JpwQzyQ_5BeKwSHxxLjhoy3e2bw6ZVIegdi13mLtGdaQl0MVV0XmG8AVuiX2KCijJmJmTr9MkTGuaNxe1r7KUwWud_qNPi4sqlxLCb98V-y7LV2E9jNnvXj8SsgtyP0jv9Z8mgiqQAAhZmbguJ9TQzTixEZ5bx25fJZRSNL2zAUBU-sTJLvrmUMXhMJcVQuVu_9UBRJyXxXt9H8koxH99Y4QfVq36txllj5E8nAC8JOAhw'
    const api = "https://api.businesscentral.dynamics.com/v2.0/a8f1a5f9-f8b8-400c-87a1-a704be2d7dc2/Sandbox/api/Edhate/silkapi/v2.0/companies(0f8bab00-aede-ec11-82f8-0022482fff55)/edcSalesOrders?$expand=edcSalesLines,edcCustomers,edcWhseShipments&$count=true"
    const config = {
        headers: {
            // "Authorization": `Bearer ${cache[routeStrings.token_micro]}`,
            "Authorization": `Bearer ${ttk}`,
        }
    };
    try {
        const response = await axios.get(
            // SERVERS.MICROSOFT_Sandbox_Server + API_MICROSOFT.Sales_Orders,
            api,
            config
        );


        // const response = await axios.get(api,
        //     {
        //         method: "GET",
        //         headers: {
        //             "Authorization": `Bearer ${ttk}`,
        //         }
        //     });









        console.log("---------------response--------------");
        console.log(response);
        // if (response?.data?.access_token) {
        //     cache[routeStrings.token_micro] = response.data.access_token
        //     res.status(response.status).send(response.data.access_token);
        // }
        // else {
        //     throw new Error('Server Error');
        // }

        res.status(response.status).send(response.data);

    } catch (error) {
        console.log("---------------error--------------");
        console.log(error);
        res.send(error);
    }
});







// ------------------- Configurations----------------- //


// // Set up a cron job to run the route every day at 9:00 AM
// const schedule_daily_9am = '0 9 * * *';

// // Set up a cron job to run the route every 50 minumtes
// const schedule_fivr_minutes = '*/50 * * * *';


// cron.schedule(schedule_fivr_minutes, () => {
//     console.log('Running the cron job...');
//     axios.get('http://localhost:3000/fedexp_token');
//     axios.get('http://localhost:3000/fedexp_token');
// });


// server configuration
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}
app.listen(PORT, () => { console.log('server is running'); })

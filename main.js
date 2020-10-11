const fetch = require('node-fetch');


const API_VER = '1.8';
const API_URL = `https://api.tjournal.ru/v${API_VER}`;

const APP_NAME = 'DimenteriosFoxTestApp';
const VERSION = "0.1.0";

HEADERS_NO_AUTH = { 'User-Agent': `${APP_NAME}-app/${VERSION}` };


entry_id = 221782;
comment_id = 4263642;

request_url = `${API_URL}/entry/${entry_id}/comments/thread/${comment_id}`;
console.log(`Request: ${request_url}.`);

(async () => {
    let get_resp_json = () => fetch(request_url, { headers: HEADERS_NO_AUTH })
        .then(res => res.ok ? res : Promise.reject(res))
        .then(response => response.json());

    let first_comment = await get_resp_json()
        .then(json => json["result"]["items"][0])
        .catch(function (error) {
            console.log("Request failed!")
            return {}
        });

    console.log(first_comment)
})();
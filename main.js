const fetch = require('node-fetch');


const API_VER = '1.8';
const API_URL = `https://api.tjournal.ru/v${API_VER}`;

const APP_NAME = 'DimenteriosFoxTestApp';
const VERSION = "0.1.0";

HEADERS_NO_AUTH = { 'User-Agent': `${APP_NAME}-app/${VERSION}` };


user_id = 107101;
entry_id = 221782;
comment_id = 4263642;

request_url = `${API_URL}/entry/${entry_id}/comments/thread/${comment_id}`;
console.log(`Request: ${request_url}.`);

(async () => {
    const responce = await fetch(request_url, { headers: HEADERS_NO_AUTH });

    if (responce.ok) {
        json_content = await responce.json();
        json_content = json_content["result"];

        console.log(json_content["items"][0]);
    }
})();
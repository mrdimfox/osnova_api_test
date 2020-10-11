const fetch = require('node-fetch');


const API_VER = '1.8';
const API_URL = `https://api.tjournal.ru/v${API_VER}`;

const APP_NAME = 'DimenteriosFoxTestApp';
const VERSION = "0.1.0";

HEADERS_NO_AUTH = { 'User-Agent': `${APP_NAME}-app/${VERSION}` };


const entry_id = 221782;

const TESTING_COMMENT_ID = 4263642;

let comment_ids = new Array(3);
comment_ids.fill(TESTING_COMMENT_ID) // actually should be array of different ids

let request_url_template = (comment_id) => `${API_URL}/entry/${entry_id}/comments/thread/${comment_id}`;

/**
 * Get comment from 221782 entry by id
 * @param {number} comment_id
 * @returns {Object} dict with comment content
 */
async function get_comment(comment_id) {
    const request_url = request_url_template(comment_id);
    console.log(`Request: ${request_url}.`);

    let get_resp_json = () => fetch(request_url, { headers: HEADERS_NO_AUTH })
        .then(res => res.ok ? res : Promise.reject(res))
        .then(response => response.json());

    let first_comment = await get_resp_json()
        .then(json => json["result"]["items"][0])
        .catch(function (error) {
            console.log("Request failed!")
            return {}
        });

    return first_comment;
}

(async () => {
    let tasks = comment_ids.map(async (val) => { return get_comment(val) })
    const comments = await Promise.all(tasks)

    console.log(comments)
})();
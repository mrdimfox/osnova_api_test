const fetch = require('node-fetch');


const API_VER = '1.8';
const API_URL = `https://api.tjournal.ru/v${API_VER}`;

const APP_NAME = 'DimenteriosFoxTestApp';
const VERSION = "0.1.0";

HEADERS_NO_AUTH = { 'User-Agent': `${APP_NAME}-app/${VERSION}` };


const TESTING_ENTRY_ID = 221782;
const TESTING_COMMENT_ID = 4263642;

let comment_ids = new Array(100);
comment_ids.fill(TESTING_COMMENT_ID) // actually should be array of different ids


/**
 * Return URL for requesting comment from entry
 * @param {number} entry_id 
 * @param {number} comment_id 
 */
let request_comment_url_template =
    (entry_id, comment_id) => `${API_URL}/entry/${entry_id}/comments/thread/${comment_id}`;


/**
 * Suspend thread for a little
 * @param {number} t time in msec
 */
const sleep = (t) => ({ then: (r) => setTimeout(r, t) })


function extract_comments_form_dom(comment_elem_class) {
    const comment_elems = document.querySelectorAll(".comments__item")

    let hidden_comment_elems = Array.from(comment_elems).filter(element => {
        // Check only first child to ignore all answers
        return element.children[0].querySelector(".comments__item__self--ignored");
    });

    let comments = hidden_comment_elems.map((element) => {
        return [
            element.dataset.id,
            element
        ]
    });

    return comments;
}


/**
 * Get comment from entry by id
 * @param {number} entry_id
 * @param {number} comment_id
 * @param {number} max_retry_count max count of retry to get message. Detault 10.
 * @returns {string} empty string if comment was not received otherwise html text of comment.
 */
async function get_comment(entry_id, comment_id, max_retry_count = 10) {
    const request_url = request_comment_url_template(entry_id, comment_id);
    console.log(`Request: ${request_url}.`);

    // Await return respoce obj + Optional[json]
    let get_resp_json = () => fetch(request_url, { headers: HEADERS_NO_AUTH })
        .then(resp => resp.ok ? resp : Promise.reject([resp, {}]))
        .then(response => Promise.all([response, response.json()]));

    for (let retry_count = 0; retry_count < max_retry_count; retry_count++) {
        const [first_comment, status] = await get_resp_json()
            .then(result => {
                const [resp, json] = result;
                return [json["result"]["items"][0], resp.status];
            })
            .catch(function (bad_result) {
                const [resp, _] = bad_result;
                console.log(`Request "${request_url}" failed!`);
                return [{}, resp.status];
            });

        // Too many requests
        if (status == 429) {
            await sleep(1000);
            console.log(`Retry ${retry_count}: ${request_url}...`)
            continue;
        }
        else if (status != 200) {
            return ""
        }

        console.log(`Success "${request_url}"!`)
        return first_comment.html;
    }

    console.log(`Request "${request_url}" was not received!`)
    return "";
}

async function replace_hidden_comment(elem) {
    let [element, id] = elem;

    let comment = await get_comment(TESTING_ENTRY_ID, id);
    if (comment) {
        text = element.children[0].querySelector(".comments__item__text");
        element.innerHtml = text
    }
}

(async () => {
    let tasks = comment_ids.map(async (id) => { return get_comment(TESTING_ENTRY_ID, id) })
    const comments = await Promise.all(tasks)

    console.log(comments)
})();
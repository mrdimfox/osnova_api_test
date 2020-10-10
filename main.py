import requests
import json
from pprint import pprint
from typing import Sequence, Any

API_TOKEN = ''
API_URL_BASE = 'https://api.digitalocean.com/v2/'

APP_NAME = 'DimenteriosFoxTestApp'
VERSION = "0.1.0"

HEADERS = {'User-Agent':f'{APP_NAME}-app/{VERSION}',
           'X-Device-Token': '{0}'.format(API_TOKEN)}
HEADERS_NO_AUTH = {'User-Agent':f'{APP_NAME}-app/{VERSION}'}


API_VER = "1.8"
API_URL = f'https://api.tjournal.ru/v{API_VER}'

def _first(seq: Sequence[Any]):
    return seq[0]

def _unwrap_result(json_content: dict):
    return json_content["result"]

def main():
    user_id = 107101
    entry_id = 221782
    comment_id = 4263642

    request = f"{API_URL}/entry/{entry_id}/comments/thread/{comment_id}"
    print(f"Request: {request}.")

    resp = requests.get(url=f"{request}", headers=HEADERS_NO_AUTH)

    print(f"Responce code: {resp.status_code}")

    if resp.status_code == 200:
        json_content = _unwrap_result(resp.json())
        print(f"Responce:")
        pprint(_first(json_content["items"]))

if __name__ == "__main__":
    main()
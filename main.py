import requests

API_TOKEN = ''
API_URL_BASE = 'https://api.digitalocean.com/v2/'

APP_NAME = 'DimenteriosFoxTestApp'
VERSION = "0.1.0"

HEADERS = {'User-Agent':f'{APP_NAME}-app/{VERSION}',
           'X-Device-Token': '{0}'.format(API_TOKEN)}

API_VER = "1.8"
API_URL = f'https://api.tjournal.ru/v{API_VER}'

def main():
    user_id = 107101
    request = f"{API_URL}/user/{user_id}"
    print(f"Request: {request}.")

    resp = requests.get(url=f"{API_URL}/user/{user_id}", headers=HEADERS)

    print(f"Responce code: {resp.status_code}")
    print(f"Responce: {resp.json()}")

if __name__ == "__main__":
    main()
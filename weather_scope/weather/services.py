import requests

def fetch_weather_data(city):
    API_KEY = "528d7740e1b8617f1659948c712e4732"
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
    }
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        return response.json()
    return None
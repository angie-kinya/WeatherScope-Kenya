import requests

def fetch_weather_data(city):
    API_KEY = "YOUR_API_KEY"
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
    }
    print(params)
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print("Failed to fetch weather data")
    return None
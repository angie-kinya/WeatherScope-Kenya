from django.shortcuts import render
from .services import fetch_weather_data
from .models import WeatherQuery

def weather_dashboard(request):
    weather_info = None
    if request.method == "POST":
        city = request.POST.get("city")
        weather_data = fetch_weather_data(city)
        if weather_data:
            weather_info = {
                "city": city,
                "temperature": weather_data["main"]["temp"],
                "description": weather_data["weather"][0]["description"],
                "icon": weather_data["weather"][0]["icon"],
            }
            WeatherQuery.objects.create(city=city)
    return render(request, "weather/dashboard.html", {"weather_info": weather_info})
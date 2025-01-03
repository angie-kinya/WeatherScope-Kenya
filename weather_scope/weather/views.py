from django.shortcuts import render
from .services import fetch_weather_data
from .models import WeatherQuery
from django.utils.timezone import now, localtime
import pytz
from django.db.models import Q
import csv
from django.http import HttpResponse
from django.core.paginator import Paginator

def weather_dashboard(request):
    weather_info = None
    filters = {}
    if request.method == "POST":
        city = request.POST.get("city")
        region = request.POST.get("region", "")
        weather_data = fetch_weather_data(city)
        if weather_data:
            query_time = now().astimezone(pytz.timezone("Africa/Nairobi"))
            weather_info = {
                "city": city,
                "region": region,
                "temperature": weather_data["main"]["temp"],
                "description": weather_data["weather"][0]["description"],
                "icon": weather_data["weather"][0]["icon"],
                "date": query_time.strftime("%A, %d %B %Y"),
                "time": query_time.strftime("%I:%M %p"),
            }
            WeatherQuery.objects.create(city=city, region=region)

    # Filtering by regions
    if request.GET.get("filter_date"):
        filters["query_time__date"] = request.GET.get("filter_date")
    if request.GET.get("filter_region"):
        filters["region__icontains"] = request.GET.get("filter_region")

    filtered_queries = WeatherQuery.objects.filter(**filters).order_by("-query_time")

    # Convert query_time to Nairobi time
    for query in filtered_queries:
        query.query_time = localtime(query.query_time, pytz.timezone("Africa/Nairobi"))

    # Paginate the filtered queries
    paginator = Paginator(filtered_queries, 5) # Show 5 queries per page
    page_number = request.GET.get("page")
    filtered_queries = paginator.get_page(page_number)

    return render(request, "weather/dashboard.html", {
        "weather_info": weather_info, 
        "filtered_queries": filtered_queries
    })  # noqa: E501

def export_to_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="weather_queries.csv"'

    writer = csv.writer(response)
    writer.writerow(["City", "Region", "Query Time"])

    queries = WeatherQuery.objects.all()
    for query in queries:
        query_time = localtime(query.query_time, pytz.timezone("Africa/Nairobi"))
        writer.writerow([query.city, query.region, query_time.strftime("%Y-%m-%d %H:%M:%S")])
    
    return response
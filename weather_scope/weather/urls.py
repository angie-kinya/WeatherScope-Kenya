from django.urls import path
from . import views

urlpatterns = [
    path("api/weather/", views.weather_dashboard, name="weather_dashboard"),
    path("export/", views.export_to_csv, name="export_to_csv"),
]
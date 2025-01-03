from django.db import models

class WeatherQuery(models.Model):
    city = models.CharField(max_length=100)
    region = models.CharField(max_length=100, blank=True) # Kenyan counties or cities
    query_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city}, {self.region}"
from django.db import models

class WeatherQuery(models.Model):
    city = models.CharField(max_length=100)
    query_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.city
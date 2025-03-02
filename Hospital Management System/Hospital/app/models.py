from django.db import models

class Patient(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    problem = models.CharField(max_length=200)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    doctor = models.CharField(max_length=100)
    date = models.DateField()
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return self.name

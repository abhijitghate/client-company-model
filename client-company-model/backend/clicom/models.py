from django.db import models
from phone_field import PhoneField


class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username


class Company(models.Model):
    name = models.EmailField(max_length=100)
    address = models.EmailField(max_length=100)
    phonenumber = PhoneField(unique=True)

    def __str__(self):
        return self.name

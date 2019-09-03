from django.db import models
from phone_field import PhoneField
from django.contrib.auth.models import User


class Company(models.Model):
    name = models.CharField(max_length=100)
    address = models.EmailField(max_length=100)
    phonenumber = PhoneField(unique=True)

    def __str__(self):
        return self.name


class Likes(models.Model):
    company_id = models.ForeignKey(
        Company, related_name='likes_of_company', on_delete="CASCADE")
    user_id = models.ForeignKey(
        User, related_name='likes_by_user', on_delete="CASCADE")

    class Meta:
        unique_together = ('company_id', 'user_id')

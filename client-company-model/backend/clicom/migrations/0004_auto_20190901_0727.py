# Generated by Django 2.2.4 on 2019-09-01 07:27

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clicom', '0003_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likes',
            name='user_id',
            field=models.ForeignKey(on_delete='CASCADE', related_name='likes_by_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]

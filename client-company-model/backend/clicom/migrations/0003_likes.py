# Generated by Django 2.2.4 on 2019-09-01 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clicom', '0002_auto_20190828_1641'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_id', models.ForeignKey(on_delete='CASCADE', related_name='likes_of_company', to='clicom.Company')),
                ('user_id', models.ForeignKey(on_delete='CASCADE', related_name='likes_by_user', to='clicom.User')),
            ],
            options={
                'unique_together': {('company_id', 'user_id')},
            },
        ),
    ]
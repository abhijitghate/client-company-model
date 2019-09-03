from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from clicom.views import test

urlpatterns = [

    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('clicom.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    # url(r'^(?:.*)/?$', test),
    path('', include('clicom.urls')),



]

from django.urls import path, include
from django.conf.urls import url

from .views import CompanyDetailView, CompanyListView, CompanySearchView, DeleteLikesView, CreateLikesView

urlpatterns = [
    path('', CompanyListView.as_view()),
    path('<pk>', CompanyDetailView.as_view()),
    path('delete/(?P<companyid>[-\w]+)', DeleteLikesView.as_view()),
    path('create/', CreateLikesView.as_view()),
    url(r'^(?P<name>.+)/$', CompanySearchView.as_view()),

    # url(r'/[A-Za-z0-9]+/$', CompanySearchView.as_view()),

]

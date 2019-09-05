from django.urls import path, include
from django.conf.urls import url

from .views import CompanyDetailView, CompanyListView, CompanySearchView, DeleteLikesView, CreateLikesView, Favourites

urlpatterns = [
    path('', CompanyListView.as_view()),
    path('create/', CreateLikesView.as_view()),
    path('<pk>', CompanyDetailView.as_view()),
    path('<pk>/delete/', DeleteLikesView.as_view()),
    url(r'^(?P<name>.+)/$', CompanySearchView.as_view()),
]

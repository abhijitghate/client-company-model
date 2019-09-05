from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, CreateAPIView
from clicom.models import Company, Likes
from .serializers import CompanySerializer, LikesSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from django.utils.decorators import method_decorator
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.http import HttpResponse
import json
from django.core import serializers


from rest_framework.authentication import SessionAuthentication, BasicAuthentication


# class CsrfExemptSessionAuthentication(SessionAuthentication):

#     def enforce_csrf(self, request):
#         return


class CompanyListView(ListAPIView):
    serializer_class = CompanySerializer

    @csrf_exempt
    def get_queryset(self):
        user = self.request.user.id

        queryset = Company.objects.values()

        for item in queryset:
            try:
                like = Likes.objects.get(
                    company_id=int(item['id']), user_id=user)
                if like:
                    item['liked'] = True
                    item['like_id'] = like.id
            except:
                item['liked'] = False
                item['like_id'] = None
        return queryset

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        token = request.data['headers']['Authorization'].split(' ')[1]
        user = Token.objects.get(key=token).user
        queryset = Likes.objects.filter(
            user_id=user).values()
        for item in queryset:
            item['name'] = Company.objects.get(
                id=item['company_id_id']).name
            item['liked'] = True
            item['like_id'] = item['id']

        response = json.dumps(list(queryset))
        return HttpResponse(response, content_type='application/json')


class CompanyDetailView(RetrieveAPIView):

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanySearchView(ListAPIView):
    serializer_class = CompanySerializer

    @csrf_exempt
    def get_queryset(self):
        company = (self.kwargs['name'])
        queryset = Company.objects.filter(
            name=company).values()
        if len(queryset) > 0:
            for item in queryset:
                try:
                    like = Likes.objects.get(
                        company_id=int(item['id']), user_id=user)
                    if like:
                        item['liked'] = True
                        item['like_id'] = like.id
                except:
                    item['liked'] = False
                    item['like_id'] = None
        return queryset


class Favourites(ListAPIView):
    serializer_class = CompanySerializer

    @csrf_exempt
    def get_queryset(self):
        token = self.request.data['headers']['Authorization'].split(' ')[1]
        user = Token.objects.get(key=token).user
        queryset = Likes.objects.filter(
            user_id=user)
        return queryset


class DeleteLikesView(DestroyAPIView):

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

    # @csrf_exempt
    # def perform_destroy(self, request):
    #     import pdb
    #     pdb.set_trace()
    #     print(self.kwargs['companyid'])
    #     companyid = self.kwargs['companyid']
    #     instance = Likes.objects.get(
    #         company_id=companyid, user_id=request.user.id)
    #     instance.delete()


class CreateLikesView(CreateAPIView):

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

    @csrf_exempt
    def create(self, request, *args, **kwargs):
        companyid = request.data['params']['companyid']
        token = request.data['headers']['Authorization'].split(' ')[1]
        user = Token.objects.get(key=token).user
        company = Company.objects.get(id=companyid)
        instance = Likes(company_id=company, user_id=user)
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

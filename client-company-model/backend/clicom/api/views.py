from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, CreateAPIView
from clicom.models import Company, Likes
from .serializers import CompanySerializer, LikesSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action


from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class CompanyListView(ListAPIView):
    serializer_class = CompanySerializer

    @csrf_exempt
    def get_queryset(self):
        user = self.request.user.id
        # import pdb
        # pdb.set_trace()
        print("USER LOGGED IN: " + str(user))
        queryset = Company.objects.values()
        for item in queryset:
            try:
                if Likes.objects.get(company_id=int(item['id']), user_id=user):
                    item['liked'] = True
            except:
                item['liked'] = False
        return queryset


class CompanyDetailView(RetrieveAPIView):

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanySearchView(ListAPIView):
    serializer_class = CompanySerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    @csrf_exempt
    def get_queryset(self):
        company = (self.kwargs['name'])
        queryset = Company.objects.filter(
            name=company)
        return queryset


# @action(methods=['delete'], detail=False)
class DeleteLikesView(DestroyAPIView):

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)
    lookup_fields = ['companyid']

    @csrf_exempt
    def perform_destroy(self, request):
        print(self.kwargs['companyid'])
        companyid = self.kwargs['companyid']
        instance = Likes.objects.get(
            company_id=companyid, user_id=request.user.id)
        instance.delete()


class CreateLikesView(CreateAPIView):

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def create(self, request, *args, **kwargs):
        user = request.user
        company = Company.objects.get(id=self.kwargs['companyid'])
        instance = Likes(company_id=company, user_id=user)
        instance.save()

        return instance

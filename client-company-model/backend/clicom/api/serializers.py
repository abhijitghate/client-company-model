from rest_framework import serializers
from clicom.models import Company, Likes


class CompanySerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()

    def get_liked(self, instance):
        return instance['liked']

    class Meta:
        model = Company
        fields = ('id', 'name', 'address', 'liked')


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('id', 'company_id', 'user_id')

from rest_framework import serializers
from clicom.models import Company, Likes


class CompanySerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()
    like_id = serializers.SerializerMethodField()

    def get_liked(self, instance):
        return instance['liked']

    def get_like_id(self, instance):
        return instance['like_id']

    class Meta:
        model = Company
        fields = ('id', 'name', 'address', 'liked', 'like_id')


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('id', 'company_id', 'user_id')

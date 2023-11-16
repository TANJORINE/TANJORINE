from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.utils import get_username_max_length
from allauth.account.adapter import get_adapter
from .models import User
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    # 추가할 필드들을 정의합니다.
    # User 이름
    age = serializers.IntegerField(required=False)
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField(max_length=100)
    products = serializers.ListField(child=serializers.CharField(), required=False)
    money = serializers.IntegerField(required=False)
    salary = serializers.IntegerField(required=False)
    married = serializers.BooleanField(required=True)
    main_bank = serializers.CharField(max_length=30, required=False)
    save_type = serializers.IntegerField(max_value=4, min_value=1)

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'age': self.validated_data.get('age', ''),
            'phone': self.validated_data.get('phone',''),
            'address': self.validated_data.get('address',''),
            'money': self.validated_data.get('money', ''),
            'salary': self.validated_data.get('salary', ''),
            'products': self.validated_data.get('financial_products', ''),
            'married': self.validated_data.get('married', ''),
            'main_bank': self.validated_data.get('main_bank', ''),
            'save_type': self.validated_data.get('save_type', ''),
        }
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        return user
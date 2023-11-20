from .models import *
from rest_framework import serializers

class DepositProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositProduct
        fields = '__all__'

class SavingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositProduct
        fields = '__all__'

class DepositOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositOption
        fields = '__all__'
class SavingOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingOption
        fields = '__all__'

# class DatasetSerializer():
#     dcls_month = ''
#     kor_co_nm = ''
#     fin_prdt_nm = ''
#     intr_rate_type_nm = ''
#     m6intr_rate = ''
#     m12intr_rate = ''
#     m24intr_rate = ''
#     m36intr_rate = ''
from django.shortcuts import render
from django.conf import settings
from .models import *
from .serializer import *
import requests as req
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils  import *
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
# Create your views here.

# 전체 상품목록 가져오기
@api_view(['GET'])
def load(request):
    topFinGrpNos = ['020000', '030200', '030300', '050000', '060000']
    for grpno in topFinGrpNos:
        deposite(grpno)
        saving(grpno)
    data = {
        'message': 'OK!'
    }
    return Response(data)

# 예금 상품 가져오기
@api_view(['GET'])
def depositLoad(request):
    data = {
        'depositselect': DepositBankSerializer(DepositProduct.objects.distinct().values('fin_co_no', 'kor_co_nm'), many=True).data,
        'depositData':{
                        'productsdata': DepositProductSerializer(DepositProduct.objects.all(), many=True).data,
                        'optionsdata': allofDeposite()
                    }
    }
    return Response(data)

# 적금 상품 가져오기
@api_view(['GET'])
def savingLoad(request):
    data = {
        'savingselect': SavingBankSerializer(SavingProduct.objects.distinct().values('fin_co_no', 'kor_co_nm'), many=True).data,
        'savingData':{
                        'productsdata': SavingProductSerializer(SavingProduct.objects.all(), many=True).data,
                        'optionsdata': allofSaving()
        }
    }
    return Response(data)

# 단일 상품 세부정보 가져오기
@api_view(['GET'])
def detail(request, type, pk):
    if type == 'D':
        product = DepositProduct.objects.get(pk=pk)
        options = product.option.all()
        data = {
            'product': DepositProductSerializer(product).data,
            'options': DepositOptionSerializer(options, many = True).data
        }
    elif type == 'S':
        product = SavingProduct.objects.get(pk=pk)
        options = product.option.all()
        data = {
            'product': DepositProductSerializer(product).data,
            'options': DepositOptionSerializer(options, many = True).data
        }        
    return Response(data)

# 가입 상품 가져오기
@api_view(['POST'])
def signedProd(request):
    products = {}
    options = {}
    for data in request.data:
        print(data)
        if data[0] == 'D':
            prod = DepositProduct.objects.get(fin_co_no=data[1], fin_prdt_cd=data[2])
            products[prod.pk] = DepositProductSerializer(prod).data,
            option = prod.option.get(pk=data[3])
            options[prod.pk] = DepositOptionSerializer(option).data
        if data[0] == 'S':
            prod = SavingProduct.objects.get(fin_co_no=data[1], fin_prdt_cd=data[2])
            products[prod.pk] = SavingProductSerializer(prod).data,
            option = prod.option.get(pk=data[3])
            options[prod.pk] = SavingOptionSerializer(option).data
    
    data = {
        'products': products,
        'options': options,
    }
    return Response(data)
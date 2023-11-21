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
@api_view(['GET'])
def signedProd(request, email):
    user = get_user_model().objects.filter(email=email).values_list('products')
    prod = list(user[0])[0].split(',')
    data = dict()
    i = 1
    for detail in prod:
        prodtype, co_no, prod_cd = detail.split('/$')
        print(prodtype, co_no, prod_cd)
        if prodtype == 'D':
            proddata=DepositProduct.objects.get(fin_co_no=co_no, fin_prdt_cd=prod_cd)
            data[i] = DepositProductSerializer(proddata).data
            print(DepositProduct.objects.filter(fin_co_no=co_no, fin_prdt_cd=prod_cd))
        if prodtype == 'S':
            proddata=SavingProduct.objects.get(fin_co_no=co_no, fin_prdt_cd=prod_cd)
            data[i] = SavingProductSerializer(proddata).data
            print(SavingProduct.objects.filter(fin_co_no=co_no, fin_prdt_cd=prod_cd))
        i += 1
    return Response(data)
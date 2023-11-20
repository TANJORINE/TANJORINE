from django.shortcuts import render
from django.conf import settings
from .models import *
from .serializer import *
import requests as req
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils  import *
# Create your views here.

@api_view(['GET'])
def data_load(request):
    if request.method == 'GET':
        savingProducts = SavingProduct.objects.all()
        SavingOptions = SavingOption.objects.all()
        depositProducts = DepositProduct.objects.all()
        depositOptions = DepositOption.objects.all()
        sp_serializer = SavingProductSerializer(savingProducts, many=True)
        so_serializer = SavingOptionSerializer(SavingOptions, many=True)
        dp_serializer = DepositProductSerializer(depositProducts, many=True)
        do_serializer = DepositOptionSerializer(depositOptions, many=True)
        data = {
            'savingProducts': sp_serializer.data,
            'savingOptions': so_serializer.data,
            'depositProducts': dp_serializer.data,
            'depositOptions': do_serializer.data
        }
        return Response(data)
    
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

@api_view(['GET'])
def depositeLoad(request):
    data = {
        'depositeData':{
                        'productsdata': DepositProductSerializer(DepositProduct.objects.all(), many=True).data,
                        'optionsdata': allofDeposite()
                    }
    }
    return Response(data)

@api_view(['GET'])
def savingLoad(request):
    data = {
        'savingData':{
                        'productsdata': SavingProductSerializer(SavingProduct.objects.all(), many=True).data,
                        'optionsdata': allofSaving()
        }
    }
    return Response(data)


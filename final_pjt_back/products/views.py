from django.shortcuts import render
from .models import *
import requests as req
from django.conf import settings
from rest_framework.response import Response
# Create your views here.

def load(request):
    print(1)
    topFinGrpNos = ['020000', '030200', '030300', '050000', '060000']
    for grpno in topFinGrpNos:
        deposit(grpno)
        saving(grpno)
    
    return Response({'message':'sf'}, 200)

def deposit(grpNo):
    print(2)
    API_KEY = settings.FIN_API_KEY
    url = 'http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json'
    
    params = {
        'auth' : API_KEY,
        'topFinGrpNo' : grpNo,
        'pageNo' : 1
    }
    response= req.get(url, params=params).json()
    prods = response['result']['baseList']
    options = response['result']['optionList']
    print(len(prods))
    print(len(options))
    if len(prods) != 0:
        for prod in prods:
            data = DepositProduct(
                dcls_month      = prod['dcls_month'],
                fin_co_no       = prod['fin_co_no'],
                kor_co_nm       = prod['kor_co_nm'],
                fin_prdt_cd     = prod['fin_prdt_cd'],
                fin_prdt_nm     = prod['fin_prdt_nm'],
                join_way        = prod['join_way'],
                mtrt_int        = prod['mtrt_int'],
                spcl_cnd        = prod['spcl_cnd'],
                join_deny       = prod['join_deny'],
                join_member     = prod['join_member'],
                etc_note        = prod['etc_note'],
                max_limit       = prod['max_limit'],
                dcls_strt_day   = prod['dcls_strt_day'],
                dcls_end_day    = prod['dcls_end_day'],
                fin_co_subm_day = prod['fin_co_subm_day']
            )
            data.save()
    if len(options) != 0:
        for option in options:
            data = DepositOption(
                dcls_month        = option['dcls_month'],
                fin_co_no         = option['fin_co_no'],
                fin_prdt_cd       = option['fin_prdt_cd'],
                intr_rate_type    = option['intr_rate_type'],
                intr_rate_type_nm = option['intr_rate_type_nm'],
                save_trm          = option['save_trm'],
                intr_rate         = option['intr_rate'],
                intr_rate2        = option['intr_rate2'],
            )
            data.save()

def saving(grpNo):
    print(3)
    API_KEY = settings.FIN_API_KEY
    url = 'http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json'
    
    params = {
        'auth' : API_KEY,
        'topFinGrpNo' : grpNo,
        'pageNo' : 1
    }
    response= req.get(url, params=params).json()
    prods = response['result']['baseList']
    options = response['result']['optionList']
    print(len(prods))
    print(len(options))
    if len(prods) != 0:
        for prod in prods:
            data = SavingProduct(
                dcls_month      = prod['dcls_month'],
                fin_co_no       = prod['fin_co_no'],
                kor_co_nm       = prod['kor_co_nm'],
                fin_prdt_cd     = prod['fin_prdt_cd'],
                fin_prdt_nm     = prod['fin_prdt_nm'],
                join_way        = prod['join_way'],
                mtrt_int        = prod['mtrt_int'],
                spcl_cnd        = prod['spcl_cnd'],
                join_deny       = prod['join_deny'],
                join_member     = prod['join_member'],
                etc_note        = prod['etc_note'],
                max_limit       = prod['max_limit'],
                dcls_strt_day   = prod['dcls_strt_day'],
                dcls_end_day    = prod['dcls_end_day'],
                fin_co_subm_day = prod['fin_co_subm_day']
            )
            data.save()
    if len(options) != 0:
        for option in options:
            data = SavingOption(
                dcls_month        = option['dcls_month'],
                fin_co_no         = option['fin_co_no'],
                fin_prdt_cd       = option['fin_prdt_cd'],
                intr_rate_type    = option['intr_rate_type'],
                intr_rate_type_nm = option['intr_rate_type_nm'],
                rsrv_type         = option['rsrv_type'],
                rsrv_type_nm      = option['rsrv_type_nm'],
                save_trm          = option['save_trm'],
                intr_rate         = option['intr_rate'],
                intr_rate2        = option['intr_rate2'],
            )
            data.save()
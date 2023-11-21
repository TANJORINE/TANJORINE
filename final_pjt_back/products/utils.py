from django.conf import settings
from .models import *
from .serializer import *
import requests as req

def deposite(grpNo):
    API_KEY = settings.FIN_API_KEY
    url = 'http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json'
    
    params = {
        'auth' : API_KEY,
        'topFinGrpNo' : grpNo,
        'pageNo' : 1
    }
    response= req.get(url, params=params).json()
    dprods = response['result']['baseList']
    doptions = response['result']['optionList']
    if len(dprods) != 0:
        for prod in dprods:
            if (DepositProduct.objects.filter(fin_co_no=prod['fin_co_no'], fin_prdt_cd=prod['fin_prdt_cd']).exists()):
                continue
            proddata = DepositProduct(
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
            proddata.save()
            for option in doptions:
                if proddata.fin_co_no == option['fin_co_no'] and proddata.fin_prdt_cd == option['fin_prdt_cd']:
                    data = DepositOption(
                        dcls_month        = option['dcls_month'],
                        product           = proddata,
                        intr_rate_type    = option['intr_rate_type'],
                        intr_rate_type_nm = option['intr_rate_type_nm'],
                        save_trm          = option['save_trm'],
                        intr_rate         = option['intr_rate'],
                        intr_rate2        = option['intr_rate2'],
                    )
                    data.save()
            doptions = [option for option in doptions if (proddata.fin_co_no != option['fin_co_no'] or proddata.fin_prdt_cd != option['fin_prdt_cd'])]

def saving(grpNo):
    API_KEY = settings.FIN_API_KEY
    url = 'http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json'
    
    params = {
        'auth' : API_KEY,
        'topFinGrpNo' : grpNo,
        'pageNo' : 1
    }
    response= req.get(url, params=params).json()
    sprods = response['result']['baseList']
    soptions = response['result']['optionList']
    if len(sprods) != 0:
        for prod in sprods:
            if (SavingProduct.objects.filter(fin_co_no=prod['fin_co_no'], fin_prdt_cd=prod['fin_prdt_cd']).exists()):
                continue            
            proddata = SavingProduct(
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
            proddata.save()

            for option in soptions:            
                if proddata.fin_co_no == option['fin_co_no'] and proddata.fin_prdt_cd == option['fin_prdt_cd']:
                    data = SavingOption(
                        dcls_month        = option['dcls_month'],
                        product           = proddata,
                        intr_rate_type    = option['intr_rate_type'],
                        intr_rate_type_nm = option['intr_rate_type_nm'],
                        rsrv_type         = option['rsrv_type'],
                        rsrv_type_nm      = option['rsrv_type_nm'],
                        save_trm          = option['save_trm'],
                        intr_rate         = option['intr_rate'],
                        intr_rate2        = option['intr_rate2'],
                    )
                    data.save()
            soptions = [option for option in soptions if proddata.fin_co_no != option['fin_co_no'] or proddata.fin_prdt_cd != option['fin_prdt_cd']]

def allofDeposite():
    products = DepositProduct.objects.all()
    data = {}
    for product in products:
        singleOptions = product.option.filter(intr_rate_type ='S')
        multiOptions = product.option.filter(intr_rate_type ='M')
        data[product.pk] = {
            'S': DepositOptionSerializer(singleOptions, many=True).data,
            'M': DepositOptionSerializer(multiOptions, many=True).data,
        }
    return data

def allofSaving():
    products = SavingProduct.objects.all()
    data = {}
    for product in products:
        setsingleOptions = product.option.filter(intr_rate_type ='S', rsrv_type ='S')
        setmultiOptions = product.option.filter(intr_rate_type ='M', rsrv_type ='S')
        freesingleOptions = product.option.filter(intr_rate_type ='S', rsrv_type ='F')
        freemultiOptions = product.option.filter(intr_rate_type ='M', rsrv_type ='F')
        data[product.pk] = {
            'SS': SavingOptionSerializer(setsingleOptions, many=True).data,
            'SM': SavingOptionSerializer(setmultiOptions, many=True).data,
            'FS': SavingOptionSerializer(freesingleOptions, many=True).data,
            'FM': SavingOptionSerializer(freemultiOptions, many=True).data,
        }
    return data
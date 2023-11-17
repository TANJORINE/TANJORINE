from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from django.http import JsonResponse
from datetime import datetime
from .serializers import ExchangeRateSerializer
import requests

# Create your views here.
@api_view(['GET'])
def index(request):
    # 날짜: YYYYMMDD
    today = ''.join(str(datetime.today())[:10].split('-'))
    # 요일: 0:월 ~ 6:일  -> 토, 일 : 금요일 환율 보여주기
    day = datetime.today().weekday()
    if day == 5:
        today = str(int(today) - 1)
    elif day == 6:
        today = str(int(today) - 2)

    APIKEY = settings.EXCHANGE_RATE_API_KEY
    # DATE=today # YYYYMMDD
    DATE = '20231116'
    TYPE='AP01'  # AP01: 환율 / AP02: 대출금리 / AP03: 국제금리
    url = f'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey={APIKEY}&searchdate={DATE}&data={TYPE}'

    # newOption1, newOption2 = 'KRW', 'JPY'

    # url = f'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.{newOption1}{newOption2}'
    # url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWJPY'
    response = requests.get(url).json()

    return Response(response)

# def save_exchange_rate(request):
#     # 날짜: YYYYMMDD
#     today = ''.join(str(datetime.today())[:10].split('-'))
#     APIKEY = settings.EXCHANGE_RATE_API_KEY
#     DATE=today # YYYYMMDD
#     TYPE='AP01'  # AP01: 환율 / AP02: 대출금리 / AP03: 국제금리
#     url = f'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey={APIKEY}&searchdate={DATE}&data={TYPE}'

#     response = requests.get(url).json()

#     for data in response:
#         save_data = {
#             'result': data.get('result'),
#             'cur_unit': data.get('cur_unit'),
#             'ttb': data.get('ttb'),
#             'tts': data.get('tts'),
#             'deal_bas_r': data.get('deal_bas_r'),
#             'bkpr': data.get('bkpr'),
#             'yy_efee_r': data.get('yy_efee_r'),
#             'ten_dd_efee_r': data.get('ten_dd_efee_r'),
#             'kftc_bkpr': data.get('kftc_bkpr'),
#             'kftc_deal_bas_r': data.get('kftc_deal_bas_r'),
#             'cur_nm': data.get('cur_nm'),
#         }
#         serializer = ExchangeRateSerializer(data=save_data)
#         if serializer.is_valid():
#             serializer.save()
#     return JsonResponse({'message' : 'save'})
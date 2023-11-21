from django.urls import path
from . import views
app_name='products'

urlpatterns = [
    path('load/', views.load),
    path('deposit/', views.depositLoad),
    path('saving/', views.savingLoad),
    path('detail/<str:type>/<int:pk>/', views.detail),
    path('signedProd/<str:email>/', views.signedProd),
    path('selectOption/', views.selectOption)
]

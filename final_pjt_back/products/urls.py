from django.urls import path
from . import views
app_name='products'

urlpatterns = [
    path('load/', views.load),
    path('deposite/', views.depositeLoad),
    path('saving/', views.savingLoad),
    
]

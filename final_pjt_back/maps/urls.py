from django.urls import path
from . import views

urlpatterns = [
    path("si_do", views.si_do),
    path("si_gun_gu", views.si_gun_gu),
    path("bank", views.bank),
]
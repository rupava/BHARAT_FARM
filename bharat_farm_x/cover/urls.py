from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.cover_index,name="cover_index"),
    path('finance/',views.cover_finance,name="cover_finance")
]


from django.contrib import admin
from django.urls import path

from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index, name ='index'),
    path('book_appointment/', views.book_appointment, name='book_appointment'),
    path('update_status/<int:patient_id>/', views.update_status, name='update_status'),
]

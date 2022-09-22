from django.urls import path
from . import views

urlpatterns = [
	path('view/', views.view, name="Task View"),
	path('create/', views.create, name="Task Create"),
	path('update/<str:pk>/', views.update, name="Task Update"),
	path('delete/<str:pk>/', views.delete, name="Task Delete"),
]

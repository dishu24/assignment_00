from django.urls import path
from .views import *


urlpatterns = [
    
    path('login/', MyTokenObtainPairView.as_view(), name='login-user'),

    path('register/',registerUser, name='register-user'),

    path('', allproductViews, name='allproducts'),
    path('create/product/', createProduct, name='create-product'),
    path('upload/image/', uploadImage, name='image-uploaded'),
    path('<str:pk>/review/', createReview, name='create-review'),
    
    path('<str:pk>/', productView, name='product'),
    path('productupdate/<str:pk>/', updateProduct, name='update-product'),
    path('delete/<str:pk>/', deleteproduct, name='delete-product'),
    
]
from django.urls import path
from rest_framework.routers import DefaultRouter
from .viewsets import CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet, ClienteViewSet, UserCreateAPIView

# Router: Gera as URLs para as viewsets automaticamente.

routerv1 = DefaultRouter()

routerv1.register(r'categories', CategoryViewSet)
routerv1.register(r'products', ProductViewSet)
routerv1.register(r'carts', CartViewSet)
routerv1.register(r'cart-items',CartItemViewSet)
routerv1.register(r'clientes', ClienteViewSet)

urlpatterns = routerv1.urls + [path('register/', UserCreateAPIView.as_view(), name='user-register'),]
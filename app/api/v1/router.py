from rest_framework.routers import DefaultRouter
from .viewsets import CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet, PaymentViewSet
from rest_framework.urlpatterns import format_suffix_patterns
from .viewsets import CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet

# Router: Gera as URLs para as viewsets automaticamente.

routerv1 = DefaultRouter()

routerv1.register(r'categories', CategoryViewSet)
routerv1.register(r'products', ProductViewSet)
routerv1.register(r'carts', CartViewSet)
routerv1.register(r'cart-items', CartItemViewSet)
routerv1.register(r'payments', PaymentViewSet)

urlpatterns = routerv1.urls


#aplica os sufixos de formato (json, xml, yaml etc)
api_urls = format_suffix_patterns(urlpatterns)

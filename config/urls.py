
from django.contrib import admin
from django.urls import path, include
from .router.api import api_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


urlpatterns = [
    path('admin/', admin.site.urls),

    # adicionamos o arquivo do .router para que ele direcione a api para a versão desejada
    path('api/', include((api_urls, 'api'), namespace="api")),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

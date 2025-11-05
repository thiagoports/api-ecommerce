
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.http import JsonResponse
from .router.api import api_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from app.api.v1.viewsets import MyTokenObtainPairView


def welcome_view(request):
    return JsonResponse({"message": "Welcome to the API Ecommerce"})


urlpatterns = [
    path('', welcome_view, name='welcome'),
    path('admin/', admin.site.urls),

    # adicionamos o arquivo do .router para que ele direcione a api para a versão desejada
    path('api/', include((api_urls, 'api'), namespace="api")),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    

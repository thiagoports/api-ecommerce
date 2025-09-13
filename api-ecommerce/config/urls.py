
from django.contrib import admin
from django.urls import path, include
from .router.api import api_urls

urlpatterns = [
    path('admin/', admin.site.urls),

    # adicionamos o arquivo do .router para que ele direcione a api para a versão desejada
    path('api/', include((api_urls, 'api'), namespace="api"))
]

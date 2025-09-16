from django.conf.urls import include
from django.urls import path

from app.api.v1.router import routerv1

# Aqui puxamos as rotas da pasta v1, ou seja, da versão 1 do nosso aplicativo (app), qualquer alteração ou coisa a mais que quisermos colocar ainda na v1 de ROTA podemos colocar aqui que não influencia em outras rotas de outras versões

api_v1_urls = [
    path("", include((routerv1.urls, "v1"), namespace="v1"))
    ]
from django.conf.urls import include
from django.urls import path

# Aqui puxamos as rotas da pasta v1, ou seja, da versão 1 do nosso aplicativo (app), qualquer alteração ou coisa a mais que quisermos colocar ainda na v1 de ROTA podemos colocar aqui que não influencia em outras rotas de outras versões

api_v1_urls = [
    # A função include() pode receber o caminho para um módulo de URLs.
    # O Django irá procurar automaticamente pela variável 'urlpatterns'
    # dentro de 'app.api.v1.router' e incluir todas as rotas de lá.
    path("", include("app.api.v1.router")),
]
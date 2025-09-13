from django.conf.urls import include
from django.urls import path

from config.router.api_v1 import api_v1_urls

# Aqui vamos registrar as rotas das versões ou pastas v'x' v1,v2,v3,v3.5
# Basicamente criamos outros arquivos do tipo api_v2.py e adicionamos a rotas da pasta nele, também como na api_v1.py e as rotas específica que criarmos ficarão 'presas' nas respectivas versões

api_urls = [
    path("v1/", include((api_v1_urls, 'v1')))
    ]
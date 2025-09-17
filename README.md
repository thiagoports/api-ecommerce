<h1 align="center">🛒 E-commerce API - Django REST Framework</h1>

Este projeto é uma API para um sistema de e-commerce, desenvolvida com Django e Django REST Framework. A API oferece funcionalidades como gerenciamento de produtos, categorias, carrinho de compras e autenticação via JWT.

## 🚀 Tecnologias Utilizadas

- Python
- Django REST Framework
- Postgres
- JWT Authentication (`djangorestframework-simplejwt`)
- CORS (`django-cors-headers`)
- Swagger/OpenAPI (`drf-yasg`)
- Content Negociation (`XML e YAML`)

---

## 📦 Funcionalidades

- ✅ CRUD de **Produtos**
- ✅ CRUD de **Categorias**
- ✅ Carrinho de Compras por **usuário**
- ✅ Adição, remoção e atualização de **itens no carrinho**
- ✅ Autenticação e autorização via **JWT**
- ✅ Paginação dos endpoints
- ✅ Documentação interativa via **Swagger**

---

## 🔐 Autenticação
A autenticação é feita via JWT.

Obter Token

```POST /api/token/
{
    "username": "seu_usuario",
    "password": "sua_senha"
}
```

Refresh Token
```
POST /api/token/refresh/
{
    "refresh": "seu_token_refresh"
}
```

Adicione o token nos headers das requisições autenticadas:

```Authorization: Bearer <seu_token_jwt>```

---

## 🔧 Configuração do Ambiente

```sh
git clone git@github.com:thiagoports/api-ecommerce.git
cd api-ecommerce
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py createsuperuser # Preencher com seus dados
python manage.py loaddata mock_data.json # Caso necessário
```
---

## 📄 Documentação da API
Após iniciar o projeto, a documentação interativa Swagger estará disponível em:

- ```http://127.0.0.1:8000/api/docs/#/```

---
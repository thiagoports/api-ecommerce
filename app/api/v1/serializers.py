from rest_framework import serializers
from app.models import Category, Product, Cart, CartItem

# Serializer: Traduz dados do modelo para um formato web (ex: JSON) e vice-versa, além de validar os dados de entrada

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    #para mostrar todos os produtos da categoria fazemos isso:
    products = ProductSerializer(many=True,read_only=True)
    class Meta:
        model = Category
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    # para pegar o produto daquele cart, fazemos:
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    # para pegar todos os itens daquele cart, fazemos:
    items = CartItemSerializer(many=True,read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']




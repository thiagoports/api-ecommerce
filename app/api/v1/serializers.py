from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Category, Product, Cart, CartItem, Payment, Cliente

# Serializer: Traduz dados do modelo para um formato web (ex: JSON) e vice-versa, além de validar os dados de entrada


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    # para mostrar todos os produtos da categoria fazemos isso:
    products = ProductSerializer(many=True, read_only=True)

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
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'cliente', 'items']


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['cpf', 'telefone', 'data_nascimento']


class UserClienteSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()

    class Meta:
        models = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'cliente']


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PaymentSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)
    cart_id = serializers.PrimaryKeyRelatedField(
        queryset=Cart.objects.all(), source='cart', write_only=True
    )

    class Meta:
        model = Payment
        fields = ['id', 'payment_method', 'amount',
                  'status', 'paid_at', 'cart', 'cart_id']

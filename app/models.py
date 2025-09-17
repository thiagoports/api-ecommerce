from django.db import models
from django.contrib.auth.models import User
from .core.models import BaseModel

class Cliente(BaseModel):
    # ligação do user padrão com o novo modelo de cliente
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cliente')

    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True, verbose_name='CPF')
    telefone = models.CharField(max_length=20, null=True, blank=True)
    data_nascimento = models.DateField(null=True, blank=True, verbose_name='Data de nascimento')

    def __str__(self):
        return self.user.get_full_name() or self.user.username
    

class Category(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Product(BaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

class Cart(BaseModel):
    cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE, related_name='cart')

    def __str__(self):
        return f"Carrinho de {self.cliente.user.username}"

class CartItem(BaseModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} de {self.product.name}"

    class Meta:
        unique_together = ('cart', 'product') 
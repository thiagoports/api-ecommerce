from django.db import models
from django.contrib.auth.models import User
from .core.models import BaseModel

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
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Carrinho de {self.user.username}"

class CartItem(BaseModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} de {self.product.name}"

    class Meta:
        unique_together = ('cart', 'product') 
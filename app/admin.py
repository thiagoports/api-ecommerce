from django.contrib import admin
from .models import Category, Product, Cart, CartItem

# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)
    list_filter = ("name",)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "stock", "category")
    search_fields = ("name", "price", "category")
    list_filter = ("category",)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("user",)
    search_fields = ("user",)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity")


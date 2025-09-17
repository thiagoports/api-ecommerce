from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Category, Product, Cart, CartItem, Cliente

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
    list_display = ("cliente",)
    search_fields = ("cliente",)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity")


class ClienteInline(admin.StackedInline):
    model = Cliente
    can_delete = False
    verbose_name_plural = 'Dados do Cliente'

class UserAdmin(BaseUserAdmin):
    inlines = (ClienteInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
from django.contrib import admin
from .models import Sale, Expense, StockItem, Debt, CashFloatTransaction


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'quantity', 'price_per_unit', 'total', 'created_at')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('type', 'amount', 'date', 'created_at')


@admin.register(StockItem)
class StockItemAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'category', 'quantity', 'total_cost', 'date_purchased')


@admin.register(Debt)
class DebtAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'phone_number', 'amount', 'due_date', 'paid')


@admin.register(CashFloatTransaction)
class CashFloatTransactionAdmin(admin.ModelAdmin):
    list_display = ('action', 'amount', 'date', 'created_at')

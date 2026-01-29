from rest_framework import serializers
from .models import Sale, Expense, StockItem, Debt, CashFloatTransaction


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class StockItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockItem
        fields = '__all__'


class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = '__all__'


class CashFloatTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashFloatTransaction
        fields = '__all__'

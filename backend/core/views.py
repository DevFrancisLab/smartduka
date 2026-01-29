from rest_framework import viewsets
from .models import Sale, Expense, StockItem, Debt, CashFloatTransaction
from .serializers import (
    SaleSerializer,
    ExpenseSerializer,
    StockItemSerializer,
    DebtSerializer,
    CashFloatTransactionSerializer,
)


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all().order_by('-created_at')
    serializer_class = SaleSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all().order_by('-created_at')
    serializer_class = ExpenseSerializer


class StockItemViewSet(viewsets.ModelViewSet):
    queryset = StockItem.objects.all().order_by('-created_at')
    serializer_class = StockItemSerializer


class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debt.objects.all().order_by('-created_at')
    serializer_class = DebtSerializer


class CashFloatTransactionViewSet(viewsets.ModelViewSet):
    queryset = CashFloatTransaction.objects.all().order_by('-created_at')
    serializer_class = CashFloatTransactionSerializer

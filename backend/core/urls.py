from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    SaleViewSet,
    ExpenseViewSet,
    StockItemViewSet,
    DebtViewSet,
    CashFloatTransactionViewSet,
)

router = DefaultRouter()
router.register(r'sales', SaleViewSet, basename='sale')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'stock', StockItemViewSet, basename='stock')
router.register(r'debts', DebtViewSet, basename='debt')
router.register(r'cashfloat', CashFloatTransactionViewSet, basename='cashfloat')

urlpatterns = [
    path('', include(router.urls)),
]

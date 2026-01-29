from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
import requests
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

    @action(detail=True, methods=['post'])
    def remind(self, request, pk=None):
        """Send an SMS reminder to the debt customer using Africa's Talking."""
        debt = self.get_object()
        phone = debt.phone_number or ''
        if not phone:
            return Response({'detail': 'No phone number for this debt.'}, status=status.HTTP_400_BAD_REQUEST)

        # Normalize Kenyan numbers: 07... -> +2547...
        to_number = phone
        if phone.startswith('0'):
            to_number = '+254' + phone[1:]
        elif phone.startswith('254'):
            to_number = '+' + phone

        message = request.data.get('message')
        if not message:
            message = f"Reminder: {debt.customer_name}, you owe Ksh {debt.amount:.2f} to SmartDuka. Please pay when able."

        at_username = getattr(settings, 'AFRICASTALKING_USERNAME', None)
        at_api_key = getattr(settings, 'AFRICASTALKING_API_KEY', None)
        if not at_username or not at_api_key:
            return Response({'detail': 'Africa\'s Talking credentials not configured.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        at_url = 'https://api.africastalking.com/version1/messaging'
        sender_id = getattr(settings, 'AFRICASTALKING_SENDER_ID', None)
        payload = {
            'username': at_username,
            'to': to_number,
            'message': message,
            'enqueue': 'true',
        }
        # include sender id if configured
        if sender_id:
            payload['from'] = sender_id
        headers = {
            'apiKey': at_api_key,
            'Accept': 'application/json',
        }

        try:
            resp = requests.post(at_url, data=payload, headers=headers, timeout=10)
            if resp.status_code in (200, 201):
                return Response({'status': 'sent', 'detail': resp.json()}, status=status.HTTP_200_OK)
            return Response({'status': 'failed', 'detail': resp.text}, status=status.HTTP_502_BAD_GATEWAY)
        except requests.RequestException as e:
            return Response({'status': 'error', 'detail': str(e)}, status=status.HTTP_502_BAD_GATEWAY)


class CashFloatTransactionViewSet(viewsets.ModelViewSet):
    queryset = CashFloatTransaction.objects.all().order_by('-created_at')
    serializer_class = CashFloatTransactionSerializer

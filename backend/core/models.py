from django.db import models


class Sale(models.Model):
    item_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=14, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sale: {self.item_name} x{self.quantity}"


class Expense(models.Model):
    type = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    notes = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Expense: {self.type} - {self.amount}"


class StockItem(models.Model):
    item_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    quantity = models.IntegerField()
    cost_per_unit = models.DecimalField(max_digits=12, decimal_places=2)
    total_cost = models.DecimalField(max_digits=14, decimal_places=2)
    date_purchased = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Stock: {self.item_name} ({self.quantity})"


class Debt(models.Model):
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField(null=True, blank=True)
    paid = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Debt: {self.customer_name} - {self.amount}"


class CashFloatTransaction(models.Model):
    ACTION_CHOICES = [('add', 'Add'), ('deduct', 'Deduct')]
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    notes = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Float {self.action} {self.amount} on {self.date}"

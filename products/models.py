# products/models.py
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    keywords = models.CharField(max_length=255)


class Comment(models.Model):
    product = models.ForeignKey(
        Product, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Vote(models.Model):
    product = models.ForeignKey(
        Product, related_name='votes', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

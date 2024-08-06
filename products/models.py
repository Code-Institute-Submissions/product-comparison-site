from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100)


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(default='')
    date = models.DateField(default=timezone.now)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    featured_image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    excerpt = models.TextField(max_length=500, blank=True)
    
    def __str__(self):
        return self.title


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

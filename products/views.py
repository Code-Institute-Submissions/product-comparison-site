# from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Category, Comment, Vote
from .serializers import ProductSerializer, CategorySerializer, CommentSerializer, VoteSerializer


# def home(request):
#     return render(request, 'index.html')


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

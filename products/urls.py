from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductListView, ProductCreateView, ProductDetailView, CategoryViewSet, CommentViewSet, VoteViewSet
from django.conf import settings
from django.conf.urls.static import static

# Define the router and register viewsets
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'votes', VoteViewSet)

# Define URL patterns, combining router with individual generic views
urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# from django.urls import path
# from . import views

# urlpatterns = [
#   path('', views.home, name='home'),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, CommentViewSet, VoteViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'votes', VoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

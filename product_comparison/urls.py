from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('user_api.urls')),  # Using 'auth' as prefix for user-related routes
    path('api/products/', include('products.urls')),  # Prefix for product-related routes
    path('api-auth/', include('rest_framework.urls')),  # Optional: For DRF's login view
    # Catch all other paths and serve the React app
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

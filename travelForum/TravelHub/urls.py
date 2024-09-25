from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, PostViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'countries', CountryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

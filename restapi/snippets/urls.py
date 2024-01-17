from django.urls import include, re_path
from rest_framework.routers import DefaultRouter

from snippets.views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"searchterms", SearchTermViewSet)
router.register(r"videos", VideoViewSet)
router.register(r"platform", PlatformViewSet)
router.register(r"accounts", AccountsViewSet)
router.register(r"publish", PublishViewSet)
router.register(r"genartevideo", GenrateVideoViewSet)
urlpatterns = [
    # url('', my_view),
    re_path(r"^", include(router.urls))
]

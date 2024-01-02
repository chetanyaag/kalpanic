from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from snippets.views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"searchterms", SearchTermViewSet)
router.register(r"videos", VideoViewSet)
urlpatterns = [
    # url('', my_view),
    url(r"^", include(router.urls))
]

from django.conf.urls import url
from django.urls import path, include
# from rest_framework import routers 
from .views import VocabListCreate,VocabDetail , VtypeListCreate,VtypeDetail, CategoryListCreate,CategoryDetail #VocabViewSet,VtypeViewSet

# router = routers.DefaultRouter(trailing_slash = False)
# router.register ('vocabs', VocabViewSet)
# router.register ('vtypes', VtypeViewSet)

# urlpatterns = router.urls
urlpatterns = [
    path('vocab/', VocabListCreate.as_view()),
    # path('vocab/create', VocabCreate.as_view()),
    path('vocab/<int:pk>/', VocabDetail.as_view()),

    path('vtype/', VtypeListCreate.as_view()),
    # path('vtype/create', VtypeCreate.as_view()),
    path('vtype/<int:pk>/', VtypeDetail.as_view()),

    path('category/', CategoryListCreate.as_view()),
    # path('category/create', CategoryCreate.as_view()),
    path('category/<int:pk>/', CategoryDetail.as_view()),

]
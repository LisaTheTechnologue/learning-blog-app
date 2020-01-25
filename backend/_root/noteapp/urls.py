from django.conf.urls import url
from django.urls import path, include
# from rest_framework import routers 
from .views import LNoteListCreate,LNoteDetail,FileUploadView,PhotoDetail
urlpatterns = [
    path('', LNoteListCreate.as_view()),
    # path('LNote/create', LNoteCreate.as_view()),
    path('<int:pk>/', LNoteDetail.as_view()),
    path('photo/', FileUploadView.as_view()),
    path('photo/<int:pk>/', PhotoDetail.as_view()),
]
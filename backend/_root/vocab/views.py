from rest_framework import status,filters,generics,pagination
# from django_filters import rest_framework as filters
from .models import Category,Vocab,Vtype
from .serializers import VocabSerializer,RetrieveVocabSerializer,PostVocabSerializer, VtypeSerializer, CategorySerializer
from rest_framework.response import Response
from django.http import Http404

####PAGINATION
# only need to set the Page_size in settings.py
# class MyPagination(pagination.PageNumberPagination):
#     def get_paginated_response(self, data):
#         return Response({
#             'links': {
#                'next': self.get_next_link(),
#                'previous': self.get_previous_link()
#             },
#             'count': self.page.paginator.count,
#             'total_pages': self.page.paginator.num_pages,
#             'results': data
#         })

####COUNT

####VOCAB
class VocabListCreate(generics.ListCreateAPIView):
    queryset = Vocab.objects.all()    
    filter_backends = [filters.SearchFilter]
    search_fields = ['french','english']

    def get_serializer_class(self):
        if self.request.method == 'POST':
          return VocabSerializer
        return RetrieveVocabSerializer

class VocabDetail(generics.GenericAPIView):
    """
    Retrieve, update or delete a Vocab instance.
    """
    queryset = Vocab.objects.all()
    serializer_class=VocabSerializer
    def get_queryset(self,pk):
        try:
            return Vocab.objects.get(pk=pk)
        except Vocab.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer = VocabSerializer(queryset)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer = VocabSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##VTYPE
class VtypeListCreate(generics.ListCreateAPIView):
    queryset = Vtype.objects.all()
    serializer_class = VtypeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['vtype_abrev','vtype_desc']


class VtypeDetail(generics.GenericAPIView):
    """
    Retrieve, update or delete a Vtype instance.
    """
    queryset = Vtype.objects.all()
    serializer_class=VtypeSerializer
    def get_queryset(self,pk):
        try:
            return Vtype.objects.get(pk=pk)
        except Vtype.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer = VtypeSerializer(queryset)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer = VtypeSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

####CATEGORY
class CategoryListCreate(generics.ListCreateAPIView):
    """
    List all Vocabs, or create a new Vocab.
    """        
    queryset = Category.objects.all()
    serializer_class=CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category_abrev','category_desc']


class CategoryDetail(generics.GenericAPIView):
    """
    Retrieve, update or delete a Category instance.
    """
    queryset = Category.objects.all()
    serializer_class=CategorySerializer
    def get_queryset(self,pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer = CategorySerializer(queryset)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer = CategorySerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
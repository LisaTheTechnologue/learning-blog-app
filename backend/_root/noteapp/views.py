from rest_framework import status,filters,generics,pagination
# from django_filters import rest_framework as filters
from .models import LNote
from .serializers import LNoteSerializer
from rest_framework.response import Response
from django.http import Http404
from .models import File
from .serializers import FileSerializer
from django.http.response import HttpResponse
from rest_framework.parsers import MultiPartParser,JSONParser, FormParser 
from rest_framework.decorators import parser_classes
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView

# Create your views here.
class LNoteListCreate(generics.ListCreateAPIView):
    queryset = LNote.objects.all()
    serializer_class = LNoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title','desc','language']


class LNoteDetail(generics.GenericAPIView):
    """
    Retrieve, update or delete a LNote instance.
    """
    queryset = LNote.objects.all()
    serializer_class=LNoteSerializer
    def get_queryset(self,pk):
        try:
            return LNote.objects.get(pk=pk)
        except LNote.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer_class = LNoteSerializer(queryset)
        return Response(serializer_class.data)

    def put(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        serializer_class = LNoteSerializer(queryset, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        queryset = self.get_queryset(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FileUploadView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    parser_class = (FileUploadParser,)
    serializer_class = FileSerializer
    def get(self, request, format=None):
        queryset = File.objects.all()
        serializer_class = FileSerializer(queryset, many=True)
        return Response(data=serializer_class.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
      
      serializer_class = FileSerializer(data=request.data)

      if serializer_class.is_valid():
          serializer_class.save()
          return Response(serializer_class.data, status=status.HTTP_201_CREATED)
      else:
          return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

        # if serializer_class.is_valid():
        #     serializer_class.save()
        #     response = HttpResponse(serializer_class.data, content_type='multipart/form-data')
        #     if up_file is not None:
        #         response = HttpResponse(up_file.name, status=status.HTTP_201_CREATED)
        #         return response#(up_file.name, status=status.HTTP_201_CREATED)
        #     return response#(serializer_class.data, status=status.HTTP_201_CREATED)
        # return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
    # def get(self, request, format=None):
    #     photo = MyPhoto.objects.all()
    #     serializer_class = PhotoSerializer(photo, many=True)
    #     return Response(data=serializer_class.data, status=status.HTTP_200_OK)

    # def post(self, request, format=None):
    #    serializer_class = PhotoSerializer(data=request.DATA, files=request.FILES)
    #    if serializer_class.is_valid():
    #        serializer_class.save()
    #        return Response(serializer_class.data, status=status.HTTP_201_CREATED)
    #    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoDetail(generics.GenericAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        photo = self.get_object(pk)
        serializer_class = FileSerializer(photo)
        return Response(serializer_class.data)

    def put(self, request, pk, format=None):
        photo = self.get_object(pk)
        serializer_class = FileSerializer(data=request.DATA, files=request.FILES)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        photo = self.get_object(pk)
        photo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

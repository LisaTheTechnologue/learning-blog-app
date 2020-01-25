from .models import Vocab,Vtype,Category
from rest_framework import serializers

class VtypeSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Vtype
        fields = ('id','vtype_abrev','vtype_desc','is_draft')    

class CategorySerializer(serializers.ModelSerializer):    
    class Meta:
        model = Category
        fields = ('id','category_abrev','category_desc','is_draft')

class RetrieveVocabSerializer(serializers.ModelSerializer):
    vtype = VtypeSerializer(many=False,read_only=True)
    category = CategorySerializer(many=False,read_only=True)
    
    # vtype = serializers.StringRelatedField(many=False, read_only=True)
    # category = serializers.StringRelatedField(many=False, read_only=True)
    class Meta:
        model = Vocab
        fields = ('id','french','pronunciation','english','vtype','category','example','note','is_draft')
    


class PostVocabSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=False,read_only=True)
    vtype = serializers.StringRelatedField(many=False,read_only=True)
    class Meta:
        model = Vocab
        fields = '__all__'


class VocabSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Vocab
        fields = ('id','french','pronunciation','english','vtype','category','example','note','is_draft')
    


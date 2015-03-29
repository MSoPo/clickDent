from rest_framework import serializers
from .models import *

class PaisSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pais
        fields = ('id','nombre',)

class EstadoSerializer(serializers.HyperlinkedModelSerializer):
    pais = serializers.PrimaryKeyRelatedField(queryset=Pais.objects.all())
    class Meta:
        model = Estado
        fields = ('id','nombre','pais')

class MunicipioSerializer(serializers.HyperlinkedModelSerializer):
    estado = serializers.PrimaryKeyRelatedField(queryset=Estado.objects.all())
    class Meta:
        model = Municipio
        fields = ('id','nombre', 'estado')

class ColoniaSerializer(serializers.HyperlinkedModelSerializer):
    municipio = serializers.PrimaryKeyRelatedField(queryset=Municipio.objects.all())
    class Meta:
        model = Colonia
        fields = ('id','nombre','municipio','cp',)

class DireccionSerializer(serializers.ModelSerializer):
    colonia = serializers.PrimaryKeyRelatedField(queryset=Colonia.objects.all())
    class Meta:
        model = Direccion
        fields = ('id', 'colonia','calle','num_exterior','num_interior','referencias','google_maps',)
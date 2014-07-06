from rest_framework import serializers
from .models import *

class PaisSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pais
        fields = ('id','nombre',)

class EstadoSerializer(serializers.HyperlinkedModelSerializer):
    estado = serializers.PrimaryKeyRelatedField(many=False)
    class Meta:
        model = Estado
        fields = ('id','nombre','pais')

class ColoniaSerializer(serializers.HyperlinkedModelSerializer):
    estado = serializers.PrimaryKeyRelatedField(many=False)
    class Meta:
        model = Colonia
        fields = ('id','nombre','estado','cp',)

class DireccionSerializer(serializers.HyperlinkedModelSerializer):

    colonia = serializers.PrimaryKeyRelatedField(many=False)

    class Meta:
        model = Direccion
        fields = ('id', 'colonia','calle','num_exterior','num_interior','referencias','google_maps',)
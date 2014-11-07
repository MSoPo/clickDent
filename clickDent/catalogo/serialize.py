from rest_framework import serializers
from .models import *

class EspecialidadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Especialidad
        fields = ('id','nombre','descripcion',)

class EstatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Estatus
        fields = ('id','nombre')

class OrigenSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Origen
        fields = ('id','nombre',)

class EstadoCivilSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EstadoCivil
        fields = ('id','nombre',)

class OcupacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ocupacion
        fields = ('id','nombre',)
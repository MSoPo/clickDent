from rest_framework import serializers
from .models import *

class EspecialidadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Especialidad
        fields = ('nombre','descripcion',)

class EstatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Estatus
        fields = ('nombre',)

class OrigenSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Origen
        fields = ('nombre',)

class EstadoCivilSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EstadoCivil
        fields = ('nombre',)

class OcupacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ocupacion
        fields = ('nombre',)
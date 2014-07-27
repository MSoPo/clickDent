from rest_framework import serializers
from .models import *

class PreciosTratamientoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PreciosTratamiento
        fields = ('id','nombre','descripcion','precio_sugerido','precio_especial')
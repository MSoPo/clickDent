from rest_framework import serializers
from .models import *

class MedicoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Medico
        fields = ('nombre','ape_paterno','ape_materno','num_cedula','declaracion','url_imagen', 'usuario', 'especialidad')

class FormacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Formacion
        fields = ('escuela','titulo','medico')

class ConsultorioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Consultorio
        fields = ('nombre','medico','direccion')       
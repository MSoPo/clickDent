
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class MedicoSerializer(serializers.HyperlinkedModelSerializer):
    especialidad = serializers.PrimaryKeyRelatedField(queryset=Especialidad.objects.all())
    usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Medico
        fields = ('id','nombre','ape_paterno','ape_materno','num_cedula','declaracion','url_imagen', 'especialidad', 'usuario')


class FormacionSerializer(serializers.HyperlinkedModelSerializer):
    medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
    class Meta:
        model = Formacion
        fields = ('id','escuela','titulo','medico')

class ConsultorioSerializer(serializers.HyperlinkedModelSerializer):
    direccion = serializers.PrimaryKeyRelatedField(queryset=Direccion.objects.all())
    class Meta:
        model = Consultorio
        fields = ('id', 'nombre','num_telefono','num_emergencias','direccion','url_imagen') 

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')    

class ConfiguracionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Configuracion
        fields = ('id', 'recordatorio_cita', 'confirmacion_correo', 'hora_comida_inicio', 'hora_comida_fin', 'hora_consulta_inicio', 'hora_consulta_fin', 'duracion_consulta', 'notificacion_mail', 'receta')
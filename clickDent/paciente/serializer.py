from rest_framework import serializers
from .models import *

class PacienteSerializer(serializers.HyperlinkedModelSerializer):
	estado_civil = serializers.PrimaryKeyRelatedField(queryset=EstadoCivil.objects.all())
	ocupacion = serializers.PrimaryKeyRelatedField(queryset=Ocupacion.objects.all())
	medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
	direccion = serializers.PrimaryKeyRelatedField(queryset=Direccion.objects.all())

	class Meta:
		model = Paciente
		fields = ('id','nombre', 'ape_paterno','ape_materno','tel_casa','tel_celular','tel_otro','correo','sexo','fecha_nacimiento','ocupacion','direccion','medico','estado_civil','pendiente')
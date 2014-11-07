from rest_framework import serializers
from .models import *

class PacienteSerializer(serializers.HyperlinkedModelSerializer):
	estado_civil = serializers.PrimaryKeyRelatedField(many=False)
	ocupacion = serializers.PrimaryKeyRelatedField(many=False)
	medico = serializers.PrimaryKeyRelatedField(many=False)
	direccion = serializers.PrimaryKeyRelatedField(many=False)

	class Meta:
		model = Paciente
		fields = ('id','nombre', 'ape_paterno','ape_materno','tel_casa','tel_celular','tel_otro','correo','sexo','fecha_nacimiento','ocupacion','direccion','medico','estado_civil','pendiente')
from rest_framework import serializers
from .models import *

class CitaSerializer(serializers.HyperlinkedModelSerializer):
	paciente = serializers.PrimaryKeyRelatedField(many=False)
	medico = serializers.PrimaryKeyRelatedField(many=False)
	consultorio = serializers.PrimaryKeyRelatedField(many=False)
	tratamiento = serializers.PrimaryKeyRelatedField(many=False,  blank=True)
	estatus = serializers.PrimaryKeyRelatedField(many=False)
	origen = serializers.PrimaryKeyRelatedField(many=False)

	class Meta:
		model = Cita
		fields = ('id','paciente', 'medico', 'consultorio', 'tratamiento', 'estatus', 'origen', 'hora_inicio', 'hora_fin', 'fecha', 'recomendaciones', 'observaciones', 'costo')
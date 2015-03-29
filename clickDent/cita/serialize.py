from rest_framework import serializers
from .models import *

class CitaSerializer(serializers.HyperlinkedModelSerializer):
	paciente = serializers.PrimaryKeyRelatedField(queryset=Paciente.objects.all())
	medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
	consultorio = serializers.PrimaryKeyRelatedField(queryset=Consultorio.objects.all())
	tratamiento = serializers.PrimaryKeyRelatedField(queryset=Tratamiento.objects.all(),  allow_null=True)
	estatus = serializers.PrimaryKeyRelatedField(queryset=Estatus.objects.all())
	origen = serializers.PrimaryKeyRelatedField(queryset=Origen.objects.all())

	class Meta:
		model = Cita
		fields = ('id','paciente', 'medico', 'consultorio', 'tratamiento', 'estatus', 'origen', 'hora_inicio', 'hora_fin', 'fecha', 'recomendaciones', 'observaciones', 'costo')
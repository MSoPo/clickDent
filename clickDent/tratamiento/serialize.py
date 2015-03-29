from rest_framework import serializers
from .models import *

class PreciosTratamientoSerializer(serializers.HyperlinkedModelSerializer):
	medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
	class Meta:
		model = PreciosTratamiento
		fields = ('id','nombre','descripcion','precio_sugerido','precio_especial','medico')

class TratamientoSerializer(serializers.HyperlinkedModelSerializer):
	medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
	paciente = serializers.PrimaryKeyRelatedField(queryset=Paciente.objects.all())
	estatus = serializers.PrimaryKeyRelatedField(queryset=Estatus.objects.all())
	estatus_pago = serializers.PrimaryKeyRelatedField(queryset=Estatus.objects.all())
	historial = serializers.PrimaryKeyRelatedField(queryset=Historial.objects.all())
	class Meta:
		model = Tratamiento
		fields = ('id','descripcion','total_precio','fecha_liquidacion','fecha_inicio', 'estatus', 'estatus_pago', 'paciente', 'medico', 'historial')

class PagoTratamientoSerializer(serializers.HyperlinkedModelSerializer):
	tratamiento = serializers.PrimaryKeyRelatedField(queryset=Tratamiento.objects.all())
	class Meta:
		model = PagoTratamiento
		fields = ('id','descripcion','fecha', 'pagado','tratamiento')
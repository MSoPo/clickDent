from rest_framework import serializers
from .models import *

class PreciosTratamientoSerializer(serializers.HyperlinkedModelSerializer):
	medico = serializers.PrimaryKeyRelatedField(many=False)
	class Meta:
		model = PreciosTratamiento
		fields = ('id','nombre','descripcion','precio_sugerido','precio_especial','medico')

class TratamientoSerializer(serializers.HyperlinkedModelSerializer):
	medico = serializers.PrimaryKeyRelatedField(many=False)
	paciente = serializers.PrimaryKeyRelatedField(many=False)
	estatus = serializers.PrimaryKeyRelatedField(many=False)
	estatus_pago = serializers.PrimaryKeyRelatedField(many=False)
	class Meta:
		model = Tratamiento
		fields = ('id','descripcion','total_precio','fecha_liquidacion','fecha_inicio', 'estatus', 'estatus_pago', 'paciente', 'medico')

class PagoTratamientoSerializer(serializers.HyperlinkedModelSerializer):
	tratamiento = serializers.PrimaryKeyRelatedField(many=False)
	class Meta:
		model = PagoTratamiento
		fields = ('id','descripcion','fecha', 'pagado','tratamiento')
from rest_framework import serializers
from .models import *

class HistorialSerializer(serializers.HyperlinkedModelSerializer):
	medico = serializers.PrimaryKeyRelatedField(many=False)
	paciente = serializers.PrimaryKeyRelatedField(many=False)
	class Meta:
		model = Historial
		fields = ('id' ,'medico',	'paciente',	'fecha_actualizacion',	'digestivo',	'respiratorio',	'cardiaco',	'renal',	'rinon',	'nehurologico',	'coagulacion',	'tiroides',	'sanguineo',	'presion',	'diabetes',	'cancer',	'hepatitis',	'vih',	'anemia',	'venerea',	'epilepcia',	'embarazo',	'estado_salud',	'alergia',	'anestecia',	'respiracion',	'masticar',	'encias',	'aliento',	'rechinar',	'dolor_boca',	'comida_dientes',	'cepillar',	'hilo_dental',	'cepillo',	'visita_dentista',	'embarazo_detalle',	'estado_salud_detalle',	'alergia_detalle', 'diagnostico')

class OdontodiagramaSerializer(serializers.HyperlinkedModelSerializer):
	historial = serializers.PrimaryKeyRelatedField(many=False)
	class Meta:
		model = Odontodiagrama
		fields = ('id' ,'historial','d001','d001a','d001b','d002','d002a','d002b','d003','d003a','d003b','d004','d004a','d004b','d005','d005a','d005b','d006','d006a','d007','d007a','d008','d008a','d009','d009a','d010','d010a','d011','d011a','d012','d012a','d012b','d013','d013a','d013b','d014','d014a','d014b','d015','d015a','d015b','d016','d016a','d016b','d017','d017a','d017b','d018','d018a','d018b','d019','d019a','d019b','d020','d020a','d020b','d021','d021a','d021b','d022','d022a','d023','d023a','d024','d024a','d025','d025a','d026','d026a','d027','d027a','d028','d028a','d028b','d029','d029a','d029b','d030','d030a','d030b','d031','d031a','d031b','d032','d032a','d032b')
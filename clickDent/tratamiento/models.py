from django.db import models
from catalogo.models import Estatus
from paciente.models import Paciente
from medico.models import Medico

# Create your models here.
class Tratamiento (models.Model):
	#objects = TratamientoManager()

	descripcion=models.CharField(max_length=100, null=True, blank=True)
	total_precio=models.DecimalField(max_digits=8, decimal_places=2)
	fecha_liquidacion=models.DateTimeField(null=True, blank=True)
	fecha_inicio=models.DateTimeField()
	estatus=models.ForeignKey(Estatus)
	estatus_pago=models.ForeignKey(Estatus, related_name='+')
	paciente=models.ForeignKey(Paciente)
	medico=models.ForeignKey(Medico)

	def natural_key(self):
		return (self.descripcion, self.total_precio)

	def __unicode__(self):
		return self.descripcion
			

class PagoTratamiento (models.Model):
	fecha=models.DateTimeField()
	descripcion=models.CharField(max_length=500,  null=True, blank=True)
	pagado=models.DecimalField(max_digits=8, decimal_places=2)
	tratamiento=models.ForeignKey(Tratamiento)

class PreciosTratamiento (models.Model):
	nombre=models.CharField(max_length=100)
	descripcion=models.CharField(max_length=500,  null=True, blank=True)
	precio_sugerido=models.DecimalField(max_digits=8, decimal_places=2)
	precio_especial=models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)	
	medico=models.ForeignKey(Medico)
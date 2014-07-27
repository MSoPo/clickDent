from django.db import models
from catalogo.models import Estatus
from paciente.models import Paciente

# Create your models here.
class Tratamiento (models.Model):
	descripcion=models.CharField(max_length=100, null=True, blank=True)
	total_precio=models.DecimalField(max_digits=8, decimal_places=2)
	fecha_liquidacion=models.DateTimeField(null=True, blank=True)
	fecha_inicio=models.DateTimeField()
	estatus=models.ForeignKey(Estatus)
	paciente=models.ForeignKey(Paciente)

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
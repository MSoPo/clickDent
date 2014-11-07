from django.db import models
from direccion.models import Direccion
from catalogo.models import Ocupacion, EstadoCivil
from medico.models import Medico

# Create your models here.
class Paciente (models.Model):
	SEX_TIPO = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    )
	nombre=models.CharField(max_length=50)
	ape_paterno=models.CharField(max_length=50)
	ape_materno=models.CharField(max_length=50, null=True, blank=True)
	tel_casa=models.CharField(max_length=20, null=True, blank=True)
	tel_celular=models.CharField(max_length=20, null=True, blank=True)
	tel_otro=models.CharField(max_length=20, null=True, blank=True)
	correo=models.EmailField(null=True, blank=True)
	sexo=models.CharField(max_length=1, choices=SEX_TIPO)
	pendiente=models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, default=0)
	fecha_nacimiento=models.DateField()
	ocupacion=models.ForeignKey(Ocupacion, null=True, blank=True)
	direccion=models.ForeignKey(Direccion)
	estado_civil=models.ForeignKey(EstadoCivil, null=True, blank=True)
	medico=models.ForeignKey(Medico)

	def natural_key(self):
		return (self.id, self.nombre, self.ape_paterno)

	def __unicode__(self):
		return u'%s %s %s' % (self.nombre, self.ape_paterno, self.ape_materno)

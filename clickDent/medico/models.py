from django.db import models
from catalogo.models import Especialidad
from direccion.models import Direccion
from django.contrib.auth.models import User

class Medico (models.Model):
	nombre=models.CharField(max_length=50)
	ape_paterno=models.CharField(max_length=50)
	ape_materno=models.CharField(max_length=50, null=True, blank=True)
	num_cedula=models.CharField(max_length=50, null=True, blank=True)
	declaracion=models.CharField(max_length=500, null=True, blank=True)
	url_imagen=models.CharField(max_length=500, null=True, blank=True)
	usuario=models.ForeignKey(User)
	especialidad=models.ForeignKey(Especialidad)

	def __unicode__(self):
		return u'%s %s %s' % (self.nombre, self.ape_paterno, self.ape_materno)

class Formacion(models.Model):
	escuela=models.CharField(max_length=100)
	titulo=models.CharField(max_length=100)
	medico=models.ForeignKey(Medico)

	def __unicode__(self):
		return self.escuela

class Consultorio(models.Model):
	nombre=models.CharField(max_length=100, null=True, blank=True)
	medico=models.ForeignKey(Medico)
	direccion=models.ForeignKey(Direccion)

	def __unicode__(self):
		return self.nombre
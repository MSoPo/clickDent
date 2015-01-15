from django.db import models
from catalogo.models import Especialidad, Planes
from direccion.models import Direccion
from django.contrib.auth.models import User

class Medico (models.Model):
	nombre=models.CharField(max_length=50, unique=True)
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
	direccion=models.ForeignKey(Direccion, null=True, blank=True)
	url_imagen=models.CharField(max_length=500, null=True, blank=True)
	num_telefono=models.CharField(max_length=12, null=True, blank=True)
	num_emergencias=models.CharField(max_length=12, null=True, blank=True)

	def __unicode__(self):
		return self.nombre

class Configuracion(models.Model):
	medico=models.ForeignKey(Medico)
	recordatorio_cita=models.CharField(max_length=100, null=True, blank=True)
	confirmacion_correo=models.BooleanField()
	hora_comida_inicio=models.TimeField(null=True, blank=True)
	hora_comida_fin=models.TimeField(null=True, blank=True)
	hora_consulta_inicio=models.TimeField()
	hora_consulta_fin=models.TimeField()
	duracion_consulta=models.IntegerField()
	notificacion_mail=models.BooleanField()
	receta=models.IntegerField()

class Plan(models.Model):
	plan=models.ForeignKey(Planes)
	fecha_inicio=models.DateTimeField()
	fecha_expira=models.DateTimeField(null=True, blank=True)

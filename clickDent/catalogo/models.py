from django.db import models

class Especialidad (models.Model):
	nombre=models.CharField(max_length=100)
	descripcion=models.CharField(max_length=255)

	def __unicode__(self):
		return self.nombre

class Estatus (models.Model):
	nombre=models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

class Origen (models.Model):
	nombre=models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

class EstadoCivil (models.Model):
	nombre=models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

class Ocupacion (models.Model):
	nombre=models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

class Planes (models.Model):
	nombre=models.CharField(max_length=100)
	precio=models.DecimalField(max_digits=8, decimal_places=2)
	duracion=models.IntegerField()

	def __unicode__(self):
		return self.nombre
	


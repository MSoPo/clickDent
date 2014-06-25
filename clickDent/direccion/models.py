from django.db import models

class Pais (models.Model):
	nombre=models.CharField(max_length=100)

	def __unicode__(self):
		return self.nombre

class Estado (models.Model):
	nombre=models.CharField(max_length=100)
	pais=models.ForeignKey(Pais)

	def __unicode__(self):
		return self.nombre

class CP (models.Model):
	nombre=models.CharField(max_length=5)

	def __unicode__(self):
		return self.nombre
		

class Colonia (models.Model):
	nombre=models.CharField(max_length=100)
	estado=models.ForeignKey(Estado)
	cp=models.ForeignKey(CP)

	def __unicode__(self):
		return self.nombre

class Direccion (models.Model):
	colonia=models.ForeignKey(Colonia)
	calle=models.CharField(max_length=100)
	num_exterior=models.CharField(max_length=5)
	num_interior=models.CharField(max_length=5, null=True, blank=True)
	referencias=models.CharField(max_length=250, null=True, blank=True)
	google_maps=models.CharField(max_length=100, null=True, blank=True)

	def __unicode__(self):
		return self.calle




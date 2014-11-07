from django.shortcuts import render
from serialize import *
from rest_framework import viewsets
from rest_framework import filters
from cita.models import *
from django.http import HttpResponse
from django.utils import simplejson
from medico.models import *
from django.contrib.auth.models import User
from django.core import serializers
from itertools import chain
from rest_framework import generics

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter)
    filter_fields = ('id', 'fecha','hora_inicio','hora_fin','recomendaciones','observaciones','tratamiento','consultorio','estatus','medico','paciente','origen') 
    fields = ('id','fecha','paciente')
    ordering_fields = ('fecha', 'hora_inicio', 'hora_fin')

class CitasCalendarioList(generics.ListAPIView):
    serializer_class = CitaSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        usuario = self.request.user
        fecha = self.request.QUERY_PARAMS.get('fecha')
        medico = Medico.objects.get(usuario=usuario)
        return Cita.objects.filter(medico=medico, fecha=fecha).extra(where=["estatus_id=1 OR estatus_id=3 "]).order_by("-hora_fin")

def validarDisponibilidad(request):
	fecha = request.GET['fecha']
	hora_inicio = request.GET['hora_inicio']
	hora_fin = request.GET['hora_fin']
	usuario = User.objects.get(username=request.user)
	medico = Medico.objects.get(usuario=usuario)

	cita = Cita.objects.filter(fecha=fecha, hora_inicio__gte=hora_inicio,hora_inicio__lte=hora_fin,medico=medico)

	print(cita.count())

	if(cita.count() == 0):
		cita = Cita.objects.filter(fecha=fecha, hora_fin__gte=hora_inicio, hora_fin__lte=hora_fin,medico=medico)

	if (cita.count() == 0):
		json = {
	   		'cita': 0
		}
	else :
		json = {
	   		'cita': cita[0].id,
	   		'hora_inicio' : cita[0].hora_inicio.strftime('%H:%M'),
	   		'hora_fin' : cita[0].hora_fin.strftime('%H:%M'),
	   		'paciente' : cita[0].paciente.__unicode__(),
		}
	
	print(json)
	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')


def citasPorFinalizar(request):
	fecha = request.GET['fecha']
	estatus = request.GET['estatus']
	usuario = User.objects.get(username=request.user)
	medico = Medico.objects.get(usuario=usuario)
	hora = request.GET['hora']

	citasHoy = Cita.objects.filter(medico=medico, estatus=estatus, fecha=fecha, hora_fin__lt=hora).order_by('-hora_fin')[:5]
	citasPasadas = []

	if citasHoy.count() < 5:
		longitud = 5 - citasHoy.count()
		citasPasadas = Cita.objects.filter(medico=medico, estatus=estatus, fecha__lt=fecha).order_by('-fecha')[:longitud]

	serialize = serializers.serialize("json", list(chain(citasHoy, citasPasadas)), use_natural_keys=True)
	print(serialize)
	data = simplejson.dumps(serialize)

	return HttpResponse(data, mimetype='application/json')





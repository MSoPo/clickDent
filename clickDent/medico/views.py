from django.shortcuts import render_to_response
from django.template import RequestContext
from serialize import *
from rest_framework import viewsets

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer  

class FormacionViewSet(viewsets.ModelViewSet):
    queryset = Formacion.objects.all()
    serializer_class = FormacionSerializer  

class ConsultorioViewSet(viewsets.ModelViewSet):
    queryset = Consultorio.objects.all()
    serializer_class = ConsultorioSerializer  

def datosIniciales(request):
    """Vista inicial para el login"""
    return render_to_response('datosIniciales.html',  RequestContext(request))
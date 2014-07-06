from django.shortcuts import render_to_response
from django.template import RequestContext
from serialize import *
from rest_framework import viewsets

class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer  

class EstatusViewSet(viewsets.ModelViewSet):
    queryset = Estatus.objects.all()
    serializer_class = EstatusSerializer  

class OrigenViewSet(viewsets.ModelViewSet):
    queryset = Origen.objects.all()
    serializer_class = OrigenSerializer  

class EstadoCivilViewSet(viewsets.ModelViewSet):
    queryset = EstadoCivil.objects.all()
    serializer_class = EstadoCivilSerializer  

class OcupacionViewSet(viewsets.ModelViewSet):
    queryset = Ocupacion.objects.all()
    serializer_class = OcupacionSerializer  

def configuracion(request):
    """Vista inicial para el login"""
    return render_to_response('configuracion.html',  RequestContext(request))


def icon(request):
    """Vista inicial para el login"""
    return render_to_response('icon.html',  RequestContext(request))

def miperfil(request):
    """Vista inicial para el login"""
    return render_to_response('miperfil.html',  RequestContext(request))

def paciente(request):
    """Vista inicial para el login"""
    return render_to_response('paciente.html',  RequestContext(request))

def calendario(request):
    """Vista inicial para el login"""
    return render_to_response('calendario.html',  RequestContext(request))


def tratamientos(request):
    """Vista inicial para el login"""
    return render_to_response('tratamientos.html',  RequestContext(request))

def pagosPendientes(request):
    """Vista inicial para el login"""
    return render_to_response('pagosPendientes.html',  RequestContext(request))

def home(request):
    """Vista inicial para el login"""
    return render_to_response('home.html',  RequestContext(request))    
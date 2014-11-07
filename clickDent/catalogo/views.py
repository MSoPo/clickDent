from django.shortcuts import render_to_response
from django.template import RequestContext
from serialize import *
from rest_framework import viewsets
from medico.models import *
from direccion.models import *
from django.contrib.auth.models import User

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
    especialidad = Especialidad.objects.all()
    usuario = User.objects.get(username=request.user)
    medico = Medico.objects.get(usuario=usuario)
    formacion = Formacion.objects.filter(medico=medico)
    consultorio = Consultorio.objects.get(medico=medico)
    configuracion = Configuracion.objects.get(medico=medico)
   
    print consultorio.direccion
    if consultorio.direccion:
        consultorio.direccion = Direccion.objects.get(pk=consultorio.direccion.id);
        consultorio.direccion.colonia = Colonia.objects.get(pk=consultorio.direccion.colonia.id);
        consultorio.direccion.colonia.municipio = Municipio.objects.get(pk=consultorio.direccion.colonia.municipio.id);
        consultorio.direccion.colonia.municipio.estado = Estado.objects.get(pk=consultorio.direccion.colonia.municipio.estado.id);
    
    return render_to_response('configuracion.html', {'configuracion' : configuracion, 'consultorio' : consultorio, 'formacion' : formacion, 'medico' : medico, 'especialidad' : especialidad}, context_instance=RequestContext(request))


def icon(request):
    """Vista inicial para el login"""
    return render_to_response('icon.html',  RequestContext(request))

def miperfil(request):
    """Vista inicial para el login"""
    print request.user
    usuario = User.objects.get(username=request.user)
    medico = Medico.objects.get(usuario=usuario.id)
    configuracion = Configuracion.objects.get(medico=medico)
    planes = Planes.objects.all()

    return render_to_response('miperfil.html', {'usuario' : usuario, 'medico' : medico, 'configuracion' : configuracion, 'planes' : planes} ,  context_instance=RequestContext(request))

def paciente(request):
    ocupacion = Ocupacion.objects.all()
    estadoCivil = EstadoCivil.objects.all()
    return render_to_response('paciente.html',  {'ocupacion' : ocupacion, 'estadoCivil' : estadoCivil}, context_instance=RequestContext(request))

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
    return render_to_response('home.html', RequestContext(request))  

def buscarPaciente(request):
  """Vista inicial para el login"""
  return render_to_response('buscarPaciente.html', RequestContext(request)) 

def receta(request):
  """Vista inicial para el login"""
  return render_to_response('receta.html', RequestContext(request)) 
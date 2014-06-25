from django.shortcuts import render_to_response
from django.template import RequestContext

def datosIniciales(request):
    """Vista inicial para el login"""
    return render_to_response('datosIniciales.html',  RequestContext(request))
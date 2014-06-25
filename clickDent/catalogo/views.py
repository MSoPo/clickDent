from django.shortcuts import render_to_response
from django.template import RequestContext

def configuracion(request):
    """Vista inicial para el login"""
    return render_to_response('configuracion.html',  RequestContext(request))


def icon(request):
    """Vista inicial para el login"""
    return render_to_response('icon.html',  RequestContext(request))

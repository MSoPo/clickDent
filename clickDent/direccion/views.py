from django.shortcuts import render
from django.core import serializers
from direccion.models import *
from django.http import HttpResponse

def direccion(request):
    """Vista inicial para el login"""
    try:
    	obj = CP.objects.get(nombre=73310)
    	colonia = Colonia.objects.filter(cp=obj).order_by("estado", "nombre")

    	JSONSerializer = serializers.get_serializer("json")
    	json_serializer = JSONSerializer()
    	json_serializer.serialize(colonia)
    	data = json_serializer.getvalue()

    except CP.DoesNotExist:
    	data = 'no allado';

    
    return HttpResponse(data, mimetype='application/json')
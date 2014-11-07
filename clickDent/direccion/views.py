from django.shortcuts import render
from django.core import serializers
from direccion.models import *
from django.http import HttpResponse
from serialize import *
from rest_framework import viewsets
from rest_framework import filters

class PaisViewSet(viewsets.ModelViewSet):
    queryset = Pais.objects.all()
    serializer_class = PaisSerializer 
    filter_fields = ('id',) 

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer 
    filter_fields = ('id', 'pais',)  

class MunicipioViewSet(viewsets.ModelViewSet):
    queryset = Municipio.objects.all()
    serializer_class = MunicipioSerializer
    filter_fields = ('id', 'estado',)  

class ColoniaViewSet(viewsets.ModelViewSet):
    queryset = Colonia.objects.all()
    serializer_class = ColoniaSerializer
    filter_fields = ('id', 'cp',)

class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer
    filter_fields = ('id', )

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
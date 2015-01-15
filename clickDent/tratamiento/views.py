from django.shortcuts import render
from serialize import *
from rest_framework import viewsets
from .models import *
from rest_framework import filters


# Create your views here.

class PrecioTratamientoViewSet(viewsets.ModelViewSet):
    queryset = PreciosTratamiento.objects.all()
    serializer_class = PreciosTratamientoSerializer 
    filter_backends = (filters.SearchFilter,filters.DjangoFilterBackend,)
    search_fields = ('nombre', 'descripcion',)
    filter_fields = ('medico', 'id') 


class TratamientoViewSet(viewsets.ModelViewSet):
    queryset = Tratamiento.objects.all()
    serializer_class = TratamientoSerializer 
    filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter)
    filter_fields = ('id', 'paciente','medico', 'estatus', 'historial') 
    ordering_fields = ('descripcion', 'paciente', 'fecha_inicio' )

class PagoTratamientoViewSet(viewsets.ModelViewSet):
	queryset = PagoTratamiento.objects.all()
	serializer_class = PagoTratamientoSerializer
	filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter)
	filter_fields = ('tratamiento','fecha', )
	ordering_fields = ('fecha', 'descripcion',  )
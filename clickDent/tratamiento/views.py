from django.shortcuts import render
from serialize import *
from rest_framework import viewsets
from .models import *
from rest_framework import filters


# Create your views here.

class PrecioTratamientoViewSet(viewsets.ModelViewSet):
    queryset = PreciosTratamiento.objects.all()
    serializer_class = PreciosTratamientoSerializer 
    filter_backends = (filters.SearchFilter,)
    search_fields = ('nombre', 'descripcion',)
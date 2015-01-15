from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import filters
from serialize import *
from .models import *

# Create your views here.
class HistorialViewSet(viewsets.ModelViewSet):
    queryset = Historial.objects.all()
    serializer_class = HistorialSerializer 
    filter_backends = (filters.SearchFilter,filters.DjangoFilterBackend,)
    filter_fields = ('medico', 'id', 'paciente') 

class OdontodiagramaViewSet(viewsets.ModelViewSet):
    queryset = Odontodiagrama.objects.all()
    serializer_class = OdontodiagramaSerializer 
    filter_backends = (filters.SearchFilter,filters.DjangoFilterBackend,)
    filter_fields = ('historial', 'id',) 
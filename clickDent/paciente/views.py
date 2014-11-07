from django.shortcuts import render
from serializer import *
from rest_framework import viewsets
from rest_framework import filters

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer 
    filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter) 
    filter_fields = ('medico',) 

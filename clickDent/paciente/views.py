from django.shortcuts import render
from serializer import *
from rest_framework import viewsets

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer  

from django.shortcuts import render
from serialize import *
from rest_framework import viewsets

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer  
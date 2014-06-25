from django.contrib import admin

from models import *

class CitaAdmin(admin.ModelAdmin):
	list_display = ('hora_inicio', 'hora_fin', 'consultorio', 'medico', 'paciente', 'estatus')

admin.site.register(Cita, CitaAdmin)

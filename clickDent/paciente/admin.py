from django.contrib import admin

from models import *

class PacienteAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'ape_paterno', 'ape_materno', 'tel_casa', 'tel_celular', 'tel_otro', 'correo', 'sexo', 'medico')

admin.site.register(Paciente, PacienteAdmin)
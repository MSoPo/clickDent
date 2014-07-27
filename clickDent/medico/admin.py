from django.contrib import admin

from models import *

class ConfiguracionAdmin(admin.ModelAdmin):
	list_display = ('medico','recordatorio_cita','confirmacion_correo','hora_comida_inicio','hora_comida_fin','hora_consulta_inicio','hora_consulta_fin','duracion_consulta')

class FromacionAdmin(admin.ModelAdmin):
	list_display = ('escuela', 'titulo', 'medico')

class ConsultorioAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'medico')

class MedicoAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'ape_paterno', 'ape_materno', 'num_cedula', 'declaracion', 'usuario', 'especialidad')

admin.site.register(Formacion, FromacionAdmin)
admin.site.register(Consultorio, ConsultorioAdmin)
admin.site.register(Medico, MedicoAdmin)
admin.site.register(Configuracion, ConfiguracionAdmin)
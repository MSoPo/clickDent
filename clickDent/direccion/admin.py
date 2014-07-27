from django.contrib import admin
from direccion.models import *


class ColoniaAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'cp', 'municipio')

class DireccionAdmin(admin.ModelAdmin):
	list_display = ('calle', 'colonia', 'num_exterior', 'num_interior')

admin.site.register(Estado)
admin.site.register(Municipio)
admin.site.register(Pais)
admin.site.register(Colonia, ColoniaAdmin)
admin.site.register(Direccion, DireccionAdmin)

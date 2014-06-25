from django.contrib import admin


from models import *

class TratmientoAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'ape_paterno', 'ape_materno', 'tel_casa', 'tel_celular', 'tel_otro', 'correo', 'sexo', 'medico')

class PagoTratmientoAdmin(admin.ModelAdmin):
	list_display = ('fecha', 'descripcion', 'pagado', 'tratamiento')

class PreciosTratmientoAdmin(admin.ModelAdmin):
	list_display = ('fecha', 'ape_paterno', 'ape_materno', 'tel_casa', 'tel_celular', 'tel_otro', 'correo', 'sexo', 'medico')

admin.site.register(Tratamiento)
admin.site.register(PagoTratamiento, PagoTratmientoAdmin)
admin.site.register(PreciosTratamiento)
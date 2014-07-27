from django.contrib import admin


from models import *

class TratmientoAdmin(admin.ModelAdmin):
	list_display = ('descripcion', 'total_precio', 'fecha_liquidacion', 'fecha_inicio', 'estatus', 'paciente')

class PagoTratmientoAdmin(admin.ModelAdmin):
	list_display = ('fecha', 'descripcion', 'pagado', 'tratamiento')

class PreciosTratmientoAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'descripcion', 'precio_sugerido', 'precio_especial')

admin.site.register(Tratamiento, TratmientoAdmin)
admin.site.register(PagoTratamiento, PagoTratmientoAdmin)
admin.site.register(PreciosTratamiento, PreciosTratmientoAdmin)
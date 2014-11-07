from django.conf.urls import patterns, include, url

from loginClick.views import *
from direccion.views import *
from medico.views import *
from paciente.views import *
from catalogo.views import *
from tratamiento.views import *
from cita.views import *
from django.contrib import admin

admin.autodiscover()

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'paciente', PacienteViewSet)
router.register(r'estadocivil', EspecialidadViewSet)
router.register(r'ocupacion', EstatusViewSet)
router.register(r'origen', OrigenViewSet)
router.register(r'estadoCivil', EstadoCivilViewSet)
router.register(r'estatus', EstatusViewSet)
router.register(r'pais', PaisViewSet)
router.register(r'estado', EstadoViewSet)
router.register(r'municipio', MunicipioViewSet)
router.register(r'colonia', ColoniaViewSet)
router.register(r'direccion', DireccionViewSet)
router.register(r'formacion', FormacionViewSet)
router.register(r'configuracion', ConfiguracionViewSet)
router.register(r'consultorio', ConsultorioViewSet)
router.register(r'preciotratamiento', PrecioTratamientoViewSet)
router.register(r'tratamiento',TratamientoViewSet)
router.register(r'cita', CitaViewSet)
router.register(r'pago', PagoTratamientoViewSet)





urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'clickDent.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    #URL PAGINAS ESTATISCAS
    url(r'^$', index, name='index'),
    url(r'^registrarse/', registrarse, name='registrarse'),
    url(r'^contactanos/', contactanos, name='contactanos'),
    #url(r'^login/', login, name='login'),
    url(r'^preguntas/', preguntas, name='preguntas'),

    url(r'^done/$', done, name='done'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('social_auth.urls')),
    url(r'^createUser/', createUser, name="createUser"),
    url(r'^validaUsuario/', validaUsuario, name="validaUsuario"),
    url(r'^validaCorreo/', validaCorreo, name="validaCorreo"),
    url(r'^validaLogin/', validaLogin, name="validaLogin"),
    url(r'^direccion/', direccion, name="direccion"),
    url(r'^sistemaDental/', sistemaDental, name="sistemaDental"),
    url(r'^configuracion/', configuracion, name="configuracion"),
    url(r'^icon/', icon, name="icon"),
    url(r'^miperfil/', miperfil, name="miperfil"),
    url(r'^receta/', receta, name="receta"),
    url(r'^paciente/', paciente, name="paciente"),
    url(r'^calendario/', calendario, name="calendario"),
    url(r'^tratamientos/', tratamientos, name="tratamientos"),
    url(r'^pagosPendientes/', pagosPendientes, name="pagosPendientes"),
    url(r'^home/', home, name="home"),
    url(r'^actualizarFormacion/', actualizarFormacion, name="actualizarFormacion"),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest/medico/$', MedicoList.as_view()),
    url(r'^rest/medico/(?P<pk>[0-9]+)/$', MedicoDetail.as_view()),
    url(r'^rest/formacion/$', FormacionList.as_view()),
    url(r'^rest/citasCalendario/$', CitasCalendarioList.as_view()),
    url(r'^actualizarPerfil/$', actualizarPerfil),
    url(r'^actualizarConsultorio/$', actualizarConsultorio),
    url(r'^cambiarContrasena/$', cambiarContrasena),
    url(r'^actualizarPlan/$', actualizarPlan),
    url(r'^buscarPaciente/', buscarPaciente, name="buscarPaciente"),
    url(r'^validarDisponibilidad/', validarDisponibilidad, name="validarDisponibilidad"),
    url(r'^citasPorFinalizar/', citasPorFinalizar, name="citasPorFinalizar"),
)


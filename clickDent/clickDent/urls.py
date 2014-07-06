from django.conf.urls import patterns, include, url

from loginClick.views import home, done, logout, createUser, validaUsuario, validaCorreo, registrarse, validaLogin
from direccion.views import *
from medico.views import *
from paciente.views import *
from catalogo.views import *

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'paciente', PacienteViewSet)
router.register(r'estadocivil', EspecialidadViewSet)
router.register(r'ocupacion', EstatusViewSet)
router.register(r'origen', OrigenViewSet)
router.register(r'especialidad', EstadoCivilViewSet)
router.register(r'estatus', OcupacionViewSet)
router.register(r'pais', PaisViewSet)
router.register(r'estado', EstadoViewSet)
router.register(r'colonia', ColoniaViewSet)
router.register(r'direccion', DireccionViewSet)
router.register(r'consultorio', ConsultorioViewSet)
router.register(r'formacion', FormacionViewSet)
router.register(r'medico', MedicoViewSet)



urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'clickDent.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', home, name='home'),
    url(r'^registrarse/', registrarse, name='registrarse'),
    url(r'^done/$', done, name='done'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('social_auth.urls')),
    url(r'^createUser/', createUser, name="createUser"),
    url(r'^validaUsuario/', validaUsuario, name="validaUsuario"),
    url(r'^validaCorreo/', validaCorreo, name="validaCorreo"),
    url(r'^validaLogin/', validaLogin, name="validaLogin"),
    url(r'^direccion/', direccion, name="direccion"),
    url(r'^datosIniciales/', datosIniciales, name="datosIniciales"),
    url(r'^configuracion/', configuracion, name="configuracion"),
    url(r'^icon/', icon, name="icon"),
    url(r'^miperfil/', miperfil, name="miperfil"),
    url(r'^paciente/', paciente, name="paciente"),
    url(r'^calendario/', calendario, name="calendario"),
    url(r'^tratamientos/', tratamientos, name="tratamientos"),
    url(r'^pagosPendientes/', pagosPendientes, name="pagosPendientes"),
    url(r'^home/', home, name="home"),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)


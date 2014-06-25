from django.conf.urls import patterns, include, url

from loginClick.views import home, done, logout, createUser, validaUsuario, validaCorreo, registrarse, validaLogin
from direccion.views import direccion
from medico.views import datosIniciales
from catalogo.views import configuracion,icon

from django.contrib import admin
admin.autodiscover()

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
)


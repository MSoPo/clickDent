from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout, authenticate, login
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.contrib.auth.models import User
from django.utils import simplejson
from medico.models import *
import time
from django.conf import settings
from datetime import date, timedelta, datetime

from social_auth import __version__ as version

def home(request):
    """Vista inicial para el login"""
    if request.user.is_authenticated():
        return HttpResponseRedirect('done')
    else:
        return render_to_response('login.html', {'version': version},
                                  RequestContext(request))

def registrarse(request):
    """Vista inicial para el login"""
    return render_to_response('registrarte.html', {'version': version}, RequestContext(request))

def index(request):
    """Vista inicial para el login"""
    return render_to_response('index.html', {'version': version}, RequestContext(request))

def contactanos(request):
    """Vista inicial para el login"""
    return render_to_response('contactanos.html', {'version': version}, RequestContext(request))

def preguntas(request):
    """Vista inicial para el login"""
    return render_to_response('preguntas.html', {'version': version}, RequestContext(request))


@login_required
def done(request):
    """Login completo entrar a la app"""
    ctx = {
        'version': version,
        'last_login': request.session.get('social_auth_last_login_backend')
    }
    return render_to_response('done.html', ctx, RequestContext(request))


def logout(request):
    """Deslogear"""
    auth_logout(request)
    return HttpResponseRedirect('/sistemaDental')

def createUser(request):
	"""Crear el usuario y redirigirlo a la aplicacion"""
	usuario = request.POST['usuario']
	correo =  request.POST['correo']
	password = request.POST['password']
	user = User.objects.create_user(usuario, correo, password)
	user.is_active = True
	user.save()
	acceso = loginUser(usuario, password, request)
	if acceso:
		medico = Medico()
		medico.nombre = "--"
		medico.ape_paterno = "--"
		medico.usuario = user
		medico.especialidad = Especialidad.objects.get(id=1)
		medico.save()

		configuracion = Configuracion()
		configuracion.medico= medico
		configuracion.hora_consulta_inicio='7:00'
		configuracion.hora_consulta_fin='22:00'
		configuracion.duracion_consulta='15'
		configuracion.notificacion_mail=True
		configuracion.plan= Planes.objects.get(id=1)
		configuracion.fecha_inicio= datetime.now()
		configuracion.confirmacion_correo = True
		configuracion.recordatorio_cita = "3,"
		configuracion.receta = 1
		configuracion.save()
		
		consultorio = Consultorio()
		consultorio.nombre = '--'
		consultorio.medico = medico
		consultorio.save()		

		return HttpResponseRedirect('/sistemaDental/')
	else:
		return HttpResponseRedirect('/registrarse/')

def validaLogin(request):
	usuario = request.GET['usuario']
	password = request.GET['password']

	if usuario.find('@') == -1:
		acceso = loginUser(usuario, password, request)
	else:
		try:
			user = User.objects.get(email__exact=usuario)
			acceso = loginUser(user.username, password, request)
		except User.DoesNotExist:
			acceso = False

	
	if acceso:
		validacion = 1
	else:
		validacion = 0

	json = {
   		'validacion': validacion,
   		'username': usuario,
	}
	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')


	
def loginUser(user, passw, request):
	acceso = authenticate(username=user,  password=passw)

	if acceso is not None:
		login(request, acceso)
		return True
	else:
		return False

def validaUsuario(request):
	usuario = request.GET['usuario']

	try:
		User.objects.get(username__exact = usuario)
		validacion = 1
	except User.DoesNotExist:
		validacion = 0

	json = {
   		'validacion': validacion,
   		'username': usuario,
	}
	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')

def validaCorreo(request):
	correo = request.GET['correo']

	try:
		User.objects.get(email = correo)
		validacion = 1
	except User.DoesNotExist:
		validacion = 0

	json = {
   		'validacion': validacion,
   		'mail': correo,
	}
	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')

def handle_uploaded_file(f):
	extension = f.name.split('.')
	ultimo = len(extension) - 1
	extension = '.' + extension[ultimo]
	rutaAbsoluta = settings.RUTA_PROYECTO + settings.STATIC_URL
	print settings.RUTA_PROYECTO
	rutaRelatica = 'Imagenes/' + time.strftime("%y%m%d%H%M%S") + extension

	nombre = rutaAbsoluta + rutaRelatica
	print nombre
	
	with open(nombre, 'wb+') as destination:
		for chunk in f.chunks():
			destination.write(chunk)

	return rutaRelatica

def actualizarConsultorio(request):
	medico = Medico.objects.get(usuario=request.user)
	consultorio = Consultorio.objects.get(medico=medico)

	if request.FILES:
		imagenPath = handle_uploaded_file(request.FILES['file'])
		imagen = imagenPath
		consultorio.url_imagen = imagen
		consultorio.save()


	json = {
   		'validacion': 'ok',
   		'url' : consultorio.url_imagen
	}
	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')

def actualizarPerfil(request):
	correo = request.POST['correo']
	usuario = request.POST['usuario']

	user = User.objects.get(username=request.user)
	user.email = correo
	user.username = usuario

	user.save()

	if request.FILES:
		imagenPath = handle_uploaded_file(request.FILES['file'])
		medico = Medico.objects.get(usuario=user)
		imagen = imagenPath
		medico.url_imagen = imagen
		medico.save()


	json = {
   		'validacion': 'ok',
   		'mail': correo,
	}
	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')

def cambiarContrasena(request):
	actualPass = request.POST['actual']
	nuevoPass = request.POST['nueva']

	usuario = User.objects.get(username=request.user)

	print actualPass
	print usuario.check_password(actualPass)
	if usuario.check_password(actualPass):
		usuario.set_password(nuevoPass)
		usuario.save()
		json = {
   			'validacion': 'ok'
		}

	else:
		json = {
   			'validacion': 'error'
		}

	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')

def actualizarPlan(request):
	plan = request.POST['plan']
	usuario = User.objects.get(username=request.user)
	medico = Medico.objects.get(usuario=usuario)
	plan = Planes.objects.get(id=plan)
	hoy = date.today()
	d=hoy+timedelta(days=plan.duracion)

	configuracion = Configuracion.objects.get(medico=medico)
	print d
	print hoy
	configuracion.fecha_inicio = hoy
	configuracion.fecha_expira = d
	configuracion.plan = plan
	configuracion.save()

	json = {
   			'validacion': 'ok'
		}

	data = simplejson.dumps(json)
	return HttpResponse(data, mimetype='application/json')




    








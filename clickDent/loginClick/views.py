from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout, authenticate, login
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.contrib.auth.models import User
from django.utils import simplejson


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
    return HttpResponseRedirect('/')

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
		return HttpResponseRedirect('/done/')
	else:
		return HttpResponseRedirect('/home/')

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


    








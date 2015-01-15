from django.shortcuts import render_to_response
from django.template import RequestContext
from serialize import *
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import mixins
from paciente.models import *

class FormacionList (mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Formacion.objects.all()
    serializer_class = FormacionSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):

        usuario = User.objects.get(username=request.user)
        medico = Medico.objects.get(usuario=usuario.id)
        Formacion.objects.filter(medico=medico.id).delete()
        for forma in request.DATA:
            f = Formacion(escuela=forma['escuela'], titulo=forma['titulo'], medico=medico)
            print forma['escuela']
            print forma['titulo']
            f.save()
            print f.id

        return Response({'respuesta' : 'Ok'})

class FormacionViewSet(viewsets.ModelViewSet):
    queryset = Formacion.objects.all()
    serializer_class = FormacionSerializer 
    filter_fields = ('id', 'medico',)

class ConsultorioViewSet(viewsets.ModelViewSet):
    queryset = Consultorio.objects.all()
    serializer_class = ConsultorioSerializer
    filter_fields = ('id', 'medico',)

class MedicoList (mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

    def get(self, request, *args, **kwargs):
        queryset = Medico.objects.get(usuario = request.user)
        serializer = MedicoSerializer(queryset)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class MedicoDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ConfiguracionViewSet(viewsets.ModelViewSet):
    queryset = Configuracion.objects.all()
    serializer_class = ConfiguracionSerializer
    filter_fields = ('id', 'medico',)


def sistemaDental(request):
    """Vista inicial para el login"""

    nuevoUsuario = False

    if request.user.is_authenticated():
        usuario = User.objects.get(username=request.user)
        print(usuario.email);

        try:
            medico = Medico.objects.get(usuario=usuario.id)
            pacientes = Paciente.objects.filter(medico=medico)
        except:
            nuevoUsuario = True            
            return render_to_response('datosIniciales.html', {'usuario' : usuario , 'nuevoUsuario' : nuevoUsuario} ,  RequestContext(request))

        return render_to_response('datosIniciales.html', {'pacientes' : pacientes, 'usuario' : usuario , 'medico' : medico, 'nuevoUsuario' : nuevoUsuario} ,  RequestContext(request))
    else:
        return render_to_response('login.html', RequestContext(request))

def actualizarFormacion(request):
    """Eliminar y volver a agregar las nuevas formaciones"""
    jsonMedico = request.POST['medico']
    jsonFormacion =  request.POST['formacion']

    print jsonFormacion
    print jsonMedico

    data = simplejson.dumps(jsonFormacion)
    return HttpResponse(data, mimetype='application/json')

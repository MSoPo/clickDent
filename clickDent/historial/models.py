from django.db import models
from paciente.models import Paciente
from medico.models import Medico

class Historial(models.Model):
	RESP_TIPO = (
        ('S', 'Si'),
        ('N', 'No'),
    )

	medico=models.ForeignKey(Medico)
	paciente=models.ForeignKey(Paciente)
	fecha_actualizacion=models.DateField()

	#Enfermedades
	digestivo=models.CharField(max_length=1, choices=RESP_TIPO)
	respiratorio=models.CharField(max_length=1, choices=RESP_TIPO)
	cardiaco=models.CharField(max_length=1, choices=RESP_TIPO)
	renal=models.CharField(max_length=1, choices=RESP_TIPO)
	rinon=models.CharField(max_length=1, choices=RESP_TIPO)
	nehurologico=models.CharField(max_length=1, choices=RESP_TIPO)
	coagulacion=models.CharField(max_length=1, choices=RESP_TIPO)
	tiroides=models.CharField(max_length=1, choices=RESP_TIPO)
	sanguineo=models.CharField(max_length=1, choices=RESP_TIPO)
	presion=models.CharField(max_length=1, choices=RESP_TIPO)
	diabetes=models.CharField(max_length=1, choices=RESP_TIPO)
	cancer=models.CharField(max_length=1, choices=RESP_TIPO)
	hepatitis=models.CharField(max_length=1, choices=RESP_TIPO)
	vih=models.CharField(max_length=1, choices=RESP_TIPO)
	anemia=models.CharField(max_length=1, choices=RESP_TIPO)
	venerea=models.CharField(max_length=1, choices=RESP_TIPO)
	epilepcia=models.CharField(max_length=1, choices=RESP_TIPO)

	#historial medico preguntas cerradas
	embarazo=models.CharField(max_length=1, choices=RESP_TIPO)
	estado_salud=models.CharField(max_length=1, choices=RESP_TIPO)
	alergia=models.CharField(max_length=1, choices=RESP_TIPO)
	anestecia=models.CharField(max_length=1, choices=RESP_TIPO)
	respiracion=models.CharField(max_length=1, choices=RESP_TIPO)
	masticar=models.CharField(max_length=1, choices=RESP_TIPO)
	encias=models.CharField(max_length=1, choices=RESP_TIPO)
	aliento=models.CharField(max_length=1, choices=RESP_TIPO)
	rechinar=models.CharField(max_length=1, choices=RESP_TIPO)
	dolor_boca=models.CharField(max_length=1, choices=RESP_TIPO)
	comida_dientes=models.CharField(max_length=1, choices=RESP_TIPO)
	cepillar=models.CharField(max_length=1, choices=RESP_TIPO)
	hilo_dental=models.CharField(max_length=1, choices=RESP_TIPO)

	#hitorial medico preguntas abiertas
	cepillo=models.CharField(max_length=100, null=True, blank=True)
	visita_dentista=models.CharField(max_length=100, null=True, blank=True)
	embarazo_detalle=models.CharField(max_length=100, null=True, blank=True)
	estado_salud_detalle=models.CharField(max_length=100, null=True, blank=True)
	alergia_detalle=models.CharField(max_length=300, null=True, blank=True)
    
    #diagnostico
	diagnostico=models.CharField(max_length=500, null=True, blank=True)

class Odontodiagrama(models.Model):
    DIENTE_TIPO = (
		('N', 'Nada'),
        ('DA', 'DienteAusente'),
        ('DE', 'DienteExtraer'),
        ('DC', 'DienteCaries'),
        ('O', 'Obturacion'),
        ('C', 'Corona'),
        ('T', 'Tramo'),
    )

    historial=models.ForeignKey(Historial)
    #Superio
    d001=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d001a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d001b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d002=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d002a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d002b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d003=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d003a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d003b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d004=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d004a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d004b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d005=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d005a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d005b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d006=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d006a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d007=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d007a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d008=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d008a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d009=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d009a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d010=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d010a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d011=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d011a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d012=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d012a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d012b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d013=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d013a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d013b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d014=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d014a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d014b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d015=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d015a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d015b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d016=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d016a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d016b=models.CharField(max_length=2, choices=DIENTE_TIPO)

     #Inferior
    d017=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d017a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d017b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d018=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d018a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d018b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d019=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d019a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d019b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d020=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d020a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d020b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d021=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d021a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d021b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d022=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d022a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d023=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d023a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d024=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d024a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d025=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d025a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d026=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d026a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d027=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d027a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d028=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d028a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d028b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d029=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d029a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d029b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d030=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d030a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d030b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d031=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d031a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d031b=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d032=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d032a=models.CharField(max_length=2, choices=DIENTE_TIPO)
    d032b=models.CharField(max_length=2, choices=DIENTE_TIPO)
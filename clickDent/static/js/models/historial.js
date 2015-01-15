clickDent.Models.Historial = Backbone.Model.extend({
	defaults : {
		//claves
		id : undefined,
		medico : '0',
		paciente : '0',
		fecha_actualizacion : '',

		//enfermedades
		digestivo : 'N',
		respiratorio : 'N',
		cardiaco : 'N',
		renal : 'N',
		rinon : 'N',
		nehurologico : 'N',
		coagulacion : 'N',
		tiroides : 'N',
		sanguineo : 'N',
		presion : 'N',
		diabetes : 'N',
		cancer : 'N',
		hepatitis : 'N',
		vih : 'N',
		anemia : 'N',
		venerea : 'N',
		epilepcia : 'N',

		//preguntas cerradas
		embarazo : 'N',
		estado_salud : 'N',
		alergia : 'N',
		anestecia : 'N',
		respiracion : 'N',
		masticar : 'N',
		encias : 'N',
		aliento : 'N',
		rechinar : 'N',
		dolor_boca : 'N',
		comida_dientes : 'N',
		cepillar : 'N',
		hilo_dental : 'N',

		//preguntas abiertas

		cepillo : '',
		visita_dentista : '',
		embarazo_detalle : '',
		estado_salud_detalle : '',
		alergia_detalle : '',

		diagnostico : '',

	},
	
	validate: function(attrs, options) {
		
  	},
});
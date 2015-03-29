clickDent.Models.Paciente = Backbone.Model.extend({
	defaults : {
		id : undefined,
		nombre : '',
		ape_paterno : '',
		ape_materno : '',
		tel_casa : '',
		tel_celular : '',
		tel_otro : '',
		correo : '',
		sexo : '',
		fecha_nacimiento : '',
		ocupacion : '',
		direccion : '',
		estado_civil : '',
		medico : '',
		clave_paciente : '',
	},
	
	validate: function(attrs, options) {
		
  	},
});
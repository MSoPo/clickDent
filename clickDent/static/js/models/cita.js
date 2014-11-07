clickDent.Models.Cita = Backbone.Model.extend({
	defaults : {
		id : undefined,
		hora_inicio : '',
		hora_fin : '',
		fecha : '',
		recomendaciones : '',
		observaciones : '',
		tratamiento : '1',
		consultorio : '1',
		estatus : '1',
		medico : '1',
		paciente : '',
		origen : '1',
		costo : '0.00',

	},
	
	validate: function(attrs, options) {
		
  	},
});
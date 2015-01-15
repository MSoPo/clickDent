clickDent.Models.Tratamiento = Backbone.Model.extend({
	defaults : {
		id : undefined,
		fecha_inicio : '',
		fecha_liquidacion : '',
		total_precio : '',
		descripcion : '',
		estatus : '1',
		medico : '1',
		paciente : '',
		historial : '',
	},
	
	validate: function(attrs, options) {
		
  	},
});
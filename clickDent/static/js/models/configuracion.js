clickDent.Models.Configuracion = Backbone.Model.extend({
	defaults : {
		id : '',
		recordatorio_cita : '',
		confirmacion_correo : '',
		hora_comida_inicio : '',
		hora_comida_fin : '',
		hora_consulta_inicio : '',
		hora_consulta_fin : '',
		duracion_consulta : '',
		notificacion_mail : '',
		receta : '',
	},
	
	validate: function(attrs, options) {
		
  	},
});

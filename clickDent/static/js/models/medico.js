clickDent.Models.Medico = Backbone.Model.extend({
	defaults : {
		nombre : '',
		ape_paterno : '',
		ape_materno : '',
		num_cedula : '',
		declaracion : '',
		usuario : '',
		especialidad : '',
	},
	
	validate: function(attrs, options) {
		
  	},
});
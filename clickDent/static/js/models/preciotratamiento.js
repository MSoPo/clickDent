clickDent.Models.PrecioTratamiento = Backbone.Model.extend({
	defaults : {
		id : undefined,
		nombre : '',
		descripcion : '',
		precio_sugerido : '',
		precio_especial : '',
		medico : '',
	},
	
	validate: function(attrs, options) {
		
  	},
});
	
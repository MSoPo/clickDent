clickDent.Models.Direccion = Backbone.Model.extend({
	defaults : {
		id: undefined,
		colonia : '',
		calle : '',
		num_exterior : '',
		num_interior : '',
		referencias : '',
		google_maps : '',
	},
	
	validate: function(attrs, options) {
		
  	},
});
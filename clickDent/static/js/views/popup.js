clickDent.Views.Popup = Backbone.View.extend({
	el: $('#backpopup'),

	events: {
		'click #cancelar' : 'cancelar',
		'click #gurdar-tratamiento' : 'guardarTratamiento',
		'click #popcancelar' : 'cancelar',
		'click #popup' : 'nocerrar',
		'click #eliminar-tratamiento' : 'borrarTratamiento',
		'click #gurdar-cita' : 'guardarCita',
	},

	actualizacion : false,

	initialize: function() {
	},

	render: function(elemto) {
		var popup = this.$el.find('#popup').html($('#' + elemto).html());
		var popupSuperios = this.$el.find('#popcancelar').html(popup);
		this.$el.html(popupSuperios);
		return this;
	},

	cargarTratamiento : function(model) {
		 modelToForm(this.$el, model);
		 app.Views.popup.mostrar();
	},

	guardarTratamiento :function() {
		console.log('guardar Tratamiento');
		self = this;
		var id = this.$el.find('input[name=id]').val();
		if (id)
		{
			app.Models.precioTratamiento = app.Views.tratamientosView.collection.get(id);
			app.Models.precioTratamiento = formToModel(this.$el, app.Models.precioTratamiento);
		}else{
			app.Models.precioTratamiento = new clickDent.Models.PrecioTratamiento();
			app.Models.precioTratamiento = formToModel(this.$el, app.Models.precioTratamiento);
			app.Views.tratamientosView.collection.add(app.Models.precioTratamiento);
		}
		
		
		app.Models.precioTratamiento.save(
			{}, {  // se genera POST /usuarios  - contenido: {nombre:'Alfonso'}
		    		success:function(){
		        		console.log("Usuario guardado con exito");
		        		app.Views.popup.limpiarValores();
		        		app.Views.tratamientosView.render();
		    			},
		    		});

	},	

	cancelar : function() {
		this.$el.hide();
	},

	mostrar : function() {
		this.$el.show();
	},
	nocerrar : function() {
		return false;
	},
	limpiarValores : function(){
		this.$el.find('input').val('');
	},

	borrarTratamiento: function(){
		console.log('Borrar tratamiento');
		self = this;
		var id = this.$el.find('input[name=id]').val();
		app.Models.precioTratamiento.destroy({success: function(model, response) {
		  app.Views.tratamientosView.render();
		  self.$el.hide();
		}});
		
	},

	cargarPacientes : function(){
		$('#pacientes').html('');
		app.Collections.pacientes.forEach(this.agregarPaciente, this);
		this.mostrar();

	},

	agregarPaciente :function(paciente) {
		$('#pacientes').append(templatePaciente(paciente.toJSON()));
	},

	guardarCita : function(){

	},
});
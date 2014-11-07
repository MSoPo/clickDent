clickDent.Views.Tratamientos = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #agregarTratamiento' : 'agregar',
		'click .editar' : 'editar',
		'click .borrar' : 'borrar',
		'click #buscarTratamiento' : 'buscar',
	},

	initialize: function() {
	},

	render: function(datos) {
		self = this;
		app.Views.popup.render('popup-agregarTratamiento-template');
		this.crearListaTratamientos(function(){
			$('#tratamiento').html('');
			self.collection.forEach(self.addOne ,this);
		});
	},



	addOne :function(tratamiento) {
		$('#tratamiento').append(templateTratamiento(tratamiento.toJSON()));
	},

	crearListaTratamientos : function(callback) {
		self = this;
		this.collection.fetch({ data: {medico : app.Models.medico.get('id') } ,
				success:function(data){
					console.log('Success fetch');
					callback();
		        }
		    });
	},

	agregar : function(){
		app.Views.popup.render('popup-agregarTratamiento-template');
		app.Views.popup.actualizacion = false;
		app.Views.popup.cargarTratamiento(new clickDent.Models.PrecioTratamiento());
		app.Views.popup.mostrar();
	},

	editar : function(ev) {
		app.Views.popup.render('popup-agregarTratamiento-template');
		var id = $(ev.target).parent().parent().find('input').val();
		var modeloTratamiento = this.collection.get(id);
		app.Views.popup.actualizacion = true;
		app.Views.popup.cargarTratamiento(modeloTratamiento);
	},

	borrar : function(ev) {
		var id = $(ev.target).parent().parent().find('input').val();
		app.Models.precioTratamiento = this.collection.get(id);
		app.Views.popup.render('popup-eliminarTratamiento-template');
		app.Views.popup.mostrar();
	},

	buscar : function(){
		var buscar = $('input[name=buscar]').val();
		self = this;
		var datos = { 
			search : buscar
		};
		this.collection.fetch({ data: datos ,
				success:function(data){
					console.log('Success fetch');
		        }
		    });

	}
});
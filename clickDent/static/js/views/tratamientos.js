clickDent.Views.Tratamientos = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #agregarTratamiento' : 'agregar',
		'click .editar' : 'editar',
		'click .borrar' : 'borrar',
		'click #buscarTratamiento' : 'buscar',
	},

	initialize: function() {
		app.Views.popup.render('popup-agregarTratamiento-template');
		this.crearListaTratamientos();
		
	},

	render: function(datos) {
		$('#tratamiento').html('');
		this.collection.forEach(this.addOne ,this);
	},



	addOne :function(tratamiento) {
		$('#tratamiento').append(templateTratamiento(tratamiento.toJSON()));
	},

	crearListaTratamientos : function(datos) {
		self = this;
		this.collection.fetch({ data: datos ,
				success:function(data){
					console.log('Success fetch');
					self.render();
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
					self.render();
		        }
		    });

	}
});
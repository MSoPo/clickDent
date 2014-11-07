clickDent.Views.Pagos = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #buscarPagos' : 'buscarPaciente',
		'click #listaPagos .icon-search' : 'detallePagos',
		'click #listaPagos .icon-coin' : 'pagar',
	},

	initialize: function() {
		console.log("Inicializando Pagos View");
	},

	render: function(datos) {
		$('#listaPagos').html('');
		app.Collections.pagos = new clickDent.Collections.Pacientes();	
		app.Collections.pacientes.forEach(this.buscarPago, this);
		this.ordernarColeccion();
		app.Collections.pagos.forEach(this.addOne ,this);
	},



	addOne :function(pago) {
		$('#listaPagos').append(templatePagos(pago.toJSON()));
	},

	buscarPago : function(modelo, index){
		if(modelo.get('pendiente') > 0){
			app.Collections.pagos.add(modelo);
		}

	},

	buscarPaciente : function(){
		app.Collections.pagos = app.Collections.pacientes.filtroNombre($('#inputBuscar').val());
		this.ordernarColeccion();
		console.log(app.Collections.pagos.toJSON());
		this.render();
	},

	ordernarColeccion : function () {
		app.Collections.pagos.comparator = function(pago) {
		  return -pago.get("pendiente"); // Note the minus!
		};
		app.Collections.pagos.sort(); 
	},

	pagar : function(ev){
		$('.detalle').hide();
		var trSec = $(ev.target).parent().parent();
		var id = parseInt(trSec.attr('id').split('_')[1]);
		var self = this;

		app.Collections.Tratamientos = new clickDent.Collections.Tratamientos();

		//Agregar filtro para traer solo los que no tenga fecha de liquidacion
		app.Collections.Tratamientos.fetch({ data: { paciente : id, medico : app.Models.medico.get('id'), estatus_pago : 7 ,  ordering : 'fecha_inicio' } ,
	      success:function(data){

	        app.Collections.Tratamientos.forEach(function (tratamiento){
	        	
	        	var pagosTratameintos = new clickDent.Collections.Pagos(); 

	        	pagosTratameintos.fetch({ 
	        		data: { tratamiento : tratamiento.get('id'), ordering : 'fecha' } , 
	        		success : function(data){
	        			var pendiente = tratamiento.get('total_precio');

	        			pagosTratameintos.forEach(
	        				function (pago) {
	        						pendiente -= parseInt(pago.get('pagado'));
	        				}, this
	        			);

	        			tratamiento.set('pendiente', pendiente);
	        			app.Views.popup.render('popup-pagar-template');
	        			self.listaTratamientosPendientes(app.Collections.Tratamientos);
	        			app.Views.popup.mostrar();
	        			window.scroll(0,50);
	        			
	        		}
	        	});

	        },this);

	      }
	    });
	},

	listaTratamientosPendientes : function(lista){
		var template = '';

		lista.forEach(
			function(tratamiento) {
				template += templateSelect({
		    		id : tratamiento.get('id'), 
		    		valor : tratamiento.get('descripcion') + " - $ " + tratamiento.get('pendiente')
		    	});
			}, this);

		
		$('#lista_tratamientos').html(template);
	},

	detallePagos : function(ev){
		$('.detalle').hide();
		var trSec = $(ev.target).parent().parent();
		var id = parseInt(trSec.attr('id').split('_')[1]);
		var self = this;

		app.Collections.Tratamientos = new clickDent.Collections.Tratamientos();

		app.Collections.Tratamientos.fetch({ data: { paciente : id, medico : app.Models.medico.get('id'), ordering : 'fecha_inicio' } ,
	      success:function(data){
	        console.log("Tratamientos Obtenidos");
	        console.log("Consultar pagos por tratamiento");
	        trSec.next().find('td').html('');

	        app.Collections.Tratamientos.forEach(function (tratamiento){
	        	
	        	var pagosTratameintos = new clickDent.Collections.Pagos(); 

	        	pagosTratameintos.fetch({ 
	        		data: { tratamiento : tratamiento.get('id'), ordering : 'fecha' } , 
	        		success : function(data){
	        			var pendiente = tratamiento.get('total_precio');

	        			pagosTratameintos.forEach(
	        				function (pago) {
	        						pendiente -= parseInt(pago.get('pagado'));
	        				}, this
	        			);

	        			tratamiento.set('pendiente', pendiente);
	        			tratamiento.set('pagos',  pagosTratameintos.toJSON());
	        			trSec.next().find('td').append(templateDetallePagos({tratamiento : tratamiento.toJSON()}));
	        			trSec.next().show();
	        		}
	        	});

	        },this);

	      }
	    });
	}

	

});
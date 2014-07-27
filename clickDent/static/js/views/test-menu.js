clickDent.Views.Menu = Backbone.View.extend({
	el: $('#clickDent'),

	altoMenu: 0,

	events: {
		'click #btn-menu' : 'toogleMenu',
		'click #cerrar-menu' : 'toogleMenu',
		'click .itemMenu' : 'redireccionar',
	},

	initialize: function() {
		console.log('Inicializada la vista del menu');
		this.altoMenu = $('#menu').height();
		templateSelect = _.template($('#option-template').html());
		templateEscuela = _.template($('#formacion-template').html());
		templateTratamiento = _.template($('#tratamientos-template').html());
		templatePaciente = _.template($('#optionList-template').html());
		this.establearAncho();
	},

	render: function() {

	},

	toogleMenu: function() {
		console.log('click toogleMenu');
		var visibleBoton = $('#btn-menu').is(":visible");
		var visibleCerrar = $('#cerrar-menu').is(":visible");

		if(visibleBoton && !visibleCerrar){
			$('#menu').show();
			$('#btn-menu').hide();
		}else if(!visibleBoton && visibleCerrar){
			$('#menu').hide();
			$('#btn-menu').show();
		}
	},

	redireccionar: function(ev) {
		console.log('click redireccionar');
		var objEvento = $(ev.toElement);
		$('.itemMenu').removeClass('seleccion');
		objEvento.addClass('seleccion');
		this.toogleMenu();
		this.redireccionarRouter(objEvento.attr('id'));
	},

	establearAncho: function (){
		var heightMenu = this.altoMenu;
        var heightInteraccion = $('#interaccion').height();

        var heightContenido = heightInteraccion + 50;

        console.log(heightContenido);

        if (heightMenu > heightContenido){
        	 $('#contenido').height(heightMenu);
        	 $('#menu').height(heightMenu);
        	 $('#backpopup').height(heightMenu);
        }else{
        	$('#menu').height(heightContenido);
        	$('#backpopup').height(heightContenido);
        }
	},

	redireccionarRouter: function (id){

		if(id=='configuracion'){
			clickDent.app.navigate('configuracion/', {trigger : true });
        }else if(id=='miperfil'){
        	clickDent.app.navigate('miperfil/', {trigger : true });
        }else if(id=='tratamientos'){
        	clickDent.app.navigate('tratamientos/', {trigger : true });
        }else if(id=='pagos'){
        	url = '/pagosPendientes';
        }else if(id=='paciente'){
        	clickDent.app.navigate('paciente/', {trigger : true});
        }else if(id=='calendario'){
        	url = '/calendario';
        }else if(id=='inicio'){
        	clickDent.app.navigate('home/', {trigger : true});
        }else if(id=='cita'){
        	clickDent.app.navigate('cita/', {trigger : true});
        }

	}
});